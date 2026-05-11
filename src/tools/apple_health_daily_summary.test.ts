import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VitalTrendsClient } from '../client.js';
import { appleHealthDailySummaryTool } from './apple_health_daily_summary.js';

const mockClient = {
  get: vi.fn(),
} as unknown as VitalTrendsClient;

beforeEach(() => vi.clearAllMocks());

describe('get_apple_health_daily_summary', () => {
  it('calls /apple-health/daily-summary with date and selected types', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: {} });

    await appleHealthDailySummaryTool.handle(
      { date: '2026-04-21', types: 'activity, sleep,workouts' },
      mockClient,
    );

    expect(mockClient.get).toHaveBeenCalledWith('/apple-health/daily-summary', {
      date: '2026-04-21',
      types: 'activity,sleep,workouts',
    });
  });

  it('validates arguments before calling the API', async () => {
    await expect(
      appleHealthDailySummaryTool.handle({ date: '2026-04-21T00:00:00Z' }, mockClient),
    ).rejects.toThrow('Invalid date');
    await expect(
      appleHealthDailySummaryTool.handle({ types: 'activity,mood' }, mockClient),
    ).rejects.toThrow('Invalid types');

    expect(mockClient.get).not.toHaveBeenCalled();
  });
});
