import { useCart } from "../../store/CartContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { BASE_URL } from "../../services/api";

const OrderSummary = ({ form, isValid }) => {
  const {
    cart,
    getTotalPrice,
    addToCart,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isValid) {
      alert("Isi data dengan lengkap dan benar!");
      return;
    }

    try {
      const res = await api.post("/orders", {
        items: cart.map((item) => ({
          product_id: item.id,
          qty: item.qty,
        })),
        customer: {
          name: form.name,
          phone: form.phone,
        },
        pickup: {
          time: form.time,
          date: form.date,
          note: form.note || "",
        },
      });
      console.log("ORDER RESPONSE:", res.data);
      const orderId = res.data[0].id;

      const myOrders = JSON.parse(localStorage.getItem("my_orders")) || [];

      myOrders.push(orderId);

      localStorage.setItem("my_orders", JSON.stringify(myOrders));
      clearCart();
      // 🔥 navigate ke payment dengan orderId
      navigate(`/payment/${orderId}`);
    } catch (err) {
      console.error(err);
      alert("Gagal membuat pesanan");
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm h-full flex flex-col justify-between">
      <div>
        <h3 className="font-semibold mb-4">Ringkasan Pesanan</h3>

        {/* Items */}
        <div className="space-y-4">
          {cart.length === 0 && (
            <p className="text-center text-gray-400 py-6">Keranjang kosong</p>
          )}
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : item.image?.startsWith("/assets/")
                      ? item.image
                      : `${BASE_URL}${item.image}`
                }
                onError={(e) => {
                  e.target.src = "/assets/fallback.webp";
                }}
                className="aspect-square w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-6 h-6 bg-gray-200 rounded-full"
                  >
                    -
                  </button>

                  <span className="text-sm">{item.qty}</span>

                  <button
                    onClick={() => addToCart(item, 1)}
                    className="w-6 h-6 bg-gray-200 rounded-full"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xs ml-2"
                  >
                    Hapus
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <p className="font-semibold text-sm">
                    Rp {((item.price || 0) * (item.qty || 0)).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    Rp {item.price.toLocaleString()} / porsi
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <hr className="my-4" />

        <div className="flex justify-between font-semibold text-lg">
          <p>Total</p>
          <p className="text-[#1D6E4F]">
            Rp {getTotalPrice().toLocaleString()}
          </p>
        </div>

        {/* 🔥 BUTTON */}
        <button
          disabled={!isValid || cart.length === 0}
          onClick={handleCheckout}
          className={`mt-6 w-full py-3 rounded-full 
    ${isValid ? "bg-[#1D6E4F] text-white" : "bg-gray-300 text-gray-500"}
  `}
        >
          Konfirmasi Pesanan
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
