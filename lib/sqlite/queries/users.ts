// lib/db/queries/users.ts
import getDb from '../db';

export interface User {
  id: string;
  email: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  last_synced: number;
}

export async function insertOrUpdateUser(user: User) {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO Users
     (id, email, username, full_name, avatar_url, last_synced)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [
      user.id,
      user.email,
      user.username,
      user.full_name ?? null,
      user.avatar_url ?? null,
      user.last_synced,
    ]
  );
}

export async function getUserById(id: string) {
  const db = await getDb();
  return await db.getFirstAsync<User>(
    `SELECT * FROM Users WHERE id = ?;`,
    id
  );
}

export async function deleteUser(id: string) {
  const db = await getDb();
  const result = await db.runAsync(
    `DELETE FROM Users WHERE id = ?;`,
    id
  );
  return result.changes; // number of rows deleted
}

