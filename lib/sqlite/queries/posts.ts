// lib/db/queries/posts.ts
import getDb from '../db';

export interface Post {
  post_id: string;
  user_id: string;
  school_id: string;
  content_type: string;
  content_url?: string;
  caption?: string;
  tags?: string;
  is_educational: number;
  created_at: number;
  last_synced: number;
}

export async function insertOrUpdatePost(post: Post) {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO Posts
     (post_id, user_id, school_id, content_type, content_url, caption, tags, is_educational, created_at, last_synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      post.post_id,
      post.user_id,
      post.school_id,
      post.content_type,
      post.content_url ?? null,
      post.caption ?? null,
      post.tags ?? '[]',
      post.is_educational,
      post.created_at,
      post.last_synced,
    ]
  );
}

export async function getPostsByUser(user_id: string) {
  const db = await getDb();
  return await db.getAllAsync<Post>(
    `SELECT * FROM Posts WHERE user_id = ?;`,
    user_id
  );
}


export async function deletePost(post_id: string) {
  const db = await getDb();
  const result = await db.runAsync(
    `DELETE FROM Posts WHERE post_id = ?;`,
    post_id
  );
  return result.changes; // returns number of rows deleted
}
