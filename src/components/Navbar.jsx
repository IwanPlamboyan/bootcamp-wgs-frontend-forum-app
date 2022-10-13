import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../redux/actions/refreshToken';
import { logout } from '../redux/actions/auth';
import { toggleSidebar } from '../redux/actions/sidebar';

const Navbar = () => {
  const dispatch = useDispatch();
  const { username, email, image_url } = useSelector((state) => state.refreshToken);
  const { loginResult } = useSelector((state) => state.auth);
  const [isLogout, setIsLogout] = useState(false);

  const [openSetting, setOpenSetting] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const closeSetting = (e) => {
    let element = e.target;
    if (!element.length) {
      setOpenSetting(false);
    }
  };

  const Logout = async () => {
    dispatch(logout());
    setIsLogout(true);
  };

  useEffect(() => {
    dispatch(toggleSidebar());
  }, [dispatch, showSidebar]);

  useEffect(() => {
    loginResult ? setIsLogout(false) : setIsLogout(true);
  }, [loginResult]);

  useEffect(() => {
    dispatch(refreshToken());
  }, [isLogout]);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <header>
      <nav className="fixed top-0 w-full py-3 px-6 shadow-lg z-10 bg-white backdrop-blur-sm opacity-90">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 cursor-pointer -translate-x-7" onClick={() => setShowSidebar(!showSidebar)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <NavLink to="/">
              <h1 className="text-lg font-extrabold">FORUM-APP</h1>
            </NavLink>
          </div>

          {/* search bar */}
          <div></div>

          <div className={`${username === undefined || username === false ? '' : 'hidden'}`}>
            <NavLink to="/login" className="flex gap-1 items-center hover:text-gray-800 py-3 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Login
            </NavLink>
          </div>

          <div className={`flex items-center gap-3 cursor-pointer z-10 ${username ? '' : 'hidden'}`} onClick={() => setOpenSetting(!openSetting)}>
            <div className="text-right">
              <h4 className="translate-y-1">{username}</h4>
              <small className="inline-block text-gray-400 -translate-y-1">{email}</small>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={image_url} alt="Foto Profile" className="block w-full h-full" />
            </div>
          </div>
        </div>
      </nav>
      <div className={`fixed -top-3 z-20 right-0 bottom-0 left-0 ${openSetting ? '' : 'hidden'}`} onClick={(e) => closeSetting(e)}>
        <div className="absolute right-14 top-[73px] z-30 w-44 origin-top-right rounded-md bg-gray-100 shadow-md shadow-gray-400 border border-gray-400">
          <NavLink to={`/user/profile/${username}`} className="block w-full text-gray-600 hover:text-slate-900 hover:bg-gray-300 text-left px-6 py-2.5 text-sm">
            Profile
          </NavLink>
          <button className="w-full text-gray-600 hover:text-slate-900 hover:bg-gray-300 text-left px-6 py-2.5 text-sm" onClick={Logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// import React, { useState } from 'react';
// import axios from 'axios';
// import ModalNavbar from './ModalNavbar';
// import { useNavigate } from 'react-router-dom';

// const Navbar = ({ sidebarToggle, open, description }) => {
//   const navigate = useNavigate();
//   const [openSettings, setOpenSettings] = useState(false);
//   const toggleSettings = () => {
//     setOpenSettings(!openSettings);
//   };

//   const Logout = async () => {
//     try {
//       await axios.delete('http://localhost:5000/logout', { withCredentials: true });
//       navigate('/login');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const toggleModal = () => {
//     document.getElementById('modal-id').classList.toggle('hidden');
//     document.getElementById('modal-id').classList.toggle('flex');
//   };

//   return (
//     <>
//       <nav className="fixed top-0 w-full bg-gray-900">
//         <div className="p-3 text-white flex justify-between items-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="24px"
//             viewBox="0 0 24 24"
//             width="24px"
//             fill="#fff"
//             className={`flex items-center justify-center cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-700 delay-100 mr-14 ${open ? 'translate-x-64' : 'translate-x-0'}`}
//             onClick={() => sidebarToggle()}
//           >
//             <path d="M0 0h24v24H0z" fill="none" />
//             <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
//           </svg>
//           <button
//             onClick={() => toggleModal()}
//             className={`show-modal flex md:max-w-md absolute h-8 overflow-hidden text-left px-3 py-1 transition-all duration-700 delay-100 rounded-sm ${
//               open ? 'translate-x-[310px] max-w-[100px] md:max-w-sm' : 'translate-x-[50px] max-w-xs'
//             }`}
//           >
//             <p className="font-medium">{description}</p>
//           </button>
//           <div>
//             <button className="mr-1 w-8 h-8 hover:bg-gray-800 hover:text-gray-300 cursor-pointer rounded-full" onClick={() => toggleSettings()}>
//               <svg fill="none" viewBox="0 0 24 24" className="stroke-current">
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M13.1191 5.61336C13.0508 5.11856 12.6279 4.75 12.1285 4.75H11.8715C11.3721 4.75 10.9492 5.11856 10.8809 5.61336L10.7938 6.24511C10.7382 6.64815 10.4403 6.96897 10.0622 7.11922C10.006 7.14156 9.95021 7.16484 9.89497 7.18905C9.52217 7.3524 9.08438 7.3384 8.75876 7.09419L8.45119 6.86351C8.05307 6.56492 7.49597 6.60451 7.14408 6.9564L6.95641 7.14408C6.60452 7.49597 6.56492 8.05306 6.86351 8.45118L7.09419 8.75876C7.33841 9.08437 7.3524 9.52216 7.18905 9.89497C7.16484 9.95021 7.14156 10.006 7.11922 10.0622C6.96897 10.4403 6.64815 10.7382 6.24511 10.7938L5.61336 10.8809C5.11856 10.9492 4.75 11.372 4.75 11.8715V12.1285C4.75 12.6279 5.11856 13.0508 5.61336 13.1191L6.24511 13.2062C6.64815 13.2618 6.96897 13.5597 7.11922 13.9378C7.14156 13.994 7.16484 14.0498 7.18905 14.105C7.3524 14.4778 7.3384 14.9156 7.09419 15.2412L6.86351 15.5488C6.56492 15.9469 6.60451 16.504 6.9564 16.8559L7.14408 17.0436C7.49597 17.3955 8.05306 17.4351 8.45118 17.1365L8.75876 16.9058C9.08437 16.6616 9.52216 16.6476 9.89496 16.811C9.95021 16.8352 10.006 16.8584 10.0622 16.8808C10.4403 17.031 10.7382 17.3519 10.7938 17.7549L10.8809 18.3866C10.9492 18.8814 11.3721 19.25 11.8715 19.25H12.1285C12.6279 19.25 13.0508 18.8814 13.1191 18.3866L13.2062 17.7549C13.2618 17.3519 13.5597 17.031 13.9378 16.8808C13.994 16.8584 14.0498 16.8352 14.105 16.8109C14.4778 16.6476 14.9156 16.6616 15.2412 16.9058L15.5488 17.1365C15.9469 17.4351 16.504 17.3955 16.8559 17.0436L17.0436 16.8559C17.3955 16.504 17.4351 15.9469 17.1365 15.5488L16.9058 15.2412C16.6616 14.9156 16.6476 14.4778 16.811 14.105C16.8352 14.0498 16.8584 13.994 16.8808 13.9378C17.031 13.5597 17.3519 13.2618 17.7549 13.2062L18.3866 13.1191C18.8814 13.0508 19.25 12.6279 19.25 12.1285V11.8715C19.25 11.3721 18.8814 10.9492 18.3866 10.8809L17.7549 10.7938C17.3519 10.7382 17.031 10.4403 16.8808 10.0622C16.8584 10.006 16.8352 9.95021 16.8109 9.89496C16.6476 9.52216 16.6616 9.08437 16.9058 8.75875L17.1365 8.4512C17.4351 8.05308 17.3955 7.49599 17.0436 7.1441L16.8559 6.95642C16.504 6.60453 15.9469 6.56494 15.5488 6.86353L15.2412 7.09419C14.9156 7.33841 14.4778 7.3524 14.105 7.18905C14.0498 7.16484 13.994 7.14156 13.9378 7.11922C13.5597 6.96897 13.2618 6.64815 13.2062 6.24511L13.1191 5.61336Z"
//                 ></path>
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M13.25 12C13.25 12.6904 12.6904 13.25 12 13.25C11.3096 13.25 10.75 12.6904 10.75 12C10.75 11.3096 11.3096 10.75 12 10.75C12.6904 10.75 13.25 11.3096 13.25 12Z"
//                 ></path>
//               </svg>
//             </button>
//             <div className={`absolute right-2 top-12 z-10 w-44 origin-top-right rounded-md bg-gray-800 shadow-md shadow-gray-700 border border-gray-600 ${openSettings ? '' : 'hidden'}`}>
//               <button className="w-full text-gray-300 hover:text-white hover:bg-gray-700 text-left px-6 py-2.5 text-sm">Profile</button>
//               <button className="w-full text-gray-300 hover:text-white hover:bg-gray-700 text-left px-6 py-2.5 text-sm">Edit Profile</button>
//               <button className="w-full text-gray-300 hover:text-white hover:bg-gray-700 text-left px-6 py-2.5 text-sm" onClick={Logout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <ModalNavbar description={description} toggleModal={toggleModal} />
//     </>
//   );
// };

// export default Navbar;
