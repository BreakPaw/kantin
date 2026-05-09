import Sidebar from "../components/admin/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";

const AdminLayout = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const pageTitle = useMemo(() => {
    if (location.pathname.includes("/admin/dashboard")) return "Dashboard";
    if (location.pathname.includes("/admin/orders")) return "Pesanan";
    if (location.pathname.includes("/admin/menu")) return "Manajemen Menu";
    return "Admin";
  }, [location.pathname]);

  return (
    <div className="h-screen overflow-hidden bg-[#f4f2ed]">
      <div className="flex h-full">
        <Sidebar
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onAdd={() => setOpenAdd(true)}
        />

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="sticky top-0 z-20 border-b border-black/5 bg-[#f4f2ed]/95 backdrop-blur md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="rounded-lg bg-white px-3 py-2 text-sm text-green-800 shadow-sm"
                aria-label="Buka menu"
              >
                Menu
              </button>
              <p className="text-sm font-semibold text-green-900">
                {pageTitle}
              </p>
              <div className="w-9" />
            </div>
          </div>

          <div className="p-4 md:p-6">
            <Outlet context={{ openAdd, setOpenAdd }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
