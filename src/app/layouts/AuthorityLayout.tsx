import { Outlet, useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Briefcase, Map, FileText, ScrollText, Settings, Bell, LogOut, ShieldCheck, FilePlus, BarChart3 } from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function AuthorityLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/authority' },
    { icon: Briefcase, label: 'Cases', path: '/authority/cases' },
    { icon: Map, label: 'Map', path: '/authority/map' },
    { icon: FileText, label: 'Reports', path: '/authority/reports' },
    { icon: BarChart3, label: 'Regional Reports', path: '/authority/regional-reports' },
    { icon: FilePlus, label: 'Generate Report', path: '/authority/generate-report' },
    { icon: ScrollText, label: 'Audit Logs', path: '/authority/audit' },
    { icon: Settings, label: 'Settings', path: '/authority/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/authority') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <aside className="hidden lg:flex w-64 bg-[#1a3a5c] text-white flex-col fixed left-0 top-0 bottom-0 z-50">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold" style={{ fontWeight: 600 }}>Anti-Corruption</h1>
              <p className="text-xs text-white/70">Authority Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive(item.path)
                  ? 'bg-white/20 text-white'
                  : 'hover:bg-white/10 text-white/80'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10 bg-white/10">
              <AvatarFallback className="bg-white/10 text-white">AO</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Authority Officer</p>
              <Badge variant="secondary" className="text-xs bg-[#639922] text-white border-0 mt-1">
                Anti-Corruption Officer
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 sm:px-8 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
                Investigation Dashboard
              </h2>
              <p className="text-sm text-gray-600 mt-0.5 hidden sm:block">Welcome back to the authority portal</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#E24B4A] rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}