import { useCart } from "../../store/CartContext";
import { useNavigate } from "react-router";

const CartSummary = () => {
  const { getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  const total = getTotalPrice();
  const items = getTotalItems();

  if (items === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-green-700 text-white rounded-xl px-6 py-4 flex items-center justify-between shadow-lg">
      
      {/* Left */}
      <div>
        <p className="text-sm opacity-80">TOTAL PESANAN</p>
        <p className="font-semibold">
          Rp {total.toLocaleString()} ({items} item)
        </p>
      </div>

      {/* Button */}
      <button onClick={() => navigate("/checkout")} className="bg-white text-green-700 px-5 py-2 rounded-full font-medium">
        Lanjut Pemesanan →
      </button>

    </div>
  );
};

export default CartSummary;