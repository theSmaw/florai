import type { User } from '../domain/User';

const API_BASE = '/api';

export async function fetchUser(signal?: AbortSignal): Promise<User> {
  const res = await fetch(`${API_BASE}/user`, { signal: signal ?? null });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `Failed to fetch user: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`,
    );
  }
  return res.json() as Promise<User>;
}
