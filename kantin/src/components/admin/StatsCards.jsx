const Card = ({ title, value, color }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border-l-4" style={{ borderColor: color }}>
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold mt-1">{value}</h2>
  </div>
);

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-6">

      <Card
        title="Total Pesanan"
        value={stats.totalOrders}
        color="#16a34a"
      />

      <Card
        title="Total Pendapatan"
        value={`Rp ${stats.totalRevenue.toLocaleString()}`}
        color="#ca8a04"
      />

      <Card
        title="Perlu Verifikasi"
        value={stats.pending}
        color="#dc2626"
      />

      <Card
        title="Dalam Proses"
        value={stats.processing}
        color="#059669"
      />

    </div>
  );
};

export default StatsCards;