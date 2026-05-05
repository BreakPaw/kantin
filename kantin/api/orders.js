import { supabase } from "./_lib/supabase.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  if (req.method === "GET") {
    const { id } = req.query;

    // ambil 1 order
    if (id) {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json(data);
    }

    // ambil semua order
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { items, customer, pickup } = req.body;

    // 👉 hitung total dari items (pakai Supabase)
    let total = 0;

    for (const item of items) {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", item.product_id)
        .single();

      if (error || !product) {
        return res.status(400).json({ message: "Product tidak ditemukan" });
      }

      total += product.price * item.qty;
    }

    // 👉 insert order
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          status: "pending",
          total,
          customer: JSON.stringify(customer),
          pickup: JSON.stringify(pickup)
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }
}