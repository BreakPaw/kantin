import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";


const PaymentSummary = ({ order }) => {
  const total = 425000; // nanti dari backend
  const expiredAt = new Date(Date.now() + 1000 * 60 * 60); // 1 jam

  const [timeLeft, setTimeLeft] = useState("");

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

  return (
    <div className="space-y-6">

      {/* Total */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <p className="text-sm text-gray-500">TOTAL PEMBAYARAN</p>
        <h2 className="text-3xl font-bold text-green-700 mt-2">
          Rp {order.total.toLocaleString()}
        </h2>

        <p className="text-sm text-yellow-600 mt-2">
          ⏳ Batas waktu: {timeLeft}
        </p>
      </div>

      {/* QR */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <p className="text-sm text-gray-400 mb-3">PINDAI DISINI</p>

        <QRCodeSVG
          value={`ORDER-${order.id}-${order.total}`}
          size={180}
          className="mx-auto"
        />

        <p className="text-sm text-gray-500 mt-3">
          Klik QR Code untuk memperbesar atau simpan gambar.
        </p>
      </div>

    </div>
  );
};

export default PaymentSummary;