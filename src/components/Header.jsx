import React from 'react';
import { useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-card border-b flex justify-between items-center px-4 md:px-6 lg:px-8 z-10 shadow-sm">
      {/* Mobile Title / Desktop Empty space */}
      <div className="md:w-auto">
        <span className="md:hidden font-bold text-lg text-[#005b9f] tracking-tight uppercase whitespace-nowrap">Như Hoa</span>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 bg-muted px-2 md:px-3 py-1.5 rounded-full max-w-[140px] md:max-w-none">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <span className="font-medium text-xs md:text-sm text-foreground pr-1 md:pr-2 truncate">{user?.fullName}</span>
        </div>
        
        <Button onClick={logout} variant="outline" size="sm" className="h-9 px-2 md:px-4 md:h-10 text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground">
          <LogOut className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Đăng xuất</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
