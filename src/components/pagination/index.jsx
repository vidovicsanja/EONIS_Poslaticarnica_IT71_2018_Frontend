const PaginationComponent = ({ totalPages, pagination, handlePaginate }) => {
  return (
    totalPages > 1 && (
      <div className="w-full flex justify-center my-3">
        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={pagination?.page === 1}
            onClick={() => handlePaginate(pagination?.page - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1)?.map(
            (p, idx) => (
              <button
                key={`pagination__${idx + 1}`}
                className={`join-item btn btn-sm ${
                  pagination?.page === p ? "btn-active" : ""
                }`}
                onClick={() => handlePaginate(p)}
              >
                {p}
              </button>
            )
          )}
          <button
            className="join-item btn btn-sm"
            disabled={pagination?.page === totalPages}
            onClick={() => handlePaginate(pagination?.page + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    )
  );
};

export default PaginationComponent;
