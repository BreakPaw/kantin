import { supabase } from "./_lib/supabase.js";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const form = formidable();

    const [fields, files] = await form.parse(req);
    const file = files.file[0];

    const fileBuffer = fs.readFileSync(file.filepath);

    const fileName = `proof-${Date.now()}-${file.originalFilename}`;

    const { error } = await supabase.storage
      .from("payments")
      .upload(fileName, fileBuffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("payments")
      .getPublicUrl(fileName);

    return res.status(200).json({
      url: data.publicUrl,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Upload gagal" });
  }
}