import { useEffect, useState } from "react";
import { api } from "../../services/api";
import StatsCards from "../../components/admin/StatsCards";
import OrdersTable from "../../components/admin/OrdersTable";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    const resStats = await api.get("/dashboard");
    const resOrders = await api.get("/orders");

    setStats(resStats.data);
    const confirmed = resOrders.data.filter((o) => o.status !== "pending");
    setOrders(confirmed.slice(0, 5)); // ambil terbaru
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">
          Ringkasan Hari Ini
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Pantau performa dan kelola pesanan masuk.
        </p>
      </div>

      <StatsCards stats={stats} />

      <OrdersTable orders={orders} />
    </div>
  );
};

export default Dashboard;
