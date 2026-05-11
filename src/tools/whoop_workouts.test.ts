import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VitalTrendsClient } from '../client.js';
import { whoopWorkoutsTool } from './whoop_workouts.js';

const mockClient = {
  get: vi.fn(),
} as unknown as VitalTrendsClient;

beforeEach(() => vi.clearAllMocks());

describe('get_whoop_workouts', () => {
  it('calls /whoop/workouts with date and pagination params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await whoopWorkoutsTool.handle(
      { start: '2026-05-01', end: '2026-05-08', per_page: 10, page: 2 },
      mockClient,
    );

    expect(mockClient.get).toHaveBeenCalledWith('/whoop/workouts', {
      start: '2026-05-01',
      end: '2026-05-08',
      per_page: 10,
      page: 2,
    });
  });

  it('omits undefined params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await whoopWorkoutsTool.handle({}, mockClient);

    expect(mockClient.get).toHaveBeenCalledWith('/whoop/workouts', {
      start: undefined,
      end: undefined,
      per_page: undefined,
      page: undefined,
    });
  });

  it('validates arguments before calling the API', async () => {
    await expect(whoopWorkoutsTool.handle({ start: '2026/05/01' }, mockClient)).rejects.toThrow(
      'Invalid start',
    );
    await expect(whoopWorkoutsTool.handle({ page: 1.5 }, mockClient)).rejects.toThrow(
      'page must be an integer',
    );

    expect(mockClient.get).not.toHaveBeenCalled();
  });
});
