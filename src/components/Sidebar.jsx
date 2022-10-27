import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetLogout } from '../redux/actions/auth';
import { AiOutlineHome, AiOutlineUserSwitch, AiOutlineLogout } from 'react-icons/ai';
import { MdEditNote } from 'react-icons/md';
import { CgNotes } from 'react-icons/cg';
import { BiUser, BiHash } from 'react-icons/bi';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, logoutResult, roles } = useSelector((state) => state.auth);
  const { openSidebar } = useSelector((state) => state.sidebar);

  // menangkap url untuk menambahkan active pada link sidebar jika sesuai
  const url = window.location.href.split('/').splice(3, 3).join('/');

  useEffect(() => {
    if (logoutResult) {
      navigate('/');
      dispatch(resetLogout());
    }
  }, [dispatch, logoutResult]);

  const handleLogout = () => {
    swal({
      title: 'LOGOUT',
      text: 'Apakah anda yakin ingin keluar?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        dispatch(logout());
      }
    });
  };

  return (
    <div className={`fixed top-0 bottom-0 left-0 bg-white px-1 shadow-lg transition-transform duration-700 ${openSidebar ? '' : '-translate-x-24'} ${username ? '' : 'hidden'} dark:bg-dark`}>
      <div className="px-5 pt-24 flex flex-col gap-4">
        <div>
          <NavLink to="/" className={`item-link-sidebar ${url === '' ? 'bg-blue-500 text-white' : ''}`}>
            <AiOutlineHome className="w-6 h-6" />
          </NavLink>
        </div>
        <div>
          <NavLink to={`/user/profile/${username}`} className={`item-link-sidebar ${url === `user/profile/${username}` ? 'bg-blue-500 text-white' : ''}`}>
            <BiUser className="w-6 h-6" />
          </NavLink>
        </div>
        <div>
          <NavLink to="/categories" className={`item-link-sidebar ${url === 'categories' ? 'bg-blue-500 text-white' : ''}`}>
            <BiHash className="w-6 h-6" />
          </NavLink>
        </div>
        <div>
          <NavLink to="/post/add" className={`item-link-sidebar ${url === 'post/add' ? 'bg-blue-500 text-white' : ''}`}>
            <MdEditNote className="w-6 h-6" />
          </NavLink>
        </div>

        <hr className="dark:bg-gray-500" />

        {roles === 'admin' && (
          <>
            <div>
              <NavLink to="/users" className={`item-link-sidebar ${url === 'users' ? 'bg-blue-500 text-white' : ''}`}>
                <AiOutlineUserSwitch className="w-6 h-6" />
              </NavLink>
            </div>
            <div>
              <NavLink to="/log" className={`item-link-sidebar ${url === 'log' ? 'bg-blue-500 text-white' : ''}`}>
                <CgNotes className="w-6 h-6" />
              </NavLink>
            </div>
            <hr />
          </>
        )}

        <div className="absolute bottom-8">
          <div className="item-link-sidebar cursor-pointer" onClick={handleLogout}>
            <AiOutlineLogout className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
