import { useEffect, useState } from "react";
import HeroSection from "../components/sections/HeroSection";
import ProductList from "../components/home/ProductList";
import { api } from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("https://kantin-clean.vercel.app/api/products");

        console.log("RES DATA:", res.data);

        let result = [];

        if (Array.isArray(res.data)) {
          result = res.data;
        } else if (Array.isArray(res.data?.data)) {
          result = res.data.data;
        } else {
          console.error("FORMAT DATA SALAH:", res.data);
        }

        setProducts(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#f8f6f2] min-h-screen pb-24">
      <HeroSection />

      {products.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          Loading menu...
        </p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default Home;