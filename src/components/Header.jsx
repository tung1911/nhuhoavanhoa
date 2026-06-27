import React from 'react';
import { useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-card border-b flex justify-between items-center px-6 lg:px-8">
      <div></div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span className="font-medium text-sm text-foreground pr-2">{user?.fullName}</span>
        </div>
        
        <Button onClick={logout} variant="outline" className="h-10 text-destructive hover:bg-destructive hover:text-destructive-foreground">
          <LogOut className="w-4 h-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </header>
  );
};

export default Header;
