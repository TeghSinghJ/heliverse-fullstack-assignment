import React from 'react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="container">
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={onPrevPage}>
              Previous
            </button>
          </li>
          {[...Array(totalPages).keys()].map((page) => (
            <li key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onNextPage(page + 1)}>
                {page + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onNextPage(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
