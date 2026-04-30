import Database from "better-sqlite3";



const db = new Database("database.db");

// 🔥 INIT ALL TABLES (SATU TEMPAT)
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price INTEGER,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT,
    total INTEGER,
    customer TEXT,
    pickup TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER,
    productId INTEGER,
    qty INTEGER
  );
`);

// 🔥 SEED (biar ada data)
const count = db.prepare("SELECT COUNT(*) as total FROM products").get();

if (count.total === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, description, price, image)
    VALUES (?, ?, ?, ?)
  `);

  insert.run(
    "Nasi Ayam Cabai Garam",
    "Ayam crispy dengan cabai segar",
    45000,
    "/assets/ayam1.png"
  );

  insert.run(
    "Nasi Ayam Penyet",
    "Ayam goreng dengan sambal pedas",
    42000,
    "/assets/ayam2.png"
  );

  insert.run(
    "Nasi Ayam Bakar",
    "Ayam bakar bumbu manis gurih",
    43000,
    "/assets/ayam3.png"
  );

  insert.run(
    "Nasi Ayam Geprek",
    "Ayam geprek sambal bawang",
    40000,
    "/assets/ayam4.png"
  );

  insert.run(
    "Nasi Rendang",
    "Rendang sapi khas Padang",
    48000,
    "/assets/ayam1.png"
  );

  insert.run(
    "Nasi Goreng Spesial",
    "Nasi goreng dengan telur dan ayam",
    38000,
    "/assets/ayam2.png"
  );
}


export default db;