import { supabase } from '../supabase';

// Fetch all schools (public read)
export async function fetchSchools() {
  const { data, error } = await supabase
    .from('schools')
    .select('*');
  return { data, error };
}

// Insert or update a school
export async function upsertSchool(school: any) {
  const { data, error } = await supabase
    .from('schools')
    .upsert(school, { onConflict: 'school_id' })
    .select();
  return { data, error };
}

// Delete a school by ID
export async function deleteSchool(school_id: string) {
  const { error } = await supabase
    .from('schools')
    .delete()
    .eq('school_id', school_id);
  return { error };
}
