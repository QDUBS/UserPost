const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.resolve(__dirname, "../data.db");
const MIGRATIONS_DIR = path.resolve(__dirname, "../migrations");

function getMigrationFiles() {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith(".sql"))
    .sort();
}

function run() {
  const db = new sqlite3.Database(DB_PATH);

  db.serialize(() => {
    console.log("Running migrations against", DB_PATH);

    const ensureMigrationsTableSql = `
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        run_on TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `;
    db.run(ensureMigrationsTableSql, (err) => {
      if (err) {
        console.error("Failed to ensure migrations table", err);
        process.exit(1);
      }

      const files = getMigrationFiles();
      (function next(i) {
        if (i >= files.length) {
          console.log("Migrations complete.");
          db.close();
          return;
        }
        const name = files[i];

          db.get("SELECT 1 FROM migrations WHERE name = ?", [name], (err, row) => {
          if (err) {
            console.error("Query migrations failed", err);
            process.exit(1);
          }
          if (row) {
            console.log("Skipping already applied:", name);
            return next(i + 1);
          }

          console.log("Applying migration:", name);
          const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, name), "utf8");

          // run as a single exec
          db.exec(sql, function (execErr) {
            if (execErr) {
              console.error("Failed to execute migration", name, execErr);
              process.exit(1);
            }
            db.run(
              "INSERT INTO migrations (name) VALUES (?)",
              [name],
              (insErr) => {
                if (insErr) {
                  console.error("Failed to record migration", name, insErr);
                  process.exit(1);
                }
                console.log("Migration applied:", name);
                return next(i + 1);
              }
            );
          });
        });
      })(0);
    });
  });
}

run();
