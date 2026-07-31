import { createClient } from '@libsql/client';
import fs from 'fs';
import 'dotenv/config';

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("No URL");
  
  const client = createClient({
    url: url
  });

  const sql = fs.readFileSync('setup.sql', 'utf16le');
  await client.executeMultiple(sql);
  console.log("Database schema pushed successfully!");
}
main().catch(console.error);
