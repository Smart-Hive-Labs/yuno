import { supabase } from '../supabase';

// Fetch class updates for a school
export async function fetchUpdates(school_id: string) {
  const { data, error } = await supabase
    .from('class_updates')
    .select('*')
    .eq('school_id', school_id)
    .order('created_at', { ascending: false });
  return { data, error };
}

// Upsert a class update
export async function upsertUpdate(update: any) {
  const { data, error } = await supabase
    .from('class_updates')
    .upsert(update, { onConflict: 'update_id' })
    .select();
  return { data, error };
}

// Delete a class update
export async function deleteUpdate(update_id: string) {
  const { error } = await supabase
    .from('class_updates')
    .delete()
    .eq('update_id', update_id);
  return { error };
}
