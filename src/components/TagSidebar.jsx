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
    <div className="mt-24 mx-2 md:m-0 md:fixed md:top-24 md:right-2 lg:right-10 md:w-[310px] md:border bg-white">
      <h6 className="text-center text-lg text-gray-800 py-4 border-b border-gray-200">
        <Link to="/categories">Category</Link> Terbaru
      </h6>

      <div className="flex justify-center">
        <div className="w-full text-center text-gray-900">
          {getCategoryResult ? (
            getCategoryResult.result.map((category) => (
              <Link to={`/category/${category.id}`} className="inline-block px-6 py-2 border-b border-gray-200 w-full hover:text-blue-900 transition-colors duration-100" key={category.id}>
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
      {/* <div className="mt-24 mb-7 md:mt-14">
        <h6 className="font-medium pt-2">
          <NavLink to="/tag">Category</NavLink> Terbaru :
        </h6>
        <div className="flex flex-wrap mt-4 gap-2 pb-5">
          {getCategoryResult ? (
            getCategoryResult.result.map((category) => (
              <NavLink to={`/category/${category.id}`} key={category.id}>
                <p className="px-3 text-sm button-category rounded-xl">#{category.title}</p>
              </NavLink>
            ))
          ) : getCategoryLoading ? (
            <p>Loading...</p>
          ) : (
            <p>{getCategoryError ? getCategoryError : 'Belum ada category'}</p>
          )}
          <NavLink to={`/category`}>
            <p className="bg-gray-200 text-gray-600 hover:text-gray-800 px-2 py-1 text-sm inline-block rounded-full">+</p>
          </NavLink>
        </div>
      </div> */}
    </div>
  );
};

export default TagSidebar;
