import { describe, it, expect } from 'vitest';
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

describe('tool registry', () => {
  it('exports exactly 5 tools', () => {
    expect(tools).toHaveLength(5);
  });

  it('all tools have unique names', () => {
    const names = tools.map((t) => t.name);
    expect(new Set(names).size).toBe(5);
  });

  it('all tool names match expected values', () => {
    const names = tools.map((t) => t.name);
    expect(names).toContain('get_whoop_daily');
    expect(names).toContain('get_whoop_workouts');
    expect(names).toContain('get_withings_measurements');
    expect(names).toContain('get_apple_health_daily');
    expect(names).toContain('get_summary');
  });

  it('all tools have a description and inputSchema', () => {
    for (const tool of tools) {
      expect(tool.description).toBeTruthy();
      expect(tool.inputSchema).toBeTruthy();
    }
  });
});
