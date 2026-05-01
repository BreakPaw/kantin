import { useEffect, useState } from "react";
import { api } from "../../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

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
    await api.patch(`/orders/${id}/status`, { status });

    setOrders(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status } : o
      )
    );
  };

  const filtered = orders.filter(o =>
    filter === "all" ? true : o.status === filter
  );

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Pesanan
      </h1>

      {/* FILTER */}
      <div className="flex gap-3">
        {["all", "pending", "paid", "preparing", "ready", "done"].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded ${
              filter === s ? "bg-green-700 text-white" : "bg-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">

        {/* HEADER */}
        <div className="grid grid-cols-6 text-sm text-gray-400 mb-4 px-2">
          <p>ID</p>
          <p>Pelanggan</p>
          <p>Total</p>
          <p>Status</p>
          <p className="col-span-2">Aksi</p>
        </div>

        {/* ROW */}
        {filtered.map((o) => (
          <div
            key={o.id}
            className="grid grid-cols-6 items-center bg-[#f8f6f2] p-4 rounded-xl mb-3 hover:bg-[#f1eee7] transition"
          >

            {/* ID */}
            <p className="text-gray-500 font-medium">
              #{o.id}
            </p>

            {/* CUSTOMER */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">
                {o.customer.name[0]}
              </div>
              <p className="font-medium">{o.customer.name}</p>
            </div>

            {/* TOTAL */}
            <p className="font-semibold">
              Rp {o.total.toLocaleString()}
            </p>

            {/* STATUS */}
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

            {/* ACTION */}
            <div className="col-span-2 flex gap-2">

              <button
                onClick={() => updateStatus(o.id, "paid")}
                className="px-3 py-1 text-xs rounded-full bg-blue-500 text-white hover:opacity-80"
              >
                Paid
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
        ))}

      </div>

    </div>
  );
};

export default Orders;