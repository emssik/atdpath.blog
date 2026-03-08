/**
 * Polish pluralization: 1 → singular, 2-4 (except 12-14) → few, rest → many.
 */
export function pluralize(
  count: number,
  singular: string,
  few: string,
  many: string
): string {
  if (count === 1) return singular;
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return few;
  }
  return many;
}
