import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


import PaymentSummary from "../components/sections/PaymentSummary";
import PaymentSteps from "../components/sections/PaymentSteps";

const Payment = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  // 🔹 fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      const res = await api.get(`/orders/${orderId}`); // nanti dynamic
      setOrder(res.data);
    };

    fetchOrder();
  }, [orderId]);

  // 🔹 polling status
  useEffect(() => {
    if (!order) return;

    const interval = setInterval(async () => {
      const res = await api.get(`/orders/${order.id}`);

      if (res.data.status === "paid") {
        clearInterval(interval);
        navigate(`/success/${orderId}`);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [order]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="px-10 py-6">

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-700">
          Selesaikan Pembayaran
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Segera selesaikan pembayaran agar pesanan Anda dapat segera kami proses.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <PaymentSummary order={order} />
        <PaymentSteps />
      </div>

    </div>
  );
};

export default Payment;