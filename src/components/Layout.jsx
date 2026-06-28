import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout = () => {
  const loveStorageMenuRef = useRef(null);

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar loveStorageMenuRef={loveStorageMenuRef} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar relative">
          <div className="max-w-6xl mx-auto min-h-full pb-32 md:pb-6">
            <Outlet context={{ loveStorageMenuRef }} />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-50">
          <BottomNav loveStorageMenuRef={loveStorageMenuRef} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
