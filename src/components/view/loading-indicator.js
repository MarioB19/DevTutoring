import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mb-4"></div>
      <div className="text-lg text-purple-600">Cargando...</div>
    </div>
  );
};

export default LoadingIndicator;
