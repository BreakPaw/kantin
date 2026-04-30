import { useEffect, useState } from "react";
import { api } from "../../services/api";
import EditProductModal from "../../components/admin/EditProductModal";
import Sidebar from "../../components/admin/Sidebar";
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

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
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
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const handleToggle = async (id) => {
    try {
      const res = await api.patch(`/products/${id}/toggle`);

      setProducts(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, available: res.data.available }
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
    <div className="flex h-screen w-full bg-[#f4f2ed] overflow-hidden">


      {/* CONTENT */}
      <div className="flex-1 bg-[#f4f2ed] p-8 overflow-y-auto">
        <Header search={search} setSearch={setSearch} />
        <ProductGrid
          products={paginatedProducts}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />

        

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

    </div>
  );
};

export default Menu;