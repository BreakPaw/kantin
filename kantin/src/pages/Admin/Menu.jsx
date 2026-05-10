import { useEffect, useState } from "react";
import { api } from "../../services/api";
import EditProductModal from "../../components/admin/EditProductModal";
import Header from "../../components/admin/Header";
import ProductGrid from "../../components/admin/ProductGrid";
import AddProductModal from "../../components/admin/AddProductModal";
import Pagination from "../../components/admin/Pagination";
import { useOutletContext } from "react-router";

const Menu = () => {
  const { openAdd, setOpenAdd } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const PER_PAGE = 6;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  );

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleDelete = async (id) => {
    await api.delete("/products", {
      data: { id },
    });
    fetchProducts();
  };

  const handleToggle = async (id) => {
    try {
      const product = products.find((p) => p.id === id);

      const newValue = product.available ? 0 : 1;

      await api.patch("/products", {
        id,
        available: newValue,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, available: newValue }
            : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  return (
    <div className="space-y-6">
      <Header search={search} setSearch={setSearch} />
      <ProductGrid
        products={paginatedProducts}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onEdit={handleEdit}
      />

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />

      <EditProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        product={selectedProduct}
        onUpdated={fetchProducts}
      />

      <AddProductModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreated={fetchProducts}
      />
    </div>
  );
};

export default Menu;
