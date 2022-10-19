import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHome } from 'react-icons/ai';
import { MdEditNote } from 'react-icons/md';
import { HiLogout } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import { logout } from '../redux/actions/auth';
// import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  const { openSidebar } = useSelector((state) => state.sidebar);

  // menangkap url untuk menambahkan active pada link sidebar jika sesuai
  const url = window.location.href.split('/').splice(3, 3).join('/');
  let splitUsername = '';
  if (username) {
    splitUsername = username.split(' ').join('%20');
  }
  return (
    <div className={`fixed top-0 bottom-0 left-0 bg-white px-1 shadow-lg transition-transform duration-700 ${openSidebar ? '' : '-translate-x-24'} ${username ? '' : 'hidden'}`}>
      <div className="px-5 pt-24 flex flex-col gap-4">
        <div>
          <NavLink to="/" className={`item-link-sidebar ${url === '' ? 'bg-blue-500 text-white' : ''}`}>
            <AiOutlineHome className="w-6 h-6" />
          </NavLink>
        </div>
        <div>
          <NavLink to={`/user/profile/${username}`} className={`item-link-sidebar ${url === `user/profile/${splitUsername}` ? 'bg-blue-500 text-white' : ''}`}>
            <BiUser className="w-6 h-6" />
          </NavLink>
        </div>
        <div>
          <NavLink to="/post/add" className={`item-link-sidebar ${url === 'post/add' ? 'bg-blue-500 text-white' : ''}`}>
            <MdEditNote className="w-6 h-6" />
          </NavLink>
        </div>
        <div className="absolute bottom-8">
          <div className="item-link-sidebar cursor-pointer" onClick={() => dispatch(logout())}>
            <HiLogout className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
