import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { openSidebar } = useSelector((state) => state.sidebar);
  const url = window.location.href.split('/').splice(3, 3).join('/');
  // const [activeItemSidebar, setActiveItemSidebar] = useState([url, '']);

  return (
    <div className={`fixed top-0 bottom-0 left-0 bg-white px-1 shadow-lg transition-transform duration-700 ${openSidebar ? '' : '-translate-x-24'}`}>
      <div className="px-5 pt-24 flex flex-col gap-4">
        <div>
          <NavLink to="/" className={`block p-2 rounded-md border hover:bg-blue-400 hover:text-white transition-colors ${url === '' ? 'bg-blue-500 text-white' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </NavLink>
        </div>
        <div>
          <NavLink to="/sub/add" className={`block p-2 rounded-md border hover:bg-blue-400 hover:text-white transition-colors ${url === 'sub/add' ? 'bg-blue-500 text-white' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </NavLink>
        </div>
        <div className="absolute bottom-8">
          <div className="p-2 rounded-md border hover:bg-blue-400 hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
