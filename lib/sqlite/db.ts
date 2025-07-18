
import * as SQLite from 'expo-sqlite';
import { initializeDatabase } from './schema';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;


export function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('yuno.db');
  }
  return dbPromise;
}

// Initialize schema
export async function initDatabase() {
  const db = await getDb();
  await initializeDatabase(db);
}

export default getDb;
