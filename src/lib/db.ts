import { SQL } from "bun";


export function getDb(): SQL {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }

  const db = new SQL(connectionString, {
    max: 1,
    idleTimeout: 0,
    connectionTimeout: 10,
  });
  return db;
}

export async function withDb<T>(fn: (db: SQL) => Promise<T>): Promise<T> {
  const db = getDb();
  try {
    return await fn(db);
  } finally {
    await db.close();
  }
}