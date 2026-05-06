import { supabase } from "./_lib/supabase.js";

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "PATCH") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  try {
    const { id, proof } = req.body;

    const { error } = await supabase
      .from("orders")
      .update({ proof })
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json({
      message: "Proof saved"
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error"
    });
  }
}