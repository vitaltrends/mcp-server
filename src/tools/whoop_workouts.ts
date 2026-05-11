import type { VitalTrendsClient } from '../client.js';
import { validateDateOrDateTime, validatePage, validatePerPage } from '../validate.js';

export const whoopWorkoutsTool = {
  name: 'get_whoop_workouts',
  description:
    'Get WHOOP workout history: sport name, duration, strain, average and max heart rate, calories, and distance. Returns newest workouts first.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      start: {
        type: 'string',
        description: 'Start date or datetime (YYYY-MM-DD or ISO 8601).',
      },
      end: {
        type: 'string',
        description: 'End date or datetime (YYYY-MM-DD or ISO 8601).',
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
    return client.get('/whoop/workouts', {
      start: validateDateOrDateTime(args.start, 'start'),
      end: validateDateOrDateTime(args.end, 'end'),
      per_page: validatePerPage(args.per_page),
      page: validatePage(args.page),
    });
  },
};
