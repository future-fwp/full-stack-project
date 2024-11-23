import { Link, useNavigate } from 'react-router-dom';
import { Menu, Video, Bell, User, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import { useSidebarStore } from '../store/sidebarStore';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const toggle = useSidebarStore((state) => state.toggle);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="h-16 fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggle}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-1">
            <Video className="w-8 h-8 text-red-600" />
            <span className="text-xl font-bold">YTClone</span>
          </Link>
        </div>

        <SearchBar />

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="w-8 h-8" />
                )}
                <span className="text-sm font-medium">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}