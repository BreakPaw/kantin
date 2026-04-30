import Navbar from "../components/Navbar";
import CartSummary from "../components/sections/CartSummary";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  const hideRoutes = ["/checkout", "/payment", "/success", "/history"];

  const hideCartSummary = hideRoutes.some(route =>
    location.pathname.startsWith(route)
  );


  return (
    <div className="bg-[#f8f6f2] min-h-screen pb-24">
      <Navbar />

      <div className="px-10 pt-6">
        <Outlet />
      </div>

      {!hideCartSummary && <CartSummary />}
    </div>
  );
};

export default MainLayout;