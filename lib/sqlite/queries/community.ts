import getDb from '../db';

export interface CommunityGroup {
  group_id: string;
  school_id: string;
  name: string;
  description?: string;
  member_count?: number;
  created_at: number;
  last_synced: number;
}

export interface CommunityHelp {
  help_id: string;
  user_id: string;
  school_id: string;
  group_id: string;
  question: string;
  status: string;
  created_at: number;
  last_synced: number;
}

export interface CommunityAnswer {
  answer_id: string;
  help_id: string;
  user_id: string;
  content: string;
  created_at: number;
  last_synced: number;
}

// Groups
export async function insertOrUpdateGroup(group: CommunityGroup) {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO Community_Groups
     (group_id, school_id, name, description, member_count, created_at, last_synced)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [
      group.group_id,
      group.school_id,
      group.name,
      group.description ?? null,
      group.member_count ?? 0,
      group.created_at,
      group.last_synced,
    ]
  );
}

export async function getGroupsBySchool(school_id: string) {
  const db = await getDb();
  return await db.getAllAsync<CommunityGroup>(
    `SELECT * FROM Community_Groups WHERE school_id = ?;`,
    school_id
  );
}

// Help requests
export async function insertOrUpdateHelp(help: CommunityHelp) {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO Community_Help
     (help_id, user_id, school_id, group_id, question, status, created_at, last_synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      help.help_id,
      help.user_id,
      help.school_id,
      help.group_id,
      help.question,
      help.status,
      help.created_at,
      help.last_synced,
    ]
  );
}

export async function getHelpByGroup(group_id: string) {
  const db = await getDb();
  return await db.getAllAsync<CommunityHelp>(
    `SELECT * FROM Community_Help WHERE group_id = ? ORDER BY created_at DESC;`,
    group_id
  );
}

// Answers
export async function insertOrUpdateAnswer(answer: CommunityAnswer) {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO Community_Answers
     (answer_id, help_id, user_id, content, created_at, last_synced)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [
      answer.answer_id,
      answer.help_id,
      answer.user_id,
      answer.content,
      answer.created_at,
      answer.last_synced,
    ]
  );
}

export async function getAnswersByHelp(help_id: string) {
  const db = await getDb();
  return await db.getAllAsync<CommunityAnswer>(
    `SELECT * FROM Community_Answers WHERE help_id = ? ORDER BY created_at ASC;`,
    help_id
  );
}
