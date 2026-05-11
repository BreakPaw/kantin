import { supabase } from "./_lib/supabase.js";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {

  // ✅ CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // ✅ OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ METHOD CHECK
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {

    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const [fields, files] = await form.parse(req);

    console.log("FILES:", files);

    // ✅ VALIDASI
    if (!files.file || !files.file[0]) {
      return res.status(400).json({
        error: "File tidak ditemukan",
      });
    }

    const file = files.file[0];

    const fileBuffer = fs.readFileSync(file.filepath);

    const fileName = `proof-${Date.now()}-${file.originalFilename}`;

    // ✅ UPLOAD
    const { error } = await supabase.storage
      .from("payments")
      .upload(fileName, fileBuffer, {
        contentType: file.mimetype,
      });

    // ✅ DETAIL ERROR
    if (error) {
      console.error("SUPABASE ERROR:", error);

      return res.status(500).json({
        error: error.message,
      });
    }

    const { data } = supabase.storage
      .from("payments")
      .getPublicUrl(fileName);

    return res.status(200).json({
      url: data.publicUrl,
    });

  } catch (err) {

    console.error("UPLOAD ERROR:", err);

    return res.status(500).json({
      error: err.message || "Upload gagal",
    });
  }
}