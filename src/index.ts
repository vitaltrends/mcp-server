import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { VitalTrendsClient } from './client.js';
import { whoopDailyTool } from './tools/whoop_daily.js';
import { whoopWorkoutsTool } from './tools/whoop_workouts.js';
import { withingsMeasurementsTool } from './tools/withings_measurements.js';
import { appleHealthDailyTool } from './tools/apple_health_daily.js';
import { summaryTool } from './tools/summary.js';

const tools = [
  whoopDailyTool,
  whoopWorkoutsTool,
  withingsMeasurementsTool,
  appleHealthDailyTool,
  summaryTool,
];

const client = new VitalTrendsClient();

const server = new Server(
  { name: 'vitaltrends', version: '1.0.0' },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: tools.map((t) => ({
    name: t.name,
    description: t.description,
    inputSchema: t.inputSchema,
  })),
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const tool = tools.find((t) => t.name === request.params.name);

  if (!tool) {
    return {
      content: [{ type: 'text', text: `Unknown tool: ${request.params.name}` }],
      isError: true,
    };
  }

  try {
    const result = await tool.handle(request.params.arguments ?? {}, client);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  } catch (err) {
    return {
      content: [{ type: 'text', text: err instanceof Error ? err.message : String(err) }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
