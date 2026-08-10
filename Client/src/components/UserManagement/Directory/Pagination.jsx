import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUsers } from "../../../context/UsersContext";

const Pagination = () => {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
  } = useUsers();

  // Hide pagination if there is only one page
  if (totalPages <= 1) {
    return null;
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 py-6">

      <button
        onClick={previousPage}
        disabled={currentPage === 1}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
            currentPage === index + 1
              ? "bg-[#D9B233] text-black"
              : "border border-gray-300 bg-white hover:bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight size={16} />
      </button>

    </div>
  );
};

export default Pagination;