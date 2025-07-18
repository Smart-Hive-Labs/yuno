// lib/db/schema.ts
import { SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS Users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      username TEXT UNIQUE,
      full_name TEXT,
      avatar_url TEXT,
      last_synced INTEGER
    );

    CREATE TABLE IF NOT EXISTS Schools (
      school_id TEXT PRIMARY KEY,
      name TEXT,
      location TEXT,
      description TEXT,
      logo_url TEXT,
      last_synced INTEGER
    );

    CREATE TABLE IF NOT EXISTS User_Schools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      school_id TEXT,
      joined_at INTEGER,
      last_synced INTEGER,
      FOREIGN KEY(user_id) REFERENCES Users(id),
      FOREIGN KEY(school_id) REFERENCES Schools(school_id),
      UNIQUE(user_id, school_id)
    );

    CREATE TABLE IF NOT EXISTS Posts (
      post_id TEXT PRIMARY KEY,
      user_id TEXT,
      school_id TEXT,
      content_type TEXT,
      content_url TEXT,
      caption TEXT,
      tags TEXT,
      is_educational INTEGER,
      created_at INTEGER,
      last_synced INTEGER,
      FOREIGN KEY(user_id) REFERENCES Users(id),
      FOREIGN KEY(school_id) REFERENCES Schools(school_id)
    );

    CREATE TABLE IF NOT EXISTS Class_Updates (
      update_id TEXT PRIMARY KEY,
      school_id TEXT,
      user_id TEXT,
      title TEXT,
      content TEXT,
      created_at INTEGER,
      last_synced INTEGER,
      FOREIGN KEY(school_id) REFERENCES Schools(school_id),
      FOREIGN KEY(user_id) REFERENCES Users(id)
    );

    CREATE TABLE IF NOT EXISTS Comments (
      comment_id TEXT PRIMARY KEY,
      post_id TEXT,
      user_id TEXT,
      content TEXT,
      created_at INTEGER,
      last_synced INTEGER,
      FOREIGN KEY(post_id) REFERENCES Posts(post_id),
      FOREIGN KEY(user_id) REFERENCES Users(id)
    );

    CREATE TABLE IF NOT EXISTS Likes (
      like_id TEXT PRIMARY KEY,
      post_id TEXT,
      user_id TEXT,
      created_at INTEGER,
      last_synced INTEGER,
      FOREIGN KEY(post_id) REFERENCES Posts(post_id),
      FOREIGN KEY(user_id) REFERENCES Users(id)
    );

    CREATE TABLE IF NOT EXISTS Community_Groups (
      group_id TEXT PRIMARY KEY,
      school_id TEXT,
      name TEXT,
      description TEXT,
      member_count INTEGER,
      created_at INTEGER,
      last_synced INTEGER,
      FOREIGN KEY(school_id) REFERENCES Schools(school_id)
    );

    CREATE TABLE IF NOT EXISTS Community_Help (
      help_id TEXT PRIMARY KEY,
      user_id TEXT,
      school_id TEXT,
      group_id TEXT,
      question TEXT,
      status TEXT,
      created_at INTEGER,
      last_synced INTEGER,
      FOREIGN KEY(user_id) REFERENCES Users(id),
      FOREIGN KEY(school_id) REFERENCES Schools(school_id),
      FOREIGN KEY(group_id) REFERENCES Community_Groups(group_id)
    );

    CREATE TABLE IF NOT EXISTS Community_Answers (
      answer_id TEXT PRIMARY KEY,
      help_id TEXT,
      user_id TEXT,
      content TEXT,
      created_at INTEGER,
      last_synced INTEGER,
      FOREIGN KEY(help_id) REFERENCES Community_Help(help_id),
      FOREIGN KEY(user_id) REFERENCES Users(id)
    );
  `);
}
