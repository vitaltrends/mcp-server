import type { VitalTrendsClient } from '../client.js';
import { validateDateOrDateTime, validatePage, validatePerPage } from '../validate.js';

export const withingsMeasurementsTool = {
  name: 'get_withings_measurements',
  description:
    'Get Withings weight and body composition measurements: weight (kg), fat ratio, fat mass, fat-free mass, muscle mass, bone mass, and hydration.',
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
    return client.get('/withings/measurements', {
      start: validateDateOrDateTime(args.start, 'start'),
      end: validateDateOrDateTime(args.end, 'end'),
      per_page: validatePerPage(args.per_page),
      page: validatePage(args.page),
    });
  },
};
