import type { VitalTrendsClient } from '../client.js';
import { validateDate, validatePerPage } from '../validate.js';

export const whoopDailyTool = {
  name: 'get_whoop_daily',
  description:
    'Get WHOOP daily data: recovery score, HRV, resting heart rate, sleep performance, sleep duration, and strain. Returns one row per day, newest first.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      start: {
        type: 'string',
        description: 'Start date (YYYY-MM-DD). Defaults to 30 days ago.',
      },
      end: {
        type: 'string',
        description: 'End date (YYYY-MM-DD). Defaults to today.',
      },
      per_page: {
        type: 'number',
        description: 'Results per page (1-200). Defaults to 50.',
      },
    },
  },

  async handle(args: Record<string, unknown>, client: VitalTrendsClient): Promise<unknown> {
    return client.get('/whoop/daily', {
      start: validateDate(args.start, 'start'),
      end: validateDate(args.end, 'end'),
      per_page: validatePerPage(args.per_page),
    });
  },
};
