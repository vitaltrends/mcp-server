import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VitalTrendsClient } from '../client.js';
import { hevyWorkoutsTool } from './hevy_workouts.js';

const mockClient = {
  get: vi.fn(),
} as unknown as VitalTrendsClient;

beforeEach(() => vi.clearAllMocks());

describe('get_hevy_workouts', () => {
  it('calls /workouts/hevy with date and pagination params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await hevyWorkoutsTool.handle(
      { start: '2026-05-01', end: '2026-05-08', per_page: 10, page: 2 },
      mockClient,
    );

    expect(mockClient.get).toHaveBeenCalledWith('/workouts/hevy', {
      start: '2026-05-01',
      end: '2026-05-08',
      per_page: 10,
      page: 2,
    });
  });

  it('omits undefined params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await hevyWorkoutsTool.handle({}, mockClient);

    expect(mockClient.get).toHaveBeenCalledWith('/workouts/hevy', {
      start: undefined,
      end: undefined,
      per_page: undefined,
      page: undefined,
    });
  });

  it('validates arguments before calling the API', async () => {
    await expect(hevyWorkoutsTool.handle({ end: '2026/05/08' }, mockClient)).rejects.toThrow(
      'Invalid end',
    );
    await expect(hevyWorkoutsTool.handle({ per_page: 1.5 }, mockClient)).rejects.toThrow(
      'per_page must be an integer',
    );
    await expect(hevyWorkoutsTool.handle({ page: 0.5 }, mockClient)).rejects.toThrow(
      'page must be an integer',
    );

    expect(mockClient.get).not.toHaveBeenCalled();
  });
});
