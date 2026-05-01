import { useState } from "react";
import { useCart } from "../../store/CartContext";
import { BASE_URL } from "../../services/api";

const ProductCard = ({ product }) => {
  const [qty, setQty] = useState(0);
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      
      {/* Image */}
      <div className="h-44 overflow-hidden">
        <img
          src={`${BASE_URL}${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {product.desc}
        </p>

        {/* Price */}
        <p className="text-green-700 font-semibold mt-3">
          Rp {product.price}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          
          {/* Qty */}
          <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
            <button onClick={() => setQty(Math.max(0, qty - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          {/* Button */}
          <button
            onClick={() => {
              if (qty > 0) addToCart(product, qty);
              setQty(0);
            }}
            className="bg-green-700 text-white px-4 py-2 rounded-full">
            Pesan
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;