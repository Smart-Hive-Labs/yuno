import { supabase } from '../supabase';

// Fetch posts for current user (RLS enforced)
export async function fetchMyPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

// Insert or update a post
export async function upsertPost(post: any) {
  const { data, error } = await supabase
    .from('posts')
    .upsert(post, { onConflict: 'post_id' })
    .select();
  return { data, error };
}

// Delete a post by ID
export async function deletePost(post_id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('post_id', post_id);
  return { error };
}
