import React from 'react';
import LoadingItemPost from './LoadingItemPost';

const LoadingCard = () => {
  return (
    <div className="inline-block mx-1.5 my-1 w-full md:min-w-[400px] md:max-w-[400px] lg:max-w-[550px] xl:max-w-[400px] h-64 border p-3 rounded-md overflow-hidden bg-white shadow-lg relative dark:bg-[#070D17] dark:border-[#070D17] dark:hover:bg-black animate-pulse">
      <LoadingItemPost />
    </div>
  );
};

export default LoadingCard;
