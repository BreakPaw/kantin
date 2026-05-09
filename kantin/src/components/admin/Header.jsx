const Header = ({ search, setSearch }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1D6E4F]">
          Manajemen Menu
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Kurasi hidangan terbaik
        </p>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari menu..."
        className="bg-white px-4 py-2 rounded-full w-full md:w-64"
      />
    </div>
  );
};

export default Header;
