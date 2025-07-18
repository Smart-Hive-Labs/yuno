import getDb from './sqlite/db';
import { supabase } from './supabase';
import {
  User,
  insertOrUpdateUser,
  deleteUser,
} from './sqlite/queries/users';
import {
  School,
  insertOrUpdateSchool,
  deleteSchool,
} from './sqlite/queries/schools';
import {
  Post,
  insertOrUpdatePost,
  deletePost,
} from './sqlite/queries/posts';

export type Table = 'Users' | 'Schools' | 'Posts';

const tableConfig: Record<
  Table,
  {
    idField: string;
    columns: string[];
    deleteQuery: (id: string) => Promise<number>;
  }
> = {
  Users: {
    idField: 'id',
    columns: [
      'id',
      'email',
      'username',
      'full_name',
      'avatar_url',
      'last_synced',
    ],
    deleteQuery: deleteUser,
  },
  Schools: {
    idField: 'school_id',
    columns: [
      'school_id',
      'name',
      'location',
      'description',
      'logo_url',
      'last_synced',
    ],
    deleteQuery: deleteSchool,
  },
  Posts: {
    idField: 'post_id',
    columns: [
      'post_id',
      'user_id',
      'school_id',
      'content_type',
      'content_url',
      'caption',
      'tags',
      'is_educational',
      'created_at',
      'last_synced',
    ],
    deleteQuery: deletePost,
  },
};

async function pushTable(table: Table) {
  const db = await getDb();
  const { idField, columns } = tableConfig[table];

  const rows = await db.getAllAsync<any>(
    `SELECT ${columns.join(', ')} FROM ${table} WHERE last_synced IS NULL OR last_synced < 0;`
  );
  if (rows.length === 0) return;

  const { error } = await supabase
    .from(table.toLowerCase())
    .upsert(rows, { onConflict: idField });

  if (error) throw new Error(`Push ${table} failed: ${error.message}`);

  const ts = Date.now();
  const ids = rows.map((r: any) => r[idField]);
  await db.runAsync(
    `UPDATE ${table} SET last_synced = ? WHERE ${idField} IN (${ids.map(() => '?').join(',')})`,
    [ts, ...ids]
  );
}

async function pullTable(table: Table) {
  const db = await getDb();
  const result = await db.getAllAsync<{ last_synced: number }>(`
    SELECT MAX(last_synced) AS last_synced FROM ${table};
  `);
  const since = result[0]?.last_synced || 0;

  const { data, error } = await supabase
    .from(table.toLowerCase())
    .select('*')
    .gt('last_synced', since);

  if (error) throw new Error(`Pull ${table} failed: ${error.message}`);

  for (const row of data || []) {
    const idValue = (row as any)[tableConfig[table].idField];
    if ((row as any)._deleted) {
      await tableConfig[table].deleteQuery(idValue);
    } else {
      switch (table) {
        case 'Users':
          await insertOrUpdateUser(row as User);
          break;
        case 'Schools':
          await insertOrUpdateSchool(row as School);
          break;
        case 'Posts':
          await insertOrUpdatePost(row as Post);
          break;
      }
    }
  }
}

export async function syncAll() {
  try {
    await pushTable('Users');
    await pushTable('Schools');
    await pushTable('Posts');

    await pullTable('Users');
    await pullTable('Schools');
    await pullTable('Posts');
  } catch (err) {
    console.error('Sync failed:', err);
  }
}

export function enableRealtimeSync() {
  const tables: Table[] = ['Users', 'Schools', 'Posts'];

  tables.forEach((table) => {
    supabase
      .channel(`realtime_${table}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table.toLowerCase(),
          filter: 'last_synced=gt.0',
        },
        () => {
          console.log(`Realtime update trigger on ${table}`);
          pullTable(table);
        }
      )
      .subscribe();
  });
}
