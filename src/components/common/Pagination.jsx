import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-center mt-6 gap-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded disabled:opacity-50 hover:from-pink-600 hover:to-yellow-600 transition-colors"
      >
        Anterior
      </button>
      <span className="px-4 py-2">
        Página {currentPage + 1} de {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded disabled:opacity-50 hover:from-pink-600 hover:to-yellow-600 transition-colors"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;