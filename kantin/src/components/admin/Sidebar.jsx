import { NavLink, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onAdd, open = false, onClose }) => {
  const baseClass = "block py-2 px-4 rounded-lg";
  const activeClass = "bg-[#f4f2ed]";
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-[#eae6dc] p-6 shadow-lg transition-transform md:static md:translate-x-0 md:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between md:hidden">
          <h1 className="text-green-700 font-bold text-lg">KANTIN ABI</h1>
          <button
            onClick={onClose}
            className="rounded-lg bg-white px-2 py-1 text-sm"
            aria-label="Tutup menu"
          >
            Close
          </button>
        </div>

        <div>
          <h1 className="font-jakarta font-bold text-[24px] leading-12 tracking-[-1.2px] text-[#1D6E4F] mb-10 hidden md:block">
            KANTIN ABI
          </h1>

          <div className="flex flex-col gap-3 overflow-x-auto">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
              }
              onClick={onClose}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
              }
              onClick={onClose}
            >
              Pesanan
            </NavLink>

            <NavLink
              to="/admin/menu"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
              }
              onClick={onClose}
            >
              Manajemen Menu
            </NavLink>

            <NavLink
              to="/admin/history"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
              }
              onClick={onClose}
            >
              Riwayat
            </NavLink>
          </div>
        </div>

        <button
          onClick={() => {
            if (!location.pathname.includes("/admin/menu")) {
              navigate("/admin/menu");
            }
            onAdd();
            onClose?.();
          }}
          className="bg-[#1D6E4F] text-white tex py-2 rounded-lg w-full mt-6"
        >
          + Tambah Menu
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-400 text-white py-2 rounded-lg w-full mt-4"
        >
          Keluar
        </button>
      </div>
    </>
  );
};

export default Sidebar;
