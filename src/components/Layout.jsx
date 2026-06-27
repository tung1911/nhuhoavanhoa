import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const loveStorageMenuRef = useRef(null);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar loveStorageMenuRef={loveStorageMenuRef} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet context={{ loveStorageMenuRef }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
