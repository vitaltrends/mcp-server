import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VitalTrendsClient } from '../client.js';
import { withingsMeasurementsTool } from './withings_measurements.js';

const mockClient = {
  get: vi.fn(),
} as unknown as VitalTrendsClient;

beforeEach(() => vi.clearAllMocks());

describe('get_withings_measurements', () => {
  it('calls /withings/measurements with date and pagination params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await withingsMeasurementsTool.handle(
      { start: '2026-05-01', end: '2026-05-08T23:59:59Z', per_page: 10, page: 2 },
      mockClient,
    );

    expect(mockClient.get).toHaveBeenCalledWith('/withings/measurements', {
      start: '2026-05-01',
      end: '2026-05-08T23:59:59Z',
      per_page: 10,
      page: 2,
    });
  });
});
