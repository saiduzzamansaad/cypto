import React from 'react';

const SkeletonRow = () => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 animate-pulse">
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-6"></div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
          <div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 ml-auto"></div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 ml-auto"></div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 ml-auto"></div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 ml-auto"></div>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </td>
    </tr>
  );
};

export default SkeletonRow;