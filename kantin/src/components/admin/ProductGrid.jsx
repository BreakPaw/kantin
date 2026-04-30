import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onDelete, onToggle, onEdit }) => {
  return (
    <div className="grid grid-cols-2 gap-6">

      {products.map(p => (
        <ProductCard
          key={p.id}
          product={p}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}

    </div>
  );
};

export default ProductGrid;