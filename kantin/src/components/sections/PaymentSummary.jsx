import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

const PaymentSummary = ({ order }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [expiredAt] = useState(new Date(Date.now() + 1000 * 60 * 60));
  const [timeLeft, setTimeLeft] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ⏳ TIMER
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = expiredAt - new Date();

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(interval);
        return;
      }

      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 UPLOAD BUKTI
  const handleUpload = async () => {
    if (!file) return alert("Pilih bukti pembayaran dulu");

    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64 = reader.result.split(",")[1];

        await api.post("/upload-proof", {
          file: base64,
          orderId
        });

        alert("Bukti berhasil dikirim");
        navigate(`/success/${orderId}`);
      } catch (err) {
        console.error(err);
        alert("Upload gagal");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">

      {/* TOTAL */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <p className="text-sm text-gray-500">TOTAL PEMBAYARAN</p>

        <h2 className="text-3xl font-bold text-green-700 mt-2">
          Rp {order?.total?.toLocaleString()}
        </h2>

        <p className="text-sm text-yellow-600 mt-2">
          ⏳ Batas waktu: {timeLeft}
        </p>
      </div>

      {/* QR (STATIC) */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <p className="text-gray-500 mb-3">Scan QR untuk bayar</p>

        <img
          src="/assets/qris.webp" // /🔥 taruh gambar QR kamu di public folder
          className="w-48 mx-auto"
        />
      </div>

      {/* UPLOAD */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <p className="mb-3 text-gray-500">Upload Bukti Pembayaran</p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-4 w-full bg-green-700 text-white py-3 rounded-full"
        >
          {loading ? "Uploading..." : "Kirim Bukti Pembayaran"}
        </button>
      </div>

    </div>
  );
};

export default PaymentSummary;