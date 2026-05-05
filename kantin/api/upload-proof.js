import { supabase } from "./_lib/supabase.js";

export default async function handler(req, res) {
  try {
    const { file, orderId } = req.body;

    const buffer = Buffer.from(file, "base64");
    const fileName = `order-${orderId}.png`;

    const { error } = await supabase.storage
      .from("payment-proofs")
      .upload(fileName, buffer, {
        contentType: "image/png",
        upsert: true
      });

    if (error) throw error;

    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/payment-proofs/${fileName}`;

    await supabase
      .from("orders")
      .update({
        payment_proof: publicUrl,
        payment_status: "pending"
      })
      .eq("id", orderId);

    res.status(200).json({ url: publicUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload gagal" });
  }
}