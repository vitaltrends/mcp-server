import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VitalTrendsClient } from '../client.js';
import { whoopRecoveryStatusTool } from './whoop_recovery_status.js';

const mockClient = {
  get: vi.fn(),
} as unknown as VitalTrendsClient;

beforeEach(() => vi.clearAllMocks());

describe('get_whoop_recovery_status', () => {
  it('calls /whoop/recovery-status without query params', async () => {
    (mockClient.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: {} });

    await whoopRecoveryStatusTool.handle({}, mockClient);

    expect(mockClient.get).toHaveBeenCalledWith('/whoop/recovery-status');
  });

  it('has correct tool name and empty schema', () => {
    expect(whoopRecoveryStatusTool.name).toBe('get_whoop_recovery_status');
    expect(whoopRecoveryStatusTool.inputSchema.properties).toEqual({});
  });
});
