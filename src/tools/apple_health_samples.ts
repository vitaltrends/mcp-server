import type { VitalTrendsClient } from '../client.js';
import {
  validateDateOrDateTime,
  validateEnum,
  validatePage,
  validatePerPage,
} from '../validate.js';

const APPLE_HEALTH_TYPES = [
  'steps',
  'distance_walking_running',
  'active_energy_burned',
  'basal_energy_burned',
  'apple_move_time',
  'apple_stand_hour',
  'time_in_daylight',
  'physical_effort',
  'swimming_stroke_count_qty',
  'workout_effort_score',
  'estimated_workout_effort_score',
  'heart_rate',
  'resting_heart_rate',
  'heart_rate_variability',
  'heart_rate_recovery',
  'respiratory_rate',
  'oxygen_saturation',
  'blood_pressure_systolic',
  'blood_pressure_diastolic',
  'blood_glucose',
  'body_temperature',
  'afib_burden',
  'sleep',
  'apple_sleeping_breathing_disturbances',
  'sleep_apnea_event',
  'workouts',
  'body_mass',
  'body_fat_percentage',
  'lean_body_mass',
  'body_mass_index',
  'height',
  'walking_double_support',
  'walking_steadiness',
  'stair_ascent_speed',
  'stair_descent_speed',
  'six_minute_walk_distance',
  'running_power',
  'cycling_power',
  'cycling_speed',
  'underwater_depth',
  'water_temperature',
  'distance_paddle_sports',
  'paddle_sports_speed',
  'distance_rowing',
  'rowing_speed',
  'distance_cross_country_skiing',
  'cross_country_skiing_speed',
  'distance_skating_sports',
  'low_cardio_fitness_event',
] as const;

export const appleHealthSamplesTool = {
  name: 'get_apple_health_samples',
  description:
    'Get Apple Health per-type time series samples. Use include=metadata to surface sleep stages and workout details.',
  inputSchema: {
    type: 'object' as const,
    required: ['type'],
    properties: {
      type: {
        type: 'string',
        enum: APPLE_HEALTH_TYPES,
        description: 'Apple Health data type to query.',
      },
      include: {
        type: 'string',
        enum: ['metadata'],
        description: 'Optional metadata expansion. Use metadata for sleep stages and workout details.',
      },
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
    return client.get('/apple-health', {
      type: validateEnum(args.type, 'type', APPLE_HEALTH_TYPES, { required: true }),
      include: validateEnum(args.include, 'include', ['metadata']),
      start: validateDateOrDateTime(args.start, 'start'),
      end: validateDateOrDateTime(args.end, 'end'),
      per_page: validatePerPage(args.per_page),
      page: validatePage(args.page),
    });
  },
};
