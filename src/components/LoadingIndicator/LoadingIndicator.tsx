import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-white">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-teal-500 h-16 w-16"></div>
    </div>
  );
};

export default LoadingIndicator;
