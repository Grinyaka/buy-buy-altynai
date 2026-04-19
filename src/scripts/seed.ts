// scripts/seed.ts
import { getDb } from "../lib/db";
import bcrypt from "bcryptjs";

async function seed() {
  const db = getDb();
  
  try {
    const existingAdmin = await db`
      SELECT * FROM users WHERE role = 'admin' LIMIT 1
    `;
    console.log(existingAdmin)
    if (existingAdmin.length > 0) {
      console.log("Admin already exists");
      return;
    }
    
    const passwordHash = await bcrypt.hash("megakrut", 10);
    console.log(passwordHash)
    await db`
      INSERT INTO users (name, login, password_hash, role)
      VALUES (${"Алтынай"}, ${"admin"}, ${passwordHash}, ${"admin"})
    `;
    
    console.log("✅ Admin created: login=admin, password=megakrut");
    
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await db.close();
  }
}

seed();