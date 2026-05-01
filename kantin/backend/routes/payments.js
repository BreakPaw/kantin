// routes/payment.js
const express = require("express");
const router = express.Router();
const snap = require("../services/midtrans");

// contoh: ambil order dari DB
const db = require("../db"); // sesuaikan

router.post("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await db.order.findByPk(orderId, {
      include: ["items", "customer"], // sesuaikan ORM kamu
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    const parameter = {
      transaction_details: {
        order_id: `ORDER-${order.id}-${Date.now()}`, // unik
        gross_amount: order.total,
      },
      customer_details: {
        first_name: order.customer.name,
        phone: order.customer.phone,
      },
      item_details: order.items.map(i => ({
        id: i.product_id,
        price: i.price,
        quantity: i.qty,
        name: i.name,
      })),
    };

    const trx = await snap.createTransaction(parameter);

    // simpan snap_token & midtrans_order_id jika perlu
    await db.order.update(
      { snap_token: trx.token, midtrans_order_id: parameter.transaction_details.order_id },
      { where: { id: order.id } }
    );

    res.json({ token: trx.token, redirect_url: trx.redirect_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed create payment" });
  }
});

module.exports = router;