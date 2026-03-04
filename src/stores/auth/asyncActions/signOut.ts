import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../lib/supabase';

export const signOut = createAsyncThunk('auth/signOut', async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
});
