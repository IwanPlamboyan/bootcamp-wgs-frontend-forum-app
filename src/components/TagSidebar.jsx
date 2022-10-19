import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../redux/actions/category';

const TagSidebar = () => {
  const dispatch = useDispatch();
  const { getCategoryResult, getCategoryLoading, getCategoryError } = useSelector((state) => state.category);
  const limit = 10;

  useEffect(() => {
    dispatch(getCategory(limit));
  }, [limit]);

  return (
    <div className="mx-3 md:fixed top-20 right-0 bottom-0 md:w-[280px] lg:w-[360px] md:px-5 lg:px-10 px-3 md:border-l bg-white">
      <div className="mt-24 mb-7 md:mt-14">
        <h6 className="font-medium pt-2">
          <NavLink to="/tag">Category</NavLink> Terbaru :
        </h6>
        <div className="flex flex-wrap mt-4 gap-2 pb-5">
          {getCategoryResult ? (
            getCategoryResult.result.map((category) => (
              <NavLink to={`/tag/${category.id}`} key={category.id}>
                <p className="px-3 text-sm button-category rounded-xl">#{category.title}</p>
              </NavLink>
            ))
          ) : getCategoryLoading ? (
            <p>Loading...</p>
          ) : (
            <p>{getCategoryError ? getCategoryError : 'Belum ada category'}</p>
          )}
          <NavLink to={`/tag`}>
            <p className="bg-gray-200 text-gray-600 hover:text-gray-800 px-2 py-1 text-sm inline-block rounded-full">+</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TagSidebar;
