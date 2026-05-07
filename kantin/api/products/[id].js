import { supabase } from "../_lib/supabase.js";

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");



  const { id } = req.query;
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      id
    });
  }
  if (req.method === "POST") {

    const { name, price, image, description } = req.body;

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price,
        image,
        description
      })
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json({
      message: "updated"
    });
  }

  if (req.method === "DELETE") {

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json({
      message: "deleted"
    });
  }

  return res.status(405).json({
    message: "Method not allowed"
  });
}