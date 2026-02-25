import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-center py-8">
      <p className="text-red-500 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;