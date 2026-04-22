const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function validateDate(value: unknown, name: string): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string' || !DATE_RE.test(value)) {
    throw new Error(`Invalid ${name}: expected YYYY-MM-DD, got ${JSON.stringify(value)}`);
  }
  return value;
}

export function validatePerPage(value: unknown): number | undefined {
  if (value === undefined || value === null) return undefined;
  const n = Number(value);
  if (!Number.isInteger(n)) throw new Error('per_page must be an integer');
  return Math.min(200, Math.max(1, n));
}
