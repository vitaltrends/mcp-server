import type { VitalTrendsClient } from '../client.js';
import { validateDate, validatePerPage } from '../validate.js';

export const whoopWorkoutsTool = {
  name: 'get_whoop_workouts',
  description:
    'Get WHOOP workout history: sport name, duration, strain, average and max heart rate, calories, and distance. Returns newest workouts first.',
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
    return client.get('/workouts', {
      start: validateDate(args.start, 'start'),
      end: validateDate(args.end, 'end'),
      per_page: validatePerPage(args.per_page),
    });
  },
};
