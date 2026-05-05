import { supabase } from "./_lib/supabase.js";

export default async function handler(req, res) {
  // ✅ WAJIB handle method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const notification = req.body;

    console.log("WEBHOOK MASUK:", notification);

    // 🔥 ambil data dari midtrans
    const orderId = notification.order_id;
    const status = notification.transaction_status;

    // fallback biar ga undefined
    if (!orderId) {
      return res.status(200).json({ message: "no order_id" });
    }

    // mapping status
    let newStatus = "pending";

    if (status === "settlement") newStatus = "paid";
    else if (status === "pending") newStatus = "pending";
    else if (status === "cancel" || status === "expire") newStatus = "cancelled";

    // 🔥 update DB
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      console.error("DB ERROR:", error);
      return res.status(200).json({ message: "db error but ok" });
      // ⚠️ tetap 200 biar midtrans ga retry terus
    }

    return res.status(200).json({ message: "ok" });

  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return res.status(200).json({ message: "error handled" });
  }
}