import type { VitalTrendsClient } from '../client.js';
import { validateDate, validatePerPage } from '../validate.js';

export const appleHealthDailyTool = {
  name: 'get_apple_health_daily',
  description:
    'Get daily Apple Health aggregates: steps, active and basal energy (kcal), distance (km), average heart rate, HRV, resting heart rate, SpO2, and sleep duration (minutes). Returns one row per day, newest first.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      start: {
        type: 'string',
        description: 'Start date (YYYY-MM-DD).',
      },
      end: {
        type: 'string',
        description: 'End date (YYYY-MM-DD).',
      },
      per_page: {
        type: 'number',
        description: 'Results per page (1-200). Defaults to 50.',
      },
    },
  },

  async handle(args: Record<string, unknown>, client: VitalTrendsClient): Promise<unknown> {
    return client.get('/apple-health/daily', {
      start: validateDate(args.start, 'start'),
      end: validateDate(args.end, 'end'),
      per_page: validatePerPage(args.per_page),
    });
  },
};
