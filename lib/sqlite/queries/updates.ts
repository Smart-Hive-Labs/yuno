import getDb from '../db';

export interface ClassUpdate {
  update_id: string;
  school_id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: number;
  last_synced: number;
}

export async function insertOrUpdateClassUpdate(update: ClassUpdate) {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO Class_Updates
     (update_id, school_id, user_id, title, content, created_at, last_synced)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [
      update.update_id,
      update.school_id,
      update.user_id,
      update.title,
      update.content,
      update.created_at,
      update.last_synced,
    ]
  );
}

export async function getUpdatesBySchool(school_id: string) {
  const db = await getDb();
  return await db.getAllAsync<ClassUpdate>(
    `SELECT * FROM Class_Updates WHERE school_id = ? ORDER BY created_at DESC;`,
    school_id
  );
}
