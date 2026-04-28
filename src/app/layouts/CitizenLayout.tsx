import { Outlet, useNavigate, useLocation } from 'react-router';
import { ShieldCheck, User, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';

export function CitizenLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-[#1a3a5c] rounded-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
                  منصة الإبلاغ
                </h1>
              </div>
            </div>

            {/* Authenticated User */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#639922] rounded-full animate-pulse" />
                <span className="text-sm text-gray-600 hidden sm:inline">Authenticated</span>
              </div>
              <Avatar className="w-9 h-9 bg-[#1a3a5c]">
                <AvatarFallback className="bg-[#1a3a5c] text-white">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-600 hover:text-[#1a3a5c]"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
