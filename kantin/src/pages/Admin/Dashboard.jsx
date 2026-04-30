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
    setOrders(resOrders.data.slice(0, 5)); // ambil terbaru
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-8 space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-green-800">
          Ringkasan Hari Ini
        </h1>
        <p className="text-gray-500">
          Pantau performa dan kelola pesanan masuk.
        </p>
      </div>

      <StatsCards stats={stats} />

      <OrdersTable orders={orders} />

    </div>
  );
};

export default Dashboard;