import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      login(user);
      toast({
        title: "Đăng nhập thành công",
        description: `Chào mừng ${user.fullName}`,
      });
      navigate('/ghi-nhan');
    } else {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Sai tài khoản hoặc mật khẩu",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-primary p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <HeartHandshake className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Kho yêu thương</h2>
          <p className="text-primary-100 text-sm mt-2 text-blue-100">Ghi nhận những giá trị tích cực</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ví dụ: nguyenvana"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
              />
            </div>
            
            <Button type="submit" className="w-full h-12 text-base mt-4">
              <LogIn className="w-5 h-5 mr-2" />
              Đăng nhập
            </Button>
          </div>
          
          <div className="mt-6 text-center text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="font-medium mb-1">Tài khoản mẫu:</p>
            <p>Username: <span className="text-slate-800 font-semibold">nguyenvana</span></p>
            <p>Password: <span className="text-slate-800 font-semibold">123456</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
