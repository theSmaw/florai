export type AsyncAction =
  | { status: 'idle' | 'pending' | 'fulfilled' }
  | { status: 'rejected'; errorMessage: string };
