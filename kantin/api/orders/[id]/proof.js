import { supabase } from "../../_lib/supabase.js";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  const { proof } = req.body;

  const { error } = await supabase
    .from("orders")
    .update({ proof })
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: "Proof saved" });
}