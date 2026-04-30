const Header = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-3xl font-bold text-green-800">
          Manajemen Menu
        </h1>
        <p className="text-gray-500">
          Kurasi hidangan terbaik
        </p>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari menu..."
        className="bg-white px-4 py-2 rounded-full w-64"
      />

    </div>
  );
};

export default Header;