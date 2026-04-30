import { ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="sticky top-0 z-50 bg-[#f8f6f2] flex items-center justify-between px-10 py-4">
      
      {/* LEFT */}
      <div>
        <p className="font-medium text-[14px] leading-[20px] tracking-[-0.4px] text-gray-500">Selamat siang,</p>
        <h2 className="font-jakarta font-normal italic text-[24px] leading-[32px] tracking-[-1.2px] align-middle text-[#1D6E4F]">
          Halo, Abi!
        </h2>
      </div>

      <div className="hidden md:flex gap-6 items-center font-medium">

        <Link
          to="/"
          className={`relative font-jakarta text-[16px]
            ${location.pathname === "/" 
              ? "text-[#1D6E4F]" 
              : "text-gray-600 hover:text-green-700"}
          `}
        >
          Menu
          {location.pathname === "/" && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-700"></span>
          )}
        </Link>

        <Link
          to="/history"
          className={`relative font-jakarta text-[16px]
            ${location.pathname === "/history" 
              ? "text-[#1D6E4F]" 
              : "text-gray-600 hover:text-green-700"}
          `}
        >
          Riwayat
          {location.pathname === "/history" && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-700"></span>
          )}
        </Link>

        {/* TENTANG */}
        <p className="text-gray-600 hover:text-green-700 cursor-pointer">
          Tentang Kami
        </p>

        {/* CART */}
        <Link to="/cart" className="relative cursor-pointer">
          <ShoppingCart size={22} className="text-gray-700" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </Link>

        {/* PROFILE */}
        <User size={22} className="text-green-700 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;