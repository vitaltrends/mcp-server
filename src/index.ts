import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { VitalTrendsClient } from './client.js';
import { whoopDailyTool } from './tools/whoop_daily.js';
import { whoopRecoveryStatusTool } from './tools/whoop_recovery_status.js';
import { whoopSleepTool } from './tools/whoop_sleep.js';
import { whoopWorkoutsTool } from './tools/whoop_workouts.js';
import { withingsMeasurementsTool } from './tools/withings_measurements.js';
import { appleHealthDailyTool } from './tools/apple_health_daily.js';
import { appleHealthDailySummaryTool } from './tools/apple_health_daily_summary.js';
import { appleHealthSamplesTool } from './tools/apple_health_samples.js';
import { hevyWorkoutsTool } from './tools/hevy_workouts.js';
import { ouraTools } from './tools/oura.js';
import { summaryTool } from './tools/summary.js';
import { unifiedWorkoutsTool } from './tools/unified_workouts.js';

const tools = [
  whoopDailyTool,
  whoopRecoveryStatusTool,
  whoopWorkoutsTool,
  whoopSleepTool,
  unifiedWorkoutsTool,
  hevyWorkoutsTool,
  ...ouraTools,
  withingsMeasurementsTool,
  appleHealthDailySummaryTool,
  appleHealthDailyTool,
  appleHealthSamplesTool,
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
