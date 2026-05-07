import { supabase } from "./_lib/supabase.js";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {

    const form = formidable();

    const [fields, files] = await form.parse(req);

    const file = files.image[0];

    const fileBuffer = fs.readFileSync(file.filepath);

    const fileName = `product-${Date.now()}-${file.originalFilename}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, fileBuffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return res.status(200).json({
      url: data.publicUrl,
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      message: "Upload gagal",
    });
  }
}