import { useState, useEffect, useRef } from 'react';
import { authApi } from '../lib/api';
import type { User } from '../lib/types';
import Sidebar from '../components/Sidebar';
import { Home as HomeIcon, Compass, PlaySquare, Clock, ThumbsUp, Film, Gamepad2, Newspaper, Trophy, Lightbulb, Menu, User as UserIcon, CheckCircle2, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { mockVideos, formatViews, formatUploadDate } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authApi.getUsers();
        console.log(response);
        setUser(response?.data[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSignOut = () => {
    // Clear user data
    setUser(null);
    // Remove any stored tokens or user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm h-16 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">VideoApp</h1>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 relative" ref={dropdownRef}>
            {user && (
              <>
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="font-medium">{user.username}</span>
                </div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
                    >
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 flex">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} />}
        </AnimatePresence>

        {/* Video Grid */}
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex gap-3">
                    <img 
                      src={video.channel.avatarUrl} 
                      alt={video.channel.name}
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium line-clamp-2 text-sm">{video.title}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <p className="text-sm text-gray-600">{video.channel.name}</p>
                        {video.channel.verified && (
                          <CheckCircle2 className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>{formatViews(video.views)} views</span>
                        <span>•</span>
                        <span>{formatUploadDate(video.uploadedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
