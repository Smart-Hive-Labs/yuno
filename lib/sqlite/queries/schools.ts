// lib/db/queries/schools.ts
import getDb from '../db';

export interface School {
  school_id: string;
  name: string;
  location?: string;
  description?: string;
  logo_url?: string;
  last_synced: number;
}

export async function insertOrUpdateSchool(school: School) {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO Schools
     (school_id, name, location, description, logo_url, last_synced)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [
      school.school_id,
      school.name,
      school.location ?? null,
      school.description ?? null,
      school.logo_url ?? null,
      school.last_synced,
    ]
  );
}

export async function getAllSchools() {
  const db = await getDb();
  return await db.getAllAsync<School>(`SELECT * FROM Schools;`);
}


export async function deleteSchool(school_id: string) {
  const db = await getDb();
  const result = await db.runAsync(
    `DELETE FROM Schools WHERE school_id = ?;`,
    school_id
  );
  return result.changes; // number of rows removed
}
