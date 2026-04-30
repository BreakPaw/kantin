import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
import Menu from "./pages/admin/Menu";
import Orders from "./pages/admin/Orders";
import Dashboard from "./pages/admin/Dashboard";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import History from "./pages/History";
import AdminLayout from "./layouts/AdminLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/:orderId" element={<Payment />} />
          <Route path="/success/:orderId" element={<Success />} />
          <Route path="/history" element={<History />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;