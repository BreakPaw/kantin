import { useState } from "react";

const OrdersTable = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-lg font-semibold">Pesanan Terbaru</h3>

        <input
          placeholder="Cari Pelanggan..."
          className="hidden md:block bg-[#f4f2ed] px-4 py-2 rounded-full text-sm outline-none"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {orders.slice(0, 4).map((o) => (
            <button
              key={o.id}
              onClick={() => setSelectedOrder(o)}
              className="w-full text-left rounded-xl border border-[#efe9dd] bg-[#f8f6f2] p-4 shadow-sm"
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
                      : o.status === "preparing"
                        ? "bg-blue-100 text-blue-600"
                        : o.status === "done"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {o.status}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <p className="font-semibold text-[#1D6E4F]">
                  Rp {(o.total || 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">
                  {o.createdAt
                    ? new Date(o.createdAt).toLocaleTimeString()
                    : "-"}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block space-y-3">
          {orders.slice(0, 4).map((o) => (
            <div
              key={o.id}
              onClick={() => setSelectedOrder(o)}
              className="grid grid-cols-6 items-center bg-[#f8f6f2] p-4 rounded-xl text-sm cursor-pointer hover:bg-[#f1eee7] transition"
            >
              <div className="text-gray-500 font-medium">#{o.id}</div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">
                  {o.customer?.name?.[0] || "?"}
                </div>
                <p>{o.customer?.name || "Unknown"}</p>
              </div>

              <div className="text-gray-600">{o.items?.length || 0} item</div>

              <div className="font-semibold">
                Rp {(o.total || 0).toLocaleString()}
              </div>

              <div>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    o.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : o.status === "preparing"
                        ? "bg-blue-100 text-blue-600"
                        : o.status === "done"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {o.status}
                </span>
              </div>

              <div className="text-gray-400 text-xs">
                {o.createdAt ? new Date(o.createdAt).toLocaleTimeString() : "-"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4">
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Detail Pesanan #{selectedOrder.id}
              </h2>

              <button onClick={() => setSelectedOrder(null)}>✖</button>
            </div>

            {/* CUSTOMER */}
            <div className="text-sm text-gray-600">
              <p>
                <b>Nama:</b> {selectedOrder.customer.name}
              </p>
              <p>
                <b>Phone:</b> {selectedOrder.customer.phone}
              </p>
            </div>

            {/* ITEMS */}
            <div className="space-y-3">
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-400">x{item.qty}</p>
                  </div>

                  <p className="font-semibold">
                    Rp {((item.qty || 0) * (item.price || 0)).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <hr />

            {/* TOTAL */}
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p className="text-green-700">
                Rp {selectedOrder.total.toLocaleString()}
              </p>
            </div>

            {/* ACTION */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2 bg-gray-200 rounded-full"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
