import { getDb } from "../lib/db";
import { readFileSync } from "fs";
import { join } from "path";

async function migrate() {
  const db = getDb();
  
  try {
    
    const sqlPath = join(process.cwd(), "/src/db/migrations", "001_initial_schema.sql");
    const sql = readFileSync(sqlPath, "utf-8");
    
    await db.unsafe(sql);
    
    
    const tables = await db`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    tables.forEach((t: any) => console.log(`   - ${t.table_name}`));
    
  } catch (error) {
    process.exit(1);
  } finally {
    await db.close();
  }
}

migrate();