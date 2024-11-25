import { useState,} from 'react';
// import { authApi } from '../lib/api';
// import type { User } from '../lib/types';
import Sidebar from '../components/Sidebar';
import YouTubeVideo from '../components/YouTubeVideo';
import { Link } from 'react-router-dom';

import { Home as Menu } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

export default function Home() {
  // const [user, setUser] = useState<User>();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Get the current path from window.location.pathname 
  const currentPath = window.location.pathname;

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const dropdownRef = useRef<HTMLDivElement>(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setIsDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await authApi.getUsers();
  //       console.log(response);
  //       setUser(response?.data[0]);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'Failed to fetch users');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // const handleSignOut = () => {
  //   setUser(null);
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   navigate('/login');
  // };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // navigate to /explore 

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
            <Link to = '/' className="text-xl font-bold">YTClone</Link>
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
          {currentPath === '/' && <YouTubeVideo />}
          {currentPath === '/explore' && <YouTubeVideo type="explore" />}
          {currentPath === '/movie' && <YouTubeVideo type="movie" />}
          {currentPath === '/gaming' && <YouTubeVideo type="gaming" />}
          {currentPath === '/news' && <YouTubeVideo type="news" />}
          {currentPath === '/sports' && <YouTubeVideo type="sports" />}
          {currentPath === '/learning' && <YouTubeVideo type="learning" />}
        </main>
      </div>
    </div>
  );
}
