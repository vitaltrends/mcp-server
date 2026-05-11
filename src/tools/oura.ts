import type { VitalTrendsClient } from '../client.js';
import { validateDateOrDateTime, validatePage, validatePerPage } from '../validate.js';

type OuraToolDefinition = {
  name: string;
  path: string;
  description: string;
};

const listInputSchema = {
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
};

function createOuraTool(definition: OuraToolDefinition) {
  return {
    name: definition.name,
    description: definition.description,
    inputSchema: listInputSchema,

    async handle(args: Record<string, unknown>, client: VitalTrendsClient): Promise<unknown> {
      return client.get(definition.path, {
        start: validateDateOrDateTime(args.start, 'start'),
        end: validateDateOrDateTime(args.end, 'end'),
        per_page: validatePerPage(args.per_page),
        page: validatePage(args.page),
      });
    },
  };
}

export const ouraDailySleepTool = createOuraTool({
  name: 'get_oura_daily_sleep',
  path: '/oura/daily-sleep',
  description: 'Get Oura daily sleep scores and sleep score contributors. Returns one row per day, newest first.',
});

export const ouraSleepTool = createOuraTool({
  name: 'get_oura_sleep',
  path: '/oura/sleep',
  description:
    'Get Oura sleep sessions with stages, duration, HRV, heart rate, and respiratory rate. Sleep durations are returned in seconds.',
});

export const ouraDailyReadinessTool = createOuraTool({
  name: 'get_oura_daily_readiness',
  path: '/oura/daily-readiness',
  description: 'Get Oura daily readiness scores, temperature deviation, and readiness contributors.',
});

export const ouraDailyActivityTool = createOuraTool({
  name: 'get_oura_daily_activity',
  path: '/oura/daily-activity',
  description:
    'Get Oura daily activity scores, calories, steps, distance, active minutes, and activity contributors.',
});

export const ouraWorkoutsTool = createOuraTool({
  name: 'get_oura_workouts',
  path: '/oura/workouts',
  description:
    'Get Oura workout sessions with activity, intensity, source, calories, distance in meters, and timestamps.',
});

export const ouraDailySpo2Tool = createOuraTool({
  name: 'get_oura_daily_spo2',
  path: '/oura/daily-spo2',
  description: 'Get Oura daily SpO2 averages and breathing disturbance index.',
});

export const ouraDailyStressTool = createOuraTool({
  name: 'get_oura_daily_stress',
  path: '/oura/daily-stress',
  description: 'Get Oura daily stress, recovery, and day summary data.',
});

export const ouraDailyResilienceTool = createOuraTool({
  name: 'get_oura_daily_resilience',
  path: '/oura/daily-resilience',
  description: 'Get Oura daily resilience level and resilience contributors.',
});

export const ouraVo2MaxTool = createOuraTool({
  name: 'get_oura_vo2_max',
  path: '/oura/vo2-max',
  description: 'Get Oura VO2 max estimates by day.',
});

export const ouraTools = [
  ouraDailySleepTool,
  ouraSleepTool,
  ouraDailyReadinessTool,
  ouraDailyActivityTool,
  ouraWorkoutsTool,
  ouraDailySpo2Tool,
  ouraDailyStressTool,
  ouraDailyResilienceTool,
  ouraVo2MaxTool,
];
