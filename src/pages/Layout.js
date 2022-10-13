import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="mt-[72px]">
        <div className="container mx-auto px-2 lg:px-[100px]">{children}</div>
      </main>
    </>
  );
};

export default Layout;
