import sqlite3 from 'sqlite3';

// Use memory DB for testing if NODE_ENV is test
const dbPath = process.env.NODE_ENV === 'test' ? ':memory:' : './urls.db';

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            short_id TEXT UNIQUE,
            original_url TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            click_count INTEGER DEFAULT 0
        )`);
    }
});

// Promisified helper to run insert/update queries
export const dbRun = (sql: string, params: unknown[] = []): Promise<{ lastID: number }> => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID });
        });
    });
};

// Promisified helper to get a single row
export const dbGet = <T>(sql: string, params: unknown[] = []): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row as T);
        });
    });
};

export default db;
