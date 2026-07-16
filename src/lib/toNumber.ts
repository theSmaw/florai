/**
 * Parses a numeric text-input value into a number, or `undefined` when blank
 * (used by inline editors to clear an optional numeric field).
 */
export function toNumber(value: string): number | undefined {
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : undefined;
}
