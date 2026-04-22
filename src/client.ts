const BASE_URL = (process.env.VITALTRENDS_BASE_URL ?? 'https://vitaltrends.net').replace(/\/$/, '') + '/api/v1';

export type QueryParams = Record<string, string | number | undefined>;

export class VitalTrendsClient {
  private readonly apiKey: string;

  constructor() {
    const key = process.env.VITALTRENDS_API_KEY;
    if (!key) {
      throw new Error('VITALTRENDS_API_KEY environment variable is not set');
    }
    this.apiKey = key;
  }

  async get(path: string, params: QueryParams = {}): Promise<unknown> {
    const url = new URL(`${BASE_URL}${path}`);

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    let response: Response;
    try {
      response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
        },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new Error(`VitalTrends API error ${response.status}`);
    }

    return response.json();
  }
}
