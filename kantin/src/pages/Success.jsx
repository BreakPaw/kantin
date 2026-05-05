import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import OrderStatus from "../components/sections/OrderStatus";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/api";

const Success = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders?id=${orderId}`);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 fetch pertama (instant)
  fetchOrder();

  // 🔥 polling tiap 3 detik
  const interval = setInterval(fetchOrder, 3000);

  return () => clearInterval(interval);
}, [orderId]);

  if (!order) return <p>Loading...</p>;

  const subtotal = order.total;
  const total = order.total;

  return (
    <div className="px-10 py-10 space-y-10">

      {/* HEADER */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          ✓
        </div>

        <h1 className="text-3xl font-bold text-green-700">
          Pesanan Anda Sedang Disiapkan
        </h1>

        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Terima kasih atas kepercayaan Anda. Pesanan akan segera diproses.
        </p>

        <div className="mt-4 inline-block bg-gray-200 px-4 py-2 rounded-full text-sm">
          NOMOR PESANAN{" "}
          <span className="font-bold text-green-700">#{orderId}</span>
        </div>
      </div>

      {/* 🔥 STATUS FULL WIDTH */}
      <div className="bg-[#f4f2ed] p-8 rounded-2xl">
        <OrderStatus status={order.status} />
      </div>

      {/* 🔥 GRID BAWAH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            🍴Rincian Pesanan
          </h3>


          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between mb-5">

              <div className="flex gap-4">
                <img src={`${BASE_URL}${item.image}`} className="w-16 h-16 rounded-xl object-cover" />

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">{item.qty} Porsi</p>
                <p className="font-semibold text-green-700">
                  Rp {(item.qty * item.price).toLocaleString()}
                </p>
              </div>

            </div>
          ))}

          <hr className="my-4 border-gray-200" />

          {/* SUBTOTAL */}
          <div className="flex justify-between text-sm text-gray-600">
            <p>Subtotal</p>
            <p>Rp {subtotal.toLocaleString()}</p>
          </div>

          {/* TOTAL */}
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-bold text-green-700">
              Rp {total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <div className="bg-[#f4f2ed] p-6 rounded-xl">
            <p className="text-sm text-gray-500">CUSTOMER</p>
            <p>{order.customer.name}</p>
            <p>{order.customer.phone}</p>
          </div>

          <div className="bg-[#f4f2ed] p-6 rounded-xl">
            <p className="text-sm text-gray-500">PENGAMBILAN</p>
            <p>{order.pickup.date}</p>
            <p>{order.pickup.time}</p>
          </div>

          <div className="bg-green-700 text-white p-6 rounded-xl">
            <p className="font-semibold">Pembayaran Berhasil</p>
          </div>

        </div>
      </div>

      {/* ACTION */}
      <div className="flex gap-4 justify-center">

        <Link
          to="/history"
          className="bg-green-700 text-white px-6 py-3 rounded-full"
        >
          Lihat Riwayat
        </Link>

        <Link
          to="/"
          className="bg-gray-200 px-6 py-3 rounded-full"
        >
          Kembali ke Beranda
        </Link>

      </div>

    </div>
  );
};

export default Success;