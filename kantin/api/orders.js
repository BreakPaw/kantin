import { supabase } from "./_lib/supabase.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {

    const { id } = req.query;

    // 🔥 DETAIL ORDER
    if (id) {

      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          items (
            qty,
            product_id,
            products (
              id,
              name,
              description,
              price,
              image
            )
          )
        `)
        .eq("id", id)
        .single();

      if (error || !data) {
        return res.status(404).json({
          message: "Order tidak ditemukan"
        });
      }

      const formatted = {
        ...data,
        customer:
          typeof data.customer === "string"
            ? JSON.parse(data.customer)
            : data.customer,

        pickup:
          typeof data.pickup === "string"
            ? JSON.parse(data.pickup)
            : data.pickup,

        items: data.items.map(item => ({
          qty: item.qty,
          product_id: item.product_id,
          ...item.products
        }))
      };

      return res.status(200).json(formatted);
    }

    // 🔥 ALL ORDERS
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        items (
          qty,
          product_id,
          products (
            id,
            name,
            description,
            price,
            image
          )
        )
      `)
      .order("id", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const formatted = data.map(order => ({
      ...order,

      customer:
        typeof order.customer === "string"
          ? JSON.parse(order.customer)
          : order.customer,

      pickup:
        typeof order.pickup === "string"
          ? JSON.parse(order.pickup)
          : order.pickup,

      items: order.items.map(item => ({
        qty: item.qty,
        product_id: item.product_id,
        ...item.products
      }))
    }));

    return res.status(200).json(formatted);
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

    const orderId = data[0].id;
    console.log("ITEMS:", items);
    const itemsToInsert = items.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      qty: item.qty
    }));

    const { error: itemsError } = await supabase
      .from("items")
      .insert(itemsToInsert);

    if (itemsError) {
      console.error("Error inserting items:", itemsError);
      return res.status(500).json({
        error: itemsError.message
      });
    }

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }
}