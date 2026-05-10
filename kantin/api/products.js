import { supabase } from "./_lib/supabase.js";

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ================= GET =================
  if (req.method === "GET") {

    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json(data);
  }

  // ================= POST =================
  if (req.method === "POST") {

    const { name, description, price, image } = req.body;

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          description,
          price,
          image,
          available: 1
        }
      ]);

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json({
      message: "insert success"
    });
  }

  // ================= PATCH =================
  if (req.method === "PATCH") {
    console.log(req.body);
    const {
      id,
      name,
      description,
      price,
      image,
      available
    } = req.body;

    console.log("ID received from FE:", id);
    console.log("Name:", name);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Image:", image);

    const { data, error } = await supabase
      .from("products")
      .update({
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(image !== undefined && { image }),
        ...(available !== undefined && { available }),
      })
      .eq("id", id)
      .select();

    console.log("Supabase response:", data, error);

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json({
      message: "updated"
    });
  }

  // ================= DELETE =================
  if (req.method === "DELETE") {

    const { id } = req.body;

    const { error } = await supabase
      .from("products")
      .update({ available: 0 })
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