import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-teal-500 h-16 w-16"></div>
    </div>
  );
};

export default LoadingIndicator;
