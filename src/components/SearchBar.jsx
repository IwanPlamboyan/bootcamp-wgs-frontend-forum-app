import React from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ query, setQuery, searchData }) => {
  return (
    <>
      <form onSubmit={searchData}>
        <label className="relative block">
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-xl py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base dark:bg-[#070D17] dark:border-borderDark dark:text-gray-100"
            placeholder="Cari..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="transition-colors absolute border inset-y-0 bg-gray-100 right-[1px] my-[1px] flex items-center px-3 cursor-pointer hover:bg-gray-200 rounded-xl dark:bg-slate-800 dark:text-white dark:border-slate-800"
          >
            <BiSearch className="w-5 h-5" />
          </button>
        </label>
      </form>
    </>
  );
};

export default SearchBar;
