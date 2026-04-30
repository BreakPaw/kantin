import { api } from "../../services/api";
import { BASE_URL } from "../../services/api";

const ProductCard = ({ product, onDelete, onToggle, onEdit }) => {
  return (
    <div className="bg-white p-5 rounded-xl flex gap-4 items-start shadow-sm">

      {/* IMAGE */}
      <img
        src={
          product.image
            ? `${BASE_URL}${product.image}`
            : "/assets/fallback.webp"
        }
        onError={(e) => {
          e.target.src = "/assets/fallback.webp";
        }}
        className="w-28 h-28 rounded-lg object-cover"
      />

      {/* INFO */}
      <div className="flex-1">

        <h3 className="font-semibold">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500">
          {product.description}
        </p>

        <p className="text-green-700 font-semibold mt-2">
          Rp {product.price.toLocaleString()}
        </p>

      </div>

      {/* RIGHT SIDE (FIX UTAMA) */}
      <div className="flex flex-col items-end justify-between h-full">

        {/* TOGGLE */}
        <input
          type="checkbox"
          checked={!!product.available}
          onChange={() => onToggle(product.id)}
          className="w-5 h-5 accent-green-700 cursor-pointer"
        />

        {product.available ? (
          <span className="text-green-600 text-xs font-medium">
            Tersedia
          </span>
        ) : (
          <span className="text-gray-400 text-xs font-medium">
            Habis
          </span>
        )}

        {/* ACTION */}
        <div className="flex gap-3 mt-6">

          <button className="text-orange-500 hover:scale-110 transition"
            onClick={() => onEdit(product)}
          >
            ✏️
          </button>

          <button
            onClick={() => onDelete(product.id)}
            className="text-gray-400 hover:text-red-500 hover:scale-110 transition"
          >
            🗑
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;