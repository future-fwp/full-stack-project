import { Home, Compass, Film, Gamepad2, Newspaper, Trophy, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  Icon: React.ComponentType<any>;
  text: string;
  isOpen: boolean;
  onClick?: () => void;
  path:string; 

}

interface SidebarProps {
  isOpen: boolean;
}

const SidebarItem = ({ Icon, text, isOpen,path, onClick }: SidebarItemProps) => {
  return (
    <Link
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer ${
        !isOpen ? 'justify-center' : ''
      }`}
      to={path}
    >
      <Icon className="w-5 h-5" />
      {isOpen && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="text-sm"
          
        >
          {text}
        </motion.span>
      )}
    </Link>
  );
};

export default function Sidebar({ isOpen }: SidebarProps) {
  const sidebarVariants = {
    open: {
      x: 0,
      width: "256px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: -256,
      width: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.aside 
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="h-[calc(100vh-64px)] overflow-y-auto fixed left-0 bg-white border-r z-40"
    >
      {isOpen && (
        <div className="py-2">
          <div className="px-3 mb-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-lg font-semibold px-4 mb-2">Menu</h2>
              <SidebarItem Icon={Home} text="Home" isOpen={isOpen} path = '/'/>
              <SidebarItem Icon={Compass} text="Explore" isOpen={isOpen} path = '/explore' />
              <SidebarItem Icon={Film} text="Movies" isOpen={isOpen} path = '/movie'/>
              <SidebarItem Icon={Gamepad2} text="Gaming" isOpen={isOpen} path = '/gaming'/>
              <SidebarItem Icon={Newspaper} text="News" isOpen={isOpen} path = '/news'/>
              <SidebarItem Icon={Trophy} text="Sports" isOpen={isOpen} path = '/sports'/>
              <SidebarItem Icon={Lightbulb} text="Learning" isOpen={isOpen} path = '/learning'/>
            </motion.div>
          </div>
        </div>
      )}
    </motion.aside>
  );
}