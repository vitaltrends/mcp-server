const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DATE_TIME_RE =
  /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d{1,6})?)?(?:Z|[+-]\d{2}:\d{2})?$/;

export function validateDate(value: unknown, name: string): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string' || !DATE_RE.test(value)) {
    throw new Error(`Invalid ${name}: expected YYYY-MM-DD, got ${JSON.stringify(value)}`);
  }
  return value;
}

export function validateDateOrDateTime(value: unknown, name: string): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string' || (!DATE_RE.test(value) && !DATE_TIME_RE.test(value))) {
    throw new Error(
      `Invalid ${name}: expected YYYY-MM-DD or ISO 8601 datetime, got ${JSON.stringify(value)}`,
    );
  }
  return value;
}

export function validateEnum(
  value: unknown,
  name: string,
  allowedValues: readonly string[],
  options: { required?: boolean } = {},
): string | undefined {
  if (value === undefined || value === null || value === '') {
    if (options.required) throw new Error(`${name} is required`);
    return undefined;
  }
  if (typeof value !== 'string' || !allowedValues.includes(value)) {
    throw new Error(
      `Invalid ${name}: expected one of ${allowedValues.join(', ')}, got ${JSON.stringify(value)}`,
    );
  }
  return value;
}

export function validateCsvEnum(
  value: unknown,
  name: string,
  allowedValues: readonly string[],
): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') {
    throw new Error(`Invalid ${name}: expected comma-separated values, got ${JSON.stringify(value)}`);
  }

  const values = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (values.length === 0) {
    throw new Error(`Invalid ${name}: expected comma-separated values, got ${JSON.stringify(value)}`);
  }

  const invalid = values.filter((item) => !allowedValues.includes(item));
  if (invalid.length > 0) {
    throw new Error(`Invalid ${name}: unsupported value ${invalid.join(', ')}`);
  }

  return values.join(',');
}

export function validatePerPage(value: unknown): number | undefined {
  if (value === undefined || value === null) return undefined;
  const n = Number(value);
  if (!Number.isInteger(n)) throw new Error('per_page must be an integer');
  return Math.min(200, Math.max(1, n));
}

export function validatePage(value: unknown): number | undefined {
  if (value === undefined || value === null) return undefined;
  const n = Number(value);
  if (!Number.isInteger(n)) throw new Error('page must be an integer');
  return Math.max(1, n);
}
