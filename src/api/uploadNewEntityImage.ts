import { supabase } from '../lib/supabase';
import { uploadToStorage } from './uploadToStorage';

export async function uploadNewEntityImage(bucket: string, file: File): Promise<string> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${session.user.id}/${crypto.randomUUID()}.${ext}`;

  return uploadToStorage(bucket, path, file);
}
