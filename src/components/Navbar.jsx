import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetLogout, refreshToken } from '../redux/actions/auth';
import { toggleSidebar } from '../redux/actions/sidebar';
import { themeSwitch } from '../redux/actions/theme';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { BiMenu, BiUser } from 'react-icons/bi';
import { RiMoonFill } from 'react-icons/ri';
import { BsSunFill } from 'react-icons/bs';
import Avatar from './Avatar';
import swal from 'sweetalert';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  // mengambil beberapa state di store mengenai authentication
  const { username, email, image_url, logoutResult } = useSelector((state) => state.auth);
  const [openMenuProfile, setOpenMenuProfile] = useState(false); //toggle menu profile
  const [showSidebar, setShowSidebar] = useState(true); //toggle sidebar

  // fungsi untuk menutup menu profile
  const closeMenuProfile = (e) => {
    let element = e.target;
    if (!element.length) {
      setOpenMenuProfile(false);
    }
  };

  // Pada saat componentDidMount jalankan refreshToken supaya mengisi state di store apakah sudah login atau tidak
  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  useEffect(() => {
    dispatch(toggleSidebar());
  }, [dispatch, showSidebar]);

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
    <header>
      <nav className="fixed top-0 w-full py-3 px-6 shadow-lg z-40 bg-white backdrop-blur-3xl opacity-[0.92] dark:bg-[#070D17] dark:text-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            {username && <BiMenu className="w-7 h-7 cursor-pointer -translate-x-7" onClick={() => setShowSidebar(!showSidebar)} />}

            <NavLink to="/">
              <h1 className="text-lg font-extrabold">FORUM-APP</h1>
            </NavLink>
          </div>

          <div className="flex items-center gap-3 sm:gap-12">
            <button onClick={() => dispatch(themeSwitch(theme === 'dark' ? 'light' : 'dark'))}>{theme === 'light' ? <RiMoonFill size={21} /> : <BsSunFill size={21} />}</button>
            {username ? (
              <div className="flex items-center gap-3 cursor-pointer z-10" onClick={() => setOpenMenuProfile(!openMenuProfile)}>
                <div className="text-right">
                  <h4 className="translate-y-1 text-base font-semibold">{username}</h4>
                  <small className="inline-block text-gray-400 -translate-y-1">{email}</small>
                </div>
                <Avatar imageUrl={image_url} width="8" height="8" />
              </div>
            ) : (
              <NavLink to="/login" className="flex items-center gap-0.5 hover:text-gray-800 py-3 transition">
                <AiOutlineLogin className="w-5 h-5" />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      <div className={`fixed -top-3 z-50 right-0 bottom-0 left-0 ${openMenuProfile ? '' : 'hidden'}`} onClick={(e) => closeMenuProfile(e)}>
        <div className="absolute right-14 top-[73px] z-30 w-44 origin-top-right rounded-md bg-gray-100 shadow-md shadow-gray-400 border border-gray-400 dark:bg-dark">
          <NavLink to={`/user/profile/${username}`} className="flex items-center gap-1 w-full text-gray-600 hover:text-slate-900 hover:bg-gray-300 text-left px-6 py-2.5 text-sm dark:text-gray-200 dark:hover:bg-gray-700">
            <BiUser />
            Profile
          </NavLink>
          <button className="flex items-center gap-1 w-full text-gray-600 hover:text-slate-900 hover:bg-gray-300 text-left px-6 py-2.5 text-sm dark:text-gray-200 dark:hover:bg-gray-700" onClick={handleLogout}>
            <AiOutlineLogout />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
