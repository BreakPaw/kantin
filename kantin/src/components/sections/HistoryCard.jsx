import { useNavigate } from "react-router-dom";
const statusStyle = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  preparing: "bg-green-100 text-green-700",
  ready: "bg-green-200 text-green-800",
  done: "bg-gray-200 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
};

const statusLabel = {
  pending: "Berlangsung",
  paid: "Dibayar",
  preparing: "Diproses",
  ready: "Siap Diambil",
  done: "Selesai",
  cancelled: "Dibatalkan",
};

const HistoryCard = ({ order, onReorder, onCancel }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 shadow-sm">
      {/* IMAGE (dummy dulu) */}
      <img
        src={order.items?.[0]?.image || "/assets/fallback.webp"}
        onError={(e) => {
          e.target.src = "/assets/fallback.webp";
        }}
        className="w-full sm:w-28 h-40 sm:h-28 rounded-xl object-cover"
      />

      {/* CONTENT */}
      <div className="flex-1">
        <p className="text-xs text-gray-400">PESANAN #{order.id}</p>

        <h3 className="font-semibold text-lg">
          {order.items?.[0]?.name || "Pesanan"}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {order.items?.length || 0} item
          {order.items?.length > 1 && (
            <> • +{order.items?.length - 1} lainnya</>
          )}
        </p>

        <p className="text-green-700 font-semibold mt-3">
          Rp {order.total.toLocaleString()}
        </p>
      </div>

      <div className="flex flex-col sm:items-end justify-between gap-3">
        {/* STATUS */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
          ${statusStyle[order.status] || "bg-gray-200 text-gray-600"}`}
        >
          {statusLabel[order.status] || order.status}
        </span>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {/* 🔥 PESAN LAGI */}
          <button
            onClick={onReorder}
            disabled={!order.items?.length}
            className={`px-4 py-2 rounded-full text-sm
              ${
                order.items?.length
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
              `}
          >
            Pesan Lagi
          </button>

          {["pending", "paid"].includes(order.status) && (
            <button
              onClick={() => onCancel?.()}
              disabled={!["pending", "paid"].includes(order.status)}
              className={`px-4 py-2 rounded-full text-sm
                ${
                  ["pending", "paid"].includes(order.status)
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              Batalkan
            </button>
          )}

          {/* DETAIL */}
          <button
            onClick={() => navigate(`/success/${order.id}`)}
            className="bg-green-700 text-white px-4 py-2 rounded-full text-sm"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
