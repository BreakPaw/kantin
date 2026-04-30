import { useEffect, useState } from "react";
import { api } from "../services/api";
import HistoryCard from "../components/sections/HistoryCard";
import { useCart } from "../store/CartContext";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  const { reorder } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data));
  }, []);

  // 🔥 FILTER LOGIC
  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  return (
    <div className="px-10 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-green-700">
        Riwayat Pesanan
      </h1>

      <p className="text-gray-500 mt-2 max-w-xl">
        Menampilkan perjalanan cita rasa yang telah Anda nikmati.
      </p>

      {/* FILTER */}
      <div className="flex gap-3 mt-6">
        {[
          { label: "Semua", value: "all" },
          { label: "Berlangsung", value: "pending" },
          { label: "Selesai", value: "done" },
          { label: "Dibatalkan", value: "cancelled" }
        ].map(btn => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value)}
            className={`px-4 py-2 rounded-full text-sm
              ${filter === btn.value
                ? "bg-green-700 text-white"
                : "bg-gray-200 text-gray-600"}
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="mt-8 space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Belum ada pesanan</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <HistoryCard
              key={order.id}
              order={order}
              onReorder={() => {
                reorder(order.items);
                navigate("/checkout");
              }}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default History;