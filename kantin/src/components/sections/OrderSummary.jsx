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
    clearCart
  } = useCart();
  const navigate = useNavigate();

  

  const handleCheckout = async () => {
    if (!isValid) {
      alert("Isi data dengan lengkap dan benar!");
      return;
    }

    try {
      const res = await api.post("/orders", {
        items: cart.map(item => ({
          product_id: item.id,
          qty: item.qty
        })),
        customer: {
          name: form.name,
          phone: form.phone
        },
        pickup: {
          time: form.time,
          date: form.date,
          note: form.note || ""
        }
      });

      const orderId = res.data[0].id;
      clearCart();
      // 🔥 navigate ke payment dengan orderId
      navigate(`/payment/${orderId}`);

    } catch (err) {
      console.error(err);
      alert("Gagal membuat pesanan");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      
      <h3 className="font-semibold mb-4">Ringkasan Pesanan</h3>

      {/* Items */}
      <div className="space-y-4">
        {cart.length === 0 && (
          <p className="text-center text-gray-400 py-6">
            Keranjang kosong
          </p>
        )}
        {cart.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img
              src={item.image?.startsWith("http") ? item.image : `${BASE_URL}${item.image}`}
              className="w-16 h-16 rounded-lg object-cover" />

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
              <p className="font-semibold text-sm">
                Rp {(item.price * item.qty).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">
                Rp {item.price.toLocaleString()} / porsi
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-semibold text-lg">
        <p>Total</p>
        <p className="text-green-700">
          Rp {getTotalPrice().toLocaleString()}
        </p>
      </div>

      {/* 🔥 BUTTON */}
      <button
        disabled={!isValid || cart.length === 0}
        onClick={handleCheckout}
        className={`mt-6 w-full py-3 rounded-full 
    ${isValid ? "bg-green-700 text-white" : "bg-gray-300 text-gray-500"}
  `}
      >
        Konfirmasi Pesanan
      </button>

    </div>
  );
};

export default OrderSummary;