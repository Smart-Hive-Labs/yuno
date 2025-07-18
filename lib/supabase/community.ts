import { supabase } from '../supabase';

// Fetch groups for a school
export async function fetchGroups(school_id: string) {
  const { data, error } = await supabase
    .from('community_groups')
    .select('*')
    .eq('school_id', school_id);
  return { data, error };
}

// Upsert a community group
export async function upsertGroup(group: any) {
  const { data, error } = await supabase
    .from('community_groups')
    .upsert(group, { onConflict: 'group_id' })
    .select();
  return { data, error };
}

// Insert or update a help request
export async function upsertHelp(help: any) {
  const { data, error } = await supabase
    .from('community_help')
    .upsert(help, { onConflict: 'help_id' })
    .select();
  return { data, error };
}

// Fetch helps for a group
export async function fetchHelpByGroup(group_id: string) {
  const { data, error } = await supabase
    .from('community_help')
    .select('*')
    .eq('group_id', group_id)
    .order('created_at', { ascending: false });
  return { data, error };
}

// Upsert an answer
export async function upsertAnswer(answer: any) {
  const { data, error } = await supabase
    .from('community_answers')
    .upsert(answer, { onConflict: 'answer_id' })
    .select();
  return { data, error };
}

// Fetch answers for a help request
export async function fetchAnswers(help_id: string) {
  const { data, error } = await supabase
    .from('community_answers')
    .select('*')
    .eq('help_id', help_id)
    .order('created_at', { ascending: true });
  return { data, error };
}
