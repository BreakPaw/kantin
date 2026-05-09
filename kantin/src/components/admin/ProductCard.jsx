import { api } from "../../services/api";

const ProductCard = ({ product, onDelete, onToggle, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded-2xl flex gap-4 items-start shadow-sm">
      <img
        src={product.image ? product.image : "/assets/fallback.webp"}
        onError={(e) => {
          e.target.src = "/assets/fallback.webp";
        }}
        className="w-24 h-24 rounded-xl object-cover"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm sm:text-base truncate">
            {product.name}
          </h3>
          <label className="inline-flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={!!product.available}
              onChange={() => onToggle(product.id)}
              className="w-6 h-6 accent-green-700 cursor-pointer"
            />
          </label>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-green-700 font-semibold text-sm">
            Rp {product.price.toLocaleString()}
          </p>

          <span
            className={`text-xs font-medium ${
              product.available ? "text-green-600" : "text-gray-400"
            }`}
          >
            {product.available ? "Tersedia" : "Habis"}
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            className="flex-1 text-xs sm:text-sm rounded-full bg-amber-100 text-amber-700 py-2"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 text-xs sm:text-sm rounded-full bg-red-100 text-red-600 py-2"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
