import { describe, it, expect, vi, beforeEach } from 'vitest';
import { whoopDailyTool } from './whoop_daily.js';
import type { VitalTrendsClient } from '../client.js';

const mockClient = {
  get: vi.fn(),
} as unknown as VitalTrendsClient;

beforeEach(() => vi.clearAllMocks());

describe('get_whoop_daily', () => {
  it('calls /whoop/daily with date params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await whoopDailyTool.handle({ start: '2024-01-01', end: '2024-01-31' }, mockClient);

    expect(mockClient.get).toHaveBeenCalledWith('/whoop/daily', {
      start: '2024-01-01',
      end: '2024-01-31',
      per_page: undefined,
    });
  });

  it('omits undefined params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: [] });

    await whoopDailyTool.handle({}, mockClient);

    expect(mockClient.get).toHaveBeenCalledWith('/whoop/daily', {
      start: undefined,
      end: undefined,
      per_page: undefined,
    });
  });

  it('has correct tool name and schema', () => {
    expect(whoopDailyTool.name).toBe('get_whoop_daily');
    expect(whoopDailyTool.inputSchema.properties).toHaveProperty('start');
    expect(whoopDailyTool.inputSchema.properties).toHaveProperty('end');
  });
});
