import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const { username } = useSelector((state) => state.auth);
  const { openSidebar } = useSelector((state) => state.sidebar);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-body pt-[73px] dark:bg-dark min-h-screen">
        <div className={`container mx-auto pr-2 lg:px-[100px] transition-all duration-700 ${openSidebar && username ? 'pl-[95px]' : 'pl-2'}`}>{children}</div>
      </main>
    </>
  );
};

export default Layout;
