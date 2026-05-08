import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      <Sidebar onAdd={() => setOpenAdd(true)} />

      <div className="flex-1 bg-[#f4f2ed] p-4 md:p-6 overflow-x-hidden">
        <Outlet context={{ openAdd,setOpenAdd }} />
      </div>

    </div>
  );
};

export default AdminLayout;