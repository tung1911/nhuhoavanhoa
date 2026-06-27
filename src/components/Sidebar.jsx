import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeartHandshake, Heart } from 'lucide-react';
import clsx from 'clsx';

const RedHeartIcon = ({ className }) => (
  <Heart className={clsx(className, "text-red-500 fill-red-500")} />
);

const HeartJarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Lid */}
    <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z" />
    <path d="M7 5h10" />
    
    {/* Round Jar Body */}
    <path d="M8 5 C 2 10, 3 21, 12 21 C 21 21, 22 10, 16 5" />

    {/* Big Hearts inside constrained */}
    <g transform="translate(7.5, 12.5) scale(0.35) rotate(-5)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ef4444" stroke="none" />
    </g>
    <g transform="translate(6, 9) scale(0.3) rotate(15)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#f43f5e" stroke="none" />
    </g>
    <g transform="translate(9.5, 6.5) scale(0.28) rotate(-15)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#fb7185" stroke="none" />
    </g>
    <g transform="translate(10, 11) scale(0.3) rotate(25)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#f87171" stroke="none" />
    </g>
    <g transform="translate(5, 11.5) scale(0.25) rotate(-25)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#fda4af" stroke="none" />
    </g>
  </svg>
);

const Sidebar = ({ loveStorageMenuRef }) => {
  const menuItems = [
    { path: '/ghi-nhan', name: 'Ghi nhận', icon: RedHeartIcon },
    { path: '/kho-yeu-thuong', name: 'Kho yêu thương', icon: HeartJarIcon, ref: loveStorageMenuRef },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <span className="font-bold text-lg text-[#005b9f] tracking-tight uppercase whitespace-nowrap">Thẩm mỹ Như Hoa</span>
      </div>
      
      <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            ref={item.ref}
            className={({ isActive }) => clsx(
              "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
