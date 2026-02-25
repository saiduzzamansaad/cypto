import React, { useContext, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';

const Pagination = () => {
  const { page, setPage, perPage, setPerPage } = useContext(CryptoContext);
  const [jumpPage, setJumpPage] = useState('');

  const perPageOptions = [10, 20, 50];

  const handleJump = () => {
    const p = parseInt(jumpPage);
    if (!isNaN(p) && p > 0) {
      setPage(p);
      setJumpPage('');
    }
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="px-2 py-1 border border-gray-300 rounded bg-white"
        >
          {perPageOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Previous
        </button>
        <span className="px-3 py-1 bg-indigo-600 text-white rounded">{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          Next
        </button>
        <div className="flex items-center space-x-1 ml-4">
          <input
            type="number"
            min="1"
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            className="w-16 px-2 py-1 border border-gray-300 rounded"
            placeholder="Page"
          />
          <button
            onClick={handleJump}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;