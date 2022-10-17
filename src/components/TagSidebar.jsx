import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMainForum } from '../redux/actions/mainForum';

const TagSidebar = () => {
  const dispatch = useDispatch();
  const { getMainForumResult, getMainForumLoading, getMainForumError } = useSelector((state) => state.mainForum);
  const limit = 10;

  useEffect(() => {
    dispatch(getMainForum(limit));
  }, [limit]);

  return (
    <div className="mx-3 md:fixed top-20 right-0 bottom-0 md:w-[280px] lg:w-[360px] md:px-5 lg:px-10 px-3 md:border-l bg-white">
      <div className="mt-24 mb-7 md:mt-14">
        <h6 className="font-medium pt-2">
          <NavLink to="/tag">Category</NavLink> Terbaru :
        </h6>
        <div className="flex flex-wrap mt-4 gap-2 pb-5">
          {getMainForumResult ? (
            getMainForumResult.result.map((mainForum) => (
              <NavLink to={`/tag/${mainForum.id}`} key={mainForum.id}>
                <p className="px-3 button-category rounded-xl">#{mainForum.title}</p>
              </NavLink>
            ))
          ) : getMainForumLoading ? (
            <p>Loading...</p>
          ) : (
            <p>{getMainForumError ? getMainForumError : 'Belum ada category'}</p>
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
