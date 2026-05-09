import Database from "better-sqlite3";

const db = new Database("database.db");

// 🔥 INIT ALL TABLES (SATU TEMPAT)
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price INTEGER,
    image TEXT,
    available INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT,
    total INTEGER,
    customer TEXT,
    pickup TEXT,
    proof TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER,
    productId INTEGER,
    qty INTEGER
  );
`);

const orderColumns = db.prepare("PRAGMA table_info(orders)").all();
const hasProof = orderColumns.some((col) => col.name === "proof");
if (!hasProof) {
  db.prepare("ALTER TABLE orders ADD COLUMN proof TEXT").run();
}

// 🔥 SEED (biar ada data)
const count = db.prepare("SELECT COUNT(*) as total FROM products").get();

if (count.total === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, description, price, image)
    VALUES (?, ?, ?, ?)
  `);

  insert.run(
    "Nasi Ayam Cabai Garam",
    "",
    13000,
    "/assets/nasi-ayam-cabai-garam(1).png",
  );

  insert.run("Nasi Ayam Penyet", "", 15000, "/assets/nasi-ayam-penyet(1).png");

  insert.run("Nasi Ayam Katsu", "", 15000, "/assets/nasi-ayam-katsu(1).png");

  insert.run(
    "Nasi Daun Jeruk Ayam Goreng",
    "",
    15000,
    "/assets/nasi-daun-jeruk-ayam.png",
  );

  insert.run(
    "Salad Sayur",
    "Rendang sapi khas Padang",
    20000,
    "/assets/salad-sayur.png",
  );
}

export default db;
