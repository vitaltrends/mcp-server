import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VitalTrendsClient } from '../client.js';
import { ouraDailyReadinessTool, ouraTools, ouraWorkoutsTool } from './oura.js';

const mockClient = {
  get: vi.fn(),
} as unknown as VitalTrendsClient;

beforeEach(() => vi.clearAllMocks());

describe('oura tools', () => {
  it('registers all documented Oura endpoints', () => {
    const names = ouraTools.map((tool) => tool.name);

    expect(names).toEqual(
      expect.arrayContaining([
        'get_oura_daily_sleep',
        'get_oura_sleep',
        'get_oura_daily_readiness',
        'get_oura_daily_activity',
        'get_oura_workouts',
        'get_oura_daily_spo2',
        'get_oura_daily_stress',
        'get_oura_daily_resilience',
        'get_oura_vo2_max',
      ]),
    );
    expect(names).toHaveLength(9);
  });

  it('calls the matching Oura endpoint with date and pagination params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await ouraDailyReadinessTool.handle(
      { start: '2026-05-01', end: '2026-05-08', per_page: 7, page: 2 },
      mockClient,
    );

    expect(mockClient.get).toHaveBeenCalledWith('/oura/daily-readiness', {
      start: '2026-05-01',
      end: '2026-05-08',
      per_page: 7,
      page: 2,
    });
  });

  it('omits undefined params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await ouraWorkoutsTool.handle({}, mockClient);

    expect(mockClient.get).toHaveBeenCalledWith('/oura/workouts', {
      start: undefined,
      end: undefined,
      per_page: undefined,
      page: undefined,
    });
  });

  it('validates tool arguments before calling the API', async () => {
    await expect(ouraWorkoutsTool.handle({ start: '2026/05/01' }, mockClient)).rejects.toThrow(
      'Invalid start',
    );
    await expect(ouraWorkoutsTool.handle({ page: 1.5 }, mockClient)).rejects.toThrow(
      'page must be an integer',
    );

    expect(mockClient.get).not.toHaveBeenCalled();
  });
});
