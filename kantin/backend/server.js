import express from "express";
import cors from "cors";
import "dotenv/config";
import db from "./db.js";
import multer from "multer";
import path from "path";
// import paymentRoutes from "./routes/payment.js";
// import webhookRoutes from "./routes/webhook.js";
const app = express();
// const cors = require('cors');
// app.use(cors({
//   origin: 'https://kantin-clean.vercel.app',
//   credentials: true
// }));
app.use(cors({
  origin: "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 🔥 TEMP STORAGE (gantikan database dulu)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// TEST
app.get("/", (req, res) => {
  res.send("API jalan");
});

app.post("/api/v1/orders", (req, res) => {
  const { items, customer, pickup } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Items kosong" });
  }

  let total = 0;

  for (const item of items) {
    const product = db
      .prepare("SELECT * FROM products WHERE id=?")
      .get(item.product_id);

    // 🔥 VALIDASI KERAS
    if (!product) {
      return res.status(400).json({
        message: `Product tidak ditemukan: ${item.product_id}`
      });
    }

    total += product.price * item.qty;
  }

  const result = db.prepare(`
    INSERT INTO orders (status, total, customer, pickup)
    VALUES (?, ?, ?, ?)
  `).run(
    "pending",
    total,
    JSON.stringify(customer),
    JSON.stringify(pickup)
  );

  const orderId = result.lastInsertRowid;

  const insertItem = db.prepare(`
    INSERT INTO items (orderId, productId, qty)
    VALUES (?, ?, ?)
  `);

  for (const item of items) {
    insertItem.run(orderId, item.product_id, item.qty);
  }

  // 🔥 simulasi status
  // setTimeout(() => db.prepare("UPDATE orders SET status=? WHERE id=?").run("paid", orderId), 15000);
  // setTimeout(() => db.prepare("UPDATE orders SET status=? WHERE id=?").run("preparing", orderId), 20000);
  // setTimeout(() => db.prepare("UPDATE orders SET status=? WHERE id=?").run("ready", orderId), 30000);
  // setTimeout(() => db.prepare("UPDATE orders SET status=? WHERE id=?").run("done", orderId), 40000);

  res.json({
    id: orderId,
    status: "pending",
    total,
    items,
    customer,
    pickup
  });
});

// 🔥 GET ORDER BY ID
app.get("/api/v1/orders/:id", (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id=?")
    .get(req.params.id);

  if (!order) return res.status(404).json({ message: "Not found" });

  const items = db.prepare(`
    SELECT 
      items.qty,
      products.id as product_id,
      products.name,
      products.description,
      products.price,
      products.image
    FROM items
    JOIN products ON items.productId = products.id
    WHERE items.orderId = ?
  `).all(req.params.id);

  res.json({
    ...order,
    items,
    customer: JSON.parse(order.customer),
    pickup: JSON.parse(order.pickup)
  });
});

// 🔥 GET ALL ORDERS (UNTUK HISTORY)
app.get("/api/v1/orders", (req, res) => {
  const orders = db
    .prepare("SELECT * FROM orders ORDER BY id DESC")
    .all();

  const result = orders.map(o => {

    const items = db.prepare(`
      SELECT 
        items.qty,
        products.id as product_id,
        products.name,
        products.description,
        products.price,
        products.image
      FROM items
      JOIN products ON items.productId = products.id
      WHERE items.orderId = ?
    `).all(o.id);

    return {
      ...o,
      items,
      customer: JSON.parse(o.customer),
      pickup: JSON.parse(o.pickup)
    };
  });

  res.json(result);
});

app.get("/api/v1/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

app.get("/api/v1/dashboard", (req, res) => {
  const totalOrders = db.prepare("SELECT COUNT(*) as total FROM orders").get().total;

  const totalRevenue = db.prepare(`
    SELECT SUM(total) as total FROM orders WHERE status != 'cancelled'
  `).get().total || 0;

  const pending = db.prepare(`
    SELECT COUNT(*) as total FROM orders WHERE status='pending'
  `).get().total;

  const processing = db.prepare(`
    SELECT COUNT(*) as total FROM orders WHERE status IN ('paid','preparing')
  `).get().total;

  res.json({
    totalOrders,
    totalRevenue,
    pending,
    processing
  });
});

// CREATE
app.post("/api/v1/products", (req, res) => {
  const { name, description, price, image } = req.body;

  const result = db.prepare(`
    INSERT INTO products (name, description, price, image)
    VALUES (?, ?, ?, ?)
  `).run(name, description, price, image);

  res.json({ id: result.lastInsertRowid });
});

// UPDATE
app.put("/api/v1/products/:id", (req, res) => {
  const { name, description, price, image } = req.body;

  db.prepare(`
    UPDATE products
    SET name=?, description=?, price=?, image=?
    WHERE id=?
  `).run(name, description, price, image, req.params.id);

  res.json({ message: "updated" });
});

// DELETE
app.delete("/api/v1/products/:id", (req, res) => {
  db.prepare("DELETE FROM products WHERE id=?")
    .run(req.params.id);

  res.json({ message: "deleted" });
});

app.patch("/api/v1/orders/:id/status", (req, res) => {
  const { status } = req.body;

  db.prepare("UPDATE orders SET status=? WHERE id=?")
    .run(status, req.params.id);

  res.json({ message: "updated" });
});

app.patch("/api/v1/orders/:id/cancel", (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id=?").get(req.params.id);

  if (!order) return res.status(404).json({ message: "Not found" });

  if (!["pending", "paid"].includes(order.status)) {
    return res.status(400).json({ message: "Tidak bisa dibatalkan" });
  }

  db.prepare("UPDATE orders SET status=? WHERE id=?")
    .run("cancelled", req.params.id);

  res.json({ message: "Order cancelled" });
});

app.patch("/api/v1/products/:id/toggle", (req, res) => {
  const product = db
    .prepare("SELECT * FROM products WHERE id=?")
    .get(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }

  const newStatus = product.available ? 0 : 1;

  db.prepare(`
    UPDATE products 
    SET available=? 
    WHERE id=?
  `).run(newStatus, req.params.id);

  res.json({ available: newStatus });
});



app.post("/api/v1/upload", upload.single("image"), (req, res) => {
  res.json({
    image: `/uploads/${req.file.filename}`
  });
});
// serve static file
app.use("/uploads", express.static("uploads"));

// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/webhook", webhookRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
