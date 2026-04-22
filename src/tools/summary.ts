import type { VitalTrendsClient } from '../client.js';
import { validateDate } from '../validate.js';

export const summaryTool = {
  name: 'get_summary',
  description:
    'Get a cross-source health summary for a date range: average, min, and max recovery, HRV, resting heart rate, sleep performance, average strain, workout count, current weight, weight change, body fat %, and muscle mass. Defaults to the last 30 days.',
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
    },
  },

  async handle(args: Record<string, unknown>, client: VitalTrendsClient): Promise<unknown> {
    return client.get('/summary', {
      start: validateDate(args.start, 'start'),
      end: validateDate(args.end, 'end'),
    });
  },
};
