import fs from 'fs';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/soilnsoul' });

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean' || typeof val === 'number') return String(val);
  if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function dump() {
  let sql = `-- =============================================================================\n`;
  sql += `-- SoilNSoul Travels — PostgreSQL Data Seed / Backup\n`;
  sql += `-- Generated: ${new Date().toISOString()}\n`;
  sql += `-- =============================================================================\n\n`;

  const tables = ['admins', 'blogs', 'hotels', 'inquiries'];
  for (const t of tables) {
    const res = await pool.query(`SELECT * FROM ${t} ORDER BY created_at ASC`);
    if (res.rows.length === 0) continue;
    sql += `-- Data for ${t} (${res.rows.length} rows)\n`;
    for (const row of res.rows) {
      const cols = Object.keys(row);
      const vals = cols.map(c => escapeSql(row[c]));
      sql += `INSERT INTO ${t} (${cols.join(', ')}) VALUES (${vals.join(', ')}) ON CONFLICT (id) DO NOTHING;\n`;
    }
    sql += `\n`;
  }

  fs.writeFileSync('./seed-data.sql', sql);
  console.log('✅ Generated server/seed-data.sql with all current live records.');
  await pool.end();
}

dump().catch(console.error);
