import { useEffect, useState } from "react";
import HeroSection from "../components/sections/HeroSection";
import ProductList from "../components/home/ProductList";
import { api } from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("ini api")
      try {
        const res = await api.get("/products");
        setProducts(res.data);
        console.log("ini hasil fetch data", res.data);
      } catch (err) {
        console.error(err);
      }
    };
    console.log("FETCH JLN")
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