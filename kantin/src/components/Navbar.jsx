import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-[#f8f6f2]">
      <div className="flex items-center justify-between px-8 md:px-15 py-4">
        {/* LEFT */}
        <div>
          <p className="font-medium text-[14px] leading-5 tracking-[-0.4px] text-gray-500">
            Selamat siang,
          </p>
          <h2 className="font-jakarta font-normal italic text-[24px] leading-8 tracking-[-1.2px] align-middle text-[#1D6E4F]">
            Halo, Abi!
          </h2>
        </div>

        <div className="hidden md:flex gap-6 items-center font-medium">
          <Link
            to="/"
            className={`relative font-jakarta text-[16px]
              ${
                location.pathname === "/"
                  ? "text-[#1D6E4F]"
                  : "text-gray-600 hover:text-green-700"
              }
            `}
          >
            Menu
            {location.pathname === "/" && (
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-700"></span>
            )}
          </Link>

          <Link
            to="/history"
            className={`relative font-jakarta text-[16px]
              ${
                location.pathname === "/history"
                  ? "text-[#1D6E4F]"
                  : "text-gray-600 hover:text-green-700"
              }
            `}
          >
            Riwayat
            {location.pathname === "/history" && (
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-700"></span>
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

        <button
          type="button"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-40 bg-[#f8f6f2] border-b border-gray-200 transition-transform duration-200 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button
          type="button"
          aria-label="Tutup menu"
          className="absolute top-4 right-8 text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>
        <div className="px-8 pt-20 pb-6 flex flex-col gap-4 font-medium">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`font-jakarta text-[16px]
            ${
              location.pathname === "/"
                ? "text-[#1D6E4F]"
                : "text-gray-600 hover:text-green-700"
            }
          `}
          >
            Menu
          </Link>

          <Link
            to="/history"
            onClick={() => setIsOpen(false)}
            className={`font-jakarta text-[16px]
            ${
              location.pathname === "/history"
                ? "text-[#1D6E4F]"
                : "text-gray-600 hover:text-green-700"
            }
          `}
          >
            Riwayat
          </Link>

          <p className="text-gray-600 hover:text-green-700 cursor-pointer">
            Tentang Kami
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="relative cursor-pointer"
            >
              <ShoppingCart size={22} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </Link>

            <User size={22} className="text-green-700 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
