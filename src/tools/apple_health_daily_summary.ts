import type { VitalTrendsClient } from '../client.js';
import { validateCsvEnum, validateDate } from '../validate.js';

const DAILY_SUMMARY_TYPES = ['activity', 'heart', 'sleep', 'body', 'workouts'] as const;

export const appleHealthDailySummaryTool = {
  name: 'get_apple_health_daily_summary',
  description:
    'Get a single-day Apple Health summary with activity, heart, sleep stages, body metrics, and workout metadata.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      date: {
        type: 'string',
        description: 'Single day (YYYY-MM-DD). Defaults to today UTC.',
      },
      types: {
        type: 'string',
        description: 'Comma-separated subset: activity, heart, sleep, body, workouts. Defaults to all.',
      },
    },
  },

  async handle(args: Record<string, unknown>, client: VitalTrendsClient): Promise<unknown> {
    return client.get('/apple-health/daily-summary', {
      date: validateDate(args.date, 'date'),
      types: validateCsvEnum(args.types, 'types', DAILY_SUMMARY_TYPES),
    });
  },
};
