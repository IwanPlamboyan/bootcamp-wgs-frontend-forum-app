import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const TagSidebar = () => {
  const [mainForums, setMainForums] = useState([]);
  const limit = 10;

  useEffect(() => {
    getMainForum();
  }, [limit]);

  const getMainForum = async () => {
    const response = await axios.get(`http://localhost:5000/forum/main?limit=${limit}`);
    setMainForums(response.data.result);
  };

  return (
    <div className="mx-3 md:fixed top-20 right-0 bottom-0 md:w-[280px] lg:w-[360px] md:px-5 lg:px-10 px-3 md:border-l bg-white">
      <div className="mt-24 mb-7 md:mt-14">
        <h6 className="font-medium pt-2">
          <NavLink to="/tag">Category</NavLink> Terbaru :
        </h6>
        <div className="flex flex-wrap mt-4 gap-2 pb-5">
          {mainForums.map((mainForum) => (
            <NavLink to={`/tag/${mainForum.id}`} key={mainForum.id}>
              <p className="px-3 button-category rounded-xl">#{mainForum.title}</p>
            </NavLink>
          ))}
          <NavLink to={`/tag`}>
            <p className="bg-gray-200 text-gray-600 hover:text-gray-800 px-2 py-1 text-sm inline-block rounded-full">+</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TagSidebar;
