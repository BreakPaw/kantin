import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useParams, useNavigate } from "react-router";

const PaymentSummary = ({ order }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const expiredAt = new Date(Date.now() + 1000 * 60 * 60);
  const [timeLeft, setTimeLeft] = useState("");

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

  // 🔥 MIDTRANS PAYMENT
  useEffect(() => {
    const pay = async () => {
      try {
        const res = await api.post(`/payment/${orderId}`);
        const token = res.data.token;

        window.snap.pay(token, {
          onSuccess: function () {
            navigate(`/success/${orderId}`);
          },
          onPending: function () {
            console.log("pending");
          },
          onError: function () {
            alert("Pembayaran gagal");
          },
          onClose: function () {
            console.log("user close popup");
          }
        });

      } catch (err) {
        console.error(err);
      }
    };

    pay();
  }, [orderId]);

  return (
    <div className="space-y-6">

      {/* TOTAL */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <p className="text-sm text-gray-500">TOTAL PEMBAYARAN</p>

        <h2 className="text-3xl font-bold text-green-700 mt-2">
          Rp {order.total.toLocaleString()}
        </h2>

        <p className="text-sm text-yellow-600 mt-2">
          ⏳ Batas waktu: {timeLeft}
        </p>
      </div>

      {/* INFO */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm">
        <p className="text-gray-500">
          Membuka halaman pembayaran...
        </p>
      </div>

    </div>
  );
};

export default PaymentSummary;