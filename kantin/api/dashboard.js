import { supabase } from "./_lib/supabase.js";

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*");

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  const totalOrders = data.length;

  const totalRevenue = data
    .filter(o => o.status === "done")
    .reduce((acc, curr) => acc + (curr.total || 0), 0);

  const pending = data.filter(
    o => o.status === "pending"
  ).length;

  const processing = data.filter(o =>
    ["paid", "preparing"].includes(o.status)
  ).length;

  return res.status(200).json({
    totalOrders,
    totalRevenue,
    pending,
    processing
  });
}