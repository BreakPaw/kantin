import { useState } from "react";
import { useParams } from "react-router-dom";
import { api, BASE_URL } from "../../services/api";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Buka Aplikasi E-Wallet",
    desc: "Buka aplikasi mobile banking atau e-wallet (Gopay, OVO, Dana, dll) favorit Anda.",
  },
  {
    title: "Pindai Kode QR",
    desc: "Pilih menu scan/bayar dan arahkan kamera ke QRIS.",
  },
  {
    title: "Konfirmasi Nominal",
    desc: "Pastikan jumlah sesuai dengan total pesanan.",
  },
  {
    title: "Selesaikan Pembayaran",
    desc: "Setelah pembayaran berhasil, sistem akan otomatis mendeteksi.",
  },
];

const PaymentSteps = () => {
  const [file, setFile] = useState(null);
  const [proof, setProof] = useState(null);
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Pilih file dulu");
      return;
    }

    if (uploading) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // delay kecil
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await api.post("/upload-proof", formData);

      const proofUrl = res.data?.url?.startsWith("http")
        ? res.data.url
        : `${BASE_URL}${res.data.url}`;

      setProof(proofUrl);

      await api.patch("/proof", {
        id: orderId,
        proof: proofUrl,
      });

      alert("Upload berhasil");

    } catch (err) {

      console.error("UPLOAD ERROR:", err);

      alert(
        err.response?.data?.error ||
        err.message ||
        "Upload gagal"
      );

    } finally {
      setUploading(false);
    }
  };

  const handleConfirmPaid = async () => {
    if (!proof) {
      alert(
        "Bukti pembayaran belum diunggah. Pesanan belum boleh masuk admin.",
      );
      return;
    }

    try {
      await api.patch("/status", {
        id: orderId,
        status: "paid",
      });

      navigate("/history");
    } catch (err) {
      console.error(err);
      alert("Gagal konfirmasi pembayaran");
    }
  };

  return (
    <div className="bg-[#f4f2ed] rounded-xl p-6">
      <h3 className="font-semibold text-[#1D6E4F] mb-6">Langkah Pembayaran</h3>

      <div className="space-y-5">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            {/* Number */}
            <div className="w-7 h-7 flex items-center justify-center bg-green-200 text-[#1D6E4F] rounded-full text-sm font-semibold">
              {i + 1}
            </div>

            {/* Text */}
            <div>
              <p className="font-medium">{step.title}</p>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={handleConfirmPaid}
        className={`mt-8 w-full py-3 rounded-full ${
          proof
            ? "bg-[#1D6E4F] text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Saya Sudah Bayar →
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Pembayaran aman & terenkripsi
      </p>
      <div className="mt-8 border-2 border-dashed p-4 rounded-lg text-center">
        <p className="mb-2 text-gray-500">Upload Bukti Pembayaran</p>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button
          disabled={uploading}
          onClick={handleUpload}
          className="mt-3 w-full bg-[#1D6E4F] text-white py-2 rounded-full"
        >
          {uploading ? "Uploading..." : "Kirim Bukti Pembayaran"}
        </button>

        {proof && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Preview Bukti:</p>
            <img src={proof} alt="bukti" className="w-40 mx-auto rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSteps;
