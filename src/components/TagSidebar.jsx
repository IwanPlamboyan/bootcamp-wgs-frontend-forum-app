import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../redux/actions/category';

const TagSidebar = () => {
  const dispatch = useDispatch();
  const { getCategoryResult, getCategoryLoading, getCategoryError } = useSelector((state) => state.category);
  const limit = 5;

  useEffect(() => {
    dispatch(getCategory(limit));
  }, [limit]);

  return (
    <div className="mt-5 mx-2 md:m-0 md:fixed md:top-24 md:right-2 lg:right-10 md:w-[250px] lg:w-[310px] md:border md:rounded-sm bg-white dark:bg-[#070D17] dark:border-borderDark">
      <h6 className="text-center text-lg text-gray-800 py-4 border-b border-gray-200 dark:text-gray-200 dark:border-borderDark">
        <Link to="/categories">5 Category</Link> Terbaru
      </h6>

      <div className="flex justify-center">
        <div className="w-full text-center text-gray-900 dark:text-gray-50">
          {getCategoryResult ? (
            getCategoryResult.result.map((category) => (
              <Link to={`/category/${category.id}`} className="inline-block px-6 py-2 border-b border-gray-200 w-full text-[15px] hover:text-blue-900 transition-colors dark:hover:text-secondary dark:border-borderDark" key={category.id}>
                {category.title}
              </Link>
            ))
          ) : getCategoryLoading ? (
            <p>Loading</p>
          ) : (
            <p>{getCategoryError ? getCategoryError : 'Belum ada category'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagSidebar;
