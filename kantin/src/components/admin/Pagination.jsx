const Pagination = ({ page, setPage, totalPages }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center mt-6 gap-2">
      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* NUMBER */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 text-sm rounded ${
            page === i + 1 ? "bg-[#1D6E4F] text-white" : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* NEXT */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
