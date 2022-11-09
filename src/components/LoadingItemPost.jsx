import React from 'react';

const LoadingItemPost = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-slate-200 h-12 w-12 dark:bg-slate-700"></div>
        <div className="flex flex-col gap-2">
          <div className="w-24 h-4 bg-slate-200 rounded dark:bg-slate-700"></div>
          <div className="w-28 h-3 bg-slate-200 rounded dark:bg-slate-700"></div>
        </div>
      </div>
      <div className="mt-6">
        <div className="w-full h-6 bg-slate-200 rounded mb-1 dark:bg-slate-700"></div>
        <div className="w-[90%] h-6 bg-slate-200 rounded mb-4 dark:bg-slate-700"></div>
        <div className="w-full h-4 bg-slate-200 rounded mb-1 dark:bg-slate-700"></div>
        <div className="w-full h-4 bg-slate-200 rounded mb-1 dark:bg-slate-700"></div>
        <div className="w-full h-4 bg-slate-200 rounded mb-1 dark:bg-slate-700"></div>
        <div className="mt-4 w-1/4 h-4 bg-slate-200 rounded mb-1 dark:bg-slate-700"></div>
      </div>
    </>
  );
};

export default LoadingItemPost;
