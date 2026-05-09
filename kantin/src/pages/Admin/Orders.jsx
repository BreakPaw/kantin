import { useEffect, useState } from "react";
import { api } from "../../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status`, {
      status,
    });

    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const visibleOrders = orders.filter((o) => o.status !== "pending");
  const filtered = visibleOrders.filter((o) =>
    filter === "all" ? true : o.status === filter,
  );

  const approveOrder = async (id) => {
    try {
      await api.patch(`/orders/${id}/status`, {
        status: "paid",
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: "paid" } : order,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#1D6E4F]">Pesanan</h1>
        <p className="text-sm text-gray-500">
          Kelola status dan bukti pembayaran.
        </p>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap gap-2 pb-1 -mx-1 px-1">
        {["all", "paid", "preparing", "ready", "done"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              filter === s
                ? "bg-[#1D6E4F] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* MOBILE LIST */}
      <div className="space-y-3 lg:hidden">
        {filtered.map((o) => (
          <div
            key={o.id}
            className="rounded-lg border border-[#efe9dd] bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500">Pesanan #{o.id}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {o.customer?.name || "Unknown"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {o.items?.length || 0} item
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium h-fit ${
                  o.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : o.status === "paid"
                      ? "bg-blue-100 text-blue-600"
                      : o.status === "preparing"
                        ? "bg-purple-100 text-purple-600"
                        : o.status === "ready"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-600"
                }`}
              >
                {o.status}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <p className="font-semibold text-green-800">
                Rp {o.total.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">
                {o.createdAt ? new Date(o.createdAt).toLocaleTimeString() : "-"}
              </p>
            </div>

            {o.proof && (
              <button
                onClick={() => setSelectedImage(o.proof)}
                className="mt-3 w-full"
              >
                <img
                  src={o.proof}
                  alt="proof"
                  className="w-full h-40 object-cover rounded-xl border"
                />
              </button>
            )}

            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                onClick={() => approveOrder(o.id)}
                className="py-2 text-xs rounded-full bg-blue-600 text-white"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(o.id, "preparing")}
                className="py-2 text-xs rounded-full bg-yellow-500 text-white"
              >
                Preparing
              </button>
              <button
                onClick={() => updateStatus(o.id, "done")}
                className="py-2 text-xs rounded-full bg-green-600 text-white"
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white rounded-2xl p-4 md:p-6 shadow-sm">
        {/* HEADER */}
        <div className="hidden md:grid grid-cols-5 text-sm text-gray-400 mb-4 px-2">
          <p>ID</p>
          <p>Pelanggan</p>
          <p>Total</p>
          <p>Status</p>
          <p>Aksi</p>
        </div>

        {/* ROW */}
        {filtered.map((o) => (
          <div
            key={o.id}
            className="flex flex-col gap-4 bg-[#f8f6f2] p-4 rounded-xl mb-3 hover:bg-[#f1eee7] transition"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-gray-500 font-medium">#{o.id}</p>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium w-fit ${
                  o.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : o.status === "paid"
                      ? "bg-blue-100 text-blue-600"
                      : o.status === "preparing"
                        ? "bg-purple-100 text-purple-600"
                        : o.status === "ready"
                          ? "bg-green-100 text-green-600"
                          : o.status === "done"
                            ? "bg-gray-200 text-gray-600"
                            : ""
                }`}
              >
                {o.status}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">
                  {o.customer?.name?.[0] || "?"}
                </div>
                <p className="font-medium">{o.customer?.name || "Unknown"}</p>
              </div>
              <p className="font-semibold">Rp {o.total.toLocaleString()}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              {o.proof && (
                <img
                  src={o.proof}
                  alt="proof"
                  onClick={() => setSelectedImage(o.proof)}
                  className="w-24 h-24 object-cover rounded-xl border cursor-pointer shrink-0"
                />
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => approveOrder(o.id)}
                  className="px-6 py-2 text-xs rounded-full bg-blue-600 text-white hover:opacity-80"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(o.id, "preparing")}
                  className="px-3 py-1 text-xs rounded-full bg-yellow-500 text-white hover:opacity-80"
                >
                  Preparing
                </button>

                <button
                  onClick={() => updateStatus(o.id, "done")}
                  className="px-3 py-1 text-xs rounded-full bg-green-600 text-white hover:opacity-80"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={selectedImage}
            alt="preview"
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
