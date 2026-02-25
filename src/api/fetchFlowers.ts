import type { Flower } from '../domain/Flower';

const API_BASE = '/api';

export async function fetchFlowers(signal?: AbortSignal): Promise<Flower[]> {
  const res = await fetch(`${API_BASE}/flowers`, { signal: signal ?? null });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `Failed to fetch flowers: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`,
    );
  }
  const data = await res.json();
  // Optionally validate/normalize here
  return data as Flower[];
}
