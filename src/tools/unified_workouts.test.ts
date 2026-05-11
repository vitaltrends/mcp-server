import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VitalTrendsClient } from '../client.js';
import { unifiedWorkoutsTool } from './unified_workouts.js';

const mockClient = {
  get: vi.fn(),
} as unknown as VitalTrendsClient;

beforeEach(() => vi.clearAllMocks());

describe('get_unified_workouts', () => {
  it('calls /workouts/unified with date and pagination params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await unifiedWorkoutsTool.handle(
      { start: '2026-05-01', end: '2026-05-08', per_page: 10, page: 2 },
      mockClient,
    );

    expect(mockClient.get).toHaveBeenCalledWith('/workouts/unified', {
      start: '2026-05-01',
      end: '2026-05-08',
      per_page: 10,
      page: 2,
    });
  });

  it('validates arguments before calling the API', async () => {
    await expect(
      unifiedWorkoutsTool.handle({ start: '2026/05/01' }, mockClient),
    ).rejects.toThrow('Invalid start');
    await expect(unifiedWorkoutsTool.handle({ page: 0.5 }, mockClient)).rejects.toThrow(
      'page must be an integer',
    );

    expect(mockClient.get).not.toHaveBeenCalled();
  });
});
