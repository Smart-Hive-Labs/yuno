import getDb from '../db';

export interface Like {
  like_id: string;
  post_id: string;
  user_id: string;
  created_at: number;
  last_synced: number;
}

export interface Comment {
  comment_id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: number;
  last_synced: number;
}

export async function insertOrUpdateLike(like: Like) {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO Likes
     (like_id, post_id, user_id, created_at, last_synced)
     VALUES (?, ?, ?, ?, ?);`,
    [
      like.like_id,
      like.post_id,
      like.user_id,
      like.created_at,
      like.last_synced,
    ]
  );
}

export async function getLikesByPost(post_id: string) {
  const db = await getDb();
  return await db.getAllAsync<Like>(
    `SELECT * FROM Likes WHERE post_id = ?;`,
    post_id
  );
}

export async function insertOrUpdateComment(comment: Comment) {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO Comments
     (comment_id, post_id, user_id, content, created_at, last_synced)
     VALUES (?, ?, ?, ?, ?);`,
    [
      comment.comment_id,
      comment.post_id,
      comment.user_id,
      comment.content,
      comment.created_at,
      comment.last_synced,
    ]
  );
}

export async function getCommentsByPost(post_id: string) {
  const db = await getDb();
  return await db.getAllAsync<Comment>(
    `SELECT * FROM Comments WHERE post_id = ? ORDER BY created_at ASC;`,
    post_id
  );
}
