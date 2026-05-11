import type { VitalTrendsClient } from '../client.js';

export const whoopRecoveryStatusTool = {
  name: 'get_whoop_recovery_status',
  description:
    'Get the latest WHOOP recovery freshness, sync, and upstream update timestamps, including stale status for agents and automations.',
  inputSchema: {
    type: 'object' as const,
    properties: {},
  },

  async handle(_args: Record<string, unknown>, client: VitalTrendsClient): Promise<unknown> {
    return client.get('/whoop/recovery-status');
  },
};
