import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <div className="flex min-h-screen">

      <Sidebar onAdd={() => setOpenAdd(true)} />

      <div className="flex-1 bg-[#f4f2ed] p-6">
        <Outlet context={{ openAdd,setOpenAdd }} />
      </div>

    </div>
  );
};

export default AdminLayout;