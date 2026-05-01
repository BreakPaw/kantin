// routes/webhook.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const db = require("../db");

router.post("/midtrans", async (req, res) => {
  try {
    const notif = req.body;

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = notif;

    // verify signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const hash = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + serverKey)
      .digest("hex");

    if (hash !== signature_key) {
      return res.status(403).json({ message: "Invalid signature" });
    }

    // ambil id lokal dari order_id
    const localId = order_id.split("-")[1];

    let newStatus = "pending";
    if (transaction_status === "capture" || transaction_status === "settlement") {
      newStatus = "paid";
    } else if (transaction_status === "cancel" || transaction_status === "deny" || transaction_status === "expire") {
      newStatus = "failed";
    }

    await db.order.update(
      { status: newStatus },
      { where: { id: localId } }
    );

    res.json({ message: "ok" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "webhook error" });
  }
});

module.exports = router;