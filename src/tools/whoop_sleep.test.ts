import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VitalTrendsClient } from '../client.js';
import { whoopSleepTool } from './whoop_sleep.js';

const mockClient = {
  get: vi.fn(),
} as unknown as VitalTrendsClient;

beforeEach(() => vi.clearAllMocks());

describe('get_whoop_sleep', () => {
  it('calls /whoop/sleep with date and pagination params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await whoopSleepTool.handle(
      { start: '2026-05-01T00:00:00Z', end: '2026-05-08', per_page: 10, page: 2 },
      mockClient,
    );

    expect(mockClient.get).toHaveBeenCalledWith('/whoop/sleep', {
      start: '2026-05-01T00:00:00Z',
      end: '2026-05-08',
      per_page: 10,
      page: 2,
    });
  });

  it('validates arguments before calling the API', async () => {
    await expect(whoopSleepTool.handle({ start: '2026/05/01' }, mockClient)).rejects.toThrow(
      'Invalid start',
    );
    await expect(whoopSleepTool.handle({ page: 1.5 }, mockClient)).rejects.toThrow(
      'page must be an integer',
    );

    expect(mockClient.get).not.toHaveBeenCalled();
  });
});
