import { describe, it, expect } from 'vitest';
import { whoopDailyTool } from './tools/whoop_daily.js';
import { whoopRecoveryStatusTool } from './tools/whoop_recovery_status.js';
import { whoopWorkoutsTool } from './tools/whoop_workouts.js';
import { withingsMeasurementsTool } from './tools/withings_measurements.js';
import { appleHealthDailyTool } from './tools/apple_health_daily.js';
import { hevyWorkoutsTool } from './tools/hevy_workouts.js';
import { ouraTools } from './tools/oura.js';
import { summaryTool } from './tools/summary.js';
import { unifiedWorkoutsTool } from './tools/unified_workouts.js';

const tools = [
  whoopDailyTool,
  whoopRecoveryStatusTool,
  whoopWorkoutsTool,
  unifiedWorkoutsTool,
  hevyWorkoutsTool,
  ...ouraTools,
  withingsMeasurementsTool,
  appleHealthDailyTool,
  summaryTool,
];

describe('tool registry', () => {
  it('exports exactly 17 tools', () => {
    expect(tools).toHaveLength(17);
  });

  it('all tools have unique names', () => {
    const names = tools.map((t) => t.name);
    expect(new Set(names).size).toBe(17);
  });

  it('all tool names match expected values', () => {
    const names = tools.map((t) => t.name);
    expect(names).toContain('get_whoop_daily');
    expect(names).toContain('get_whoop_recovery_status');
    expect(names).toContain('get_whoop_workouts');
    expect(names).toContain('get_unified_workouts');
    expect(names).toContain('get_hevy_workouts');
    expect(names).toContain('get_oura_daily_sleep');
    expect(names).toContain('get_oura_sleep');
    expect(names).toContain('get_oura_daily_readiness');
    expect(names).toContain('get_oura_daily_activity');
    expect(names).toContain('get_oura_workouts');
    expect(names).toContain('get_oura_daily_spo2');
    expect(names).toContain('get_oura_daily_stress');
    expect(names).toContain('get_oura_daily_resilience');
    expect(names).toContain('get_oura_vo2_max');
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
