import { supabase } from '../supabase';

export const signUp = (email: string, password: string) =>
  supabase.auth.signUp({ email, password });

export const signIn = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

export const onAuthStateChange = (cb: (event: string, session: any) => void) =>
  supabase.auth.onAuthStateChange(cb);
