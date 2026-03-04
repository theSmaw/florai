import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../lib/supabase';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    return data.session;
  },
);
