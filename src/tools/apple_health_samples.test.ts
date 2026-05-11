import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VitalTrendsClient } from '../client.js';
import { appleHealthSamplesTool } from './apple_health_samples.js';

const mockClient = {
  get: vi.fn(),
} as unknown as VitalTrendsClient;

beforeEach(() => vi.clearAllMocks());

describe('get_apple_health_samples', () => {
  it('calls /apple-health with type, metadata include, date, and pagination params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await appleHealthSamplesTool.handle(
      {
        type: 'sleep',
        include: 'metadata',
        start: '2026-04-20',
        end: '2026-04-21T23:59:59+00:00',
        per_page: 25,
        page: 3,
      },
      mockClient,
    );

    expect(mockClient.get).toHaveBeenCalledWith('/apple-health', {
      type: 'sleep',
      include: 'metadata',
      start: '2026-04-20',
      end: '2026-04-21T23:59:59+00:00',
      per_page: 25,
      page: 3,
    });
  });

  it('requires and validates type before calling the API', async () => {
    await expect(appleHealthSamplesTool.handle({}, mockClient)).rejects.toThrow('type is required');
    await expect(appleHealthSamplesTool.handle({ type: 'mood' }, mockClient)).rejects.toThrow(
      'Invalid type',
    );
    await expect(
      appleHealthSamplesTool.handle({ type: 'sleep', include: 'details' }, mockClient),
    ).rejects.toThrow('Invalid include');

    expect(mockClient.get).not.toHaveBeenCalled();
  });
});
