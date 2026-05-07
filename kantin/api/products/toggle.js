import { supabase } from "../_lib/supabase.js";

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "PATCH,OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "PATCH") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  const { id } = req.body;

  // ambil data lama
  const { data: product } = await supabase
    .from("products")
    .select("available")
    .eq("id", id)
    .single();

  const newValue = product.available === 1 ? 0 : 1;

  // update toggle
  const { error } = await supabase
    .from("products")
    .update({
      available: newValue
    })
    .eq("id", id);

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  return res.status(200).json({
    available: newValue
  });
}