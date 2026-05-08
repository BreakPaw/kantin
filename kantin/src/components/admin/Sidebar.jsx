import { NavLink } from "react-router-dom";

const Sidebar = ({ onAdd }) => {
  const baseClass = "block p-2 rounded";
  const activeClass = "bg-white";

  return (
    <div className="w-64
  bg-[#eae6dc]
  h-screen
  sticky
  top-0
  p-6
  flex flex-col justify-between"
    >

      <div>
        <h1 className="text-green-700 font-bold text-xl mb-10">
          KANTIN ABI
        </h1>

        <div className="flex md:flex-col gap-3 overflow-x-auto">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : ""}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : ""}`
            }
          >
            Pesanan
          </NavLink>

          <NavLink
            to="/admin/menu"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : ""}`
            }
          >
            Manajemen Menu
          </NavLink>

          <NavLink
            to="/admin/history"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : ""}`
            }
          >
            Riwayat
          </NavLink>

        </div>
      </div>

      <button
        onClick={onAdd}
        className="bg-green-700 text-white
        py-2 rounded
        w-full
        mt-6"
      >
        + Tambah Menu
      </button>

    </div>
  );
};

export default Sidebar;