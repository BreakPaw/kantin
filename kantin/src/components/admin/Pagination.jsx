const Pagination = ({ page, setPage, totalPages }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 gap-2">

      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        ←
      </button>

      {/* NUMBER */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded ${
            page === i + 1
              ? "bg-green-700 text-white"
              : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* NEXT */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        →
      </button>

    </div>
  );
};

export default Pagination;