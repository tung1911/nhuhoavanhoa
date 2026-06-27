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
    <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z" />
    <path d="M7 5h10" />
    <path d="M8 5 C 2 10, 3 21, 12 21 C 21 21, 22 10, 16 5" />
    <g transform="translate(7.5, 12.5) scale(0.35) rotate(-5)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ef4444" stroke="none" />
    </g>
    <g transform="translate(6, 9) scale(0.3) rotate(15)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#f43f5e" stroke="none" />
    </g>
  </svg>
);

const BottomNav = ({ loveStorageMenuRef }) => {
  const menuItems = [
    { path: '/ghi-nhan', name: 'Ghi nhận', icon: RedHeartIcon },
    { path: '/kho-yeu-thuong', name: 'Kho yêu thương', icon: HeartJarIcon, ref: loveStorageMenuRef },
  ];

  return (
    <nav className="flex justify-around items-center h-16 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] pb-safe">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          ref={item.ref}
          className={({ isActive }) => clsx(
            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
            isActive 
              ? "text-primary" 
              : "text-slate-500 hover:text-slate-900"
          )}
        >
          {({ isActive }) => (
            <>
              <div className={clsx(
                "p-1.5 rounded-full transition-colors",
                isActive ? "bg-primary/10" : "bg-transparent"
              )}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className={clsx(
                "text-[10px] font-medium",
                isActive ? "text-primary font-semibold" : ""
              )}>
                {item.name}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
