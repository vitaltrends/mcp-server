import type { VitalTrendsClient } from '../client.js';
import { validateDate, validatePerPage } from '../validate.js';

export const withingsMeasurementsTool = {
  name: 'get_withings_measurements',
  description:
    'Get Withings weight and body composition measurements: weight (kg), fat ratio, fat mass, fat-free mass, muscle mass, bone mass, and hydration.',
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
    return client.get('/withings', {
      start: validateDate(args.start, 'start'),
      end: validateDate(args.end, 'end'),
      per_page: validatePerPage(args.per_page),
    });
  },
};
