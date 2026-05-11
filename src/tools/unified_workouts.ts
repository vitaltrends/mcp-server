import type { VitalTrendsClient } from '../client.js';
import { validateDate, validatePage, validatePerPage } from '../validate.js';

export const unifiedWorkoutsTool = {
  name: 'get_unified_workouts',
  description:
    'Get a cross-source workout feed with WHOOP, Apple Health, Oura, Strava, and Hevy deduplicated into sessions.',
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
      page: {
        type: 'number',
        description: 'Page number (1-indexed). Defaults to 1.',
      },
    },
  },

  async handle(args: Record<string, unknown>, client: VitalTrendsClient): Promise<unknown> {
    return client.get('/workouts/unified', {
      start: validateDate(args.start, 'start'),
      end: validateDate(args.end, 'end'),
      per_page: validatePerPage(args.per_page),
      page: validatePage(args.page),
    });
  },
};
