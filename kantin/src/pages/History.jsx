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
    const myOrders = JSON.parse(localStorage.getItem("my_orders")) || [];

    api.get("/orders").then((res) => {
      const filtered = res.data.filter((order) => myOrders.includes(order.id));

      setOrders(filtered);
    });
  }, []);

  // 🔥 FILTER LOGIC
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  return (
    <div className="px-8 lg:px-10 mx-auto">
      {/* HEADER */}
      <h1 className="font-jakarta font-bold text-[32px] leading-12 tracking-[-1.2px] text-[#1D6E4F] ">
        Riwayat Pesanan
      </h1>

      <p className="text-gray-500 mt-2 max-w-xl text-sm sm:text-base">
        Menampilkan perjalanan cita rasa yang telah Anda nikmati.
      </p>

      {/* FILTER */}
      <div className="flex flex-wrap gap-2 mt-6 pb-1 -mx-1 px-1">
        {[
          { label: "Semua", value: "all" },
          { label: "Berlangsung", value: "pending" },
          { label: "Selesai", value: "done" },
          { label: "Dibatalkan", value: "cancelled" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition
              ${
                filter === btn.value
                  ? "bg-[#1D6E4F] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="mt-8 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 sm:py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <div className="text-3xl mb-3">🍽️</div>
            <p className="text-sm sm:text-base">Belum ada pesanan</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Saat kamu checkout, pesananmu muncul di sini.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
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
