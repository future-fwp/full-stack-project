import { Home, Compass, PlaySquare, Clock, ThumbsUp, Film, Gamepad2, Newspaper, Trophy, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarItemProps {
  Icon: React.ComponentType<any>;
  text: string;
  to: string;
  isOpen: boolean;
}

interface SidebarProps {
  isOpen: boolean;
}

const SidebarItem = ({ Icon, text, to, isOpen }: SidebarItemProps) => {
  return (
    <Link 
      to={to}
      className={`flex items-center gap-4 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors ${
        !isOpen ? 'justify-center' : ''
      }`}
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
     {isOpen && <div className="py-2">
        <div className="px-3 mb-2">
          
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-semibold mb-2"
            >
              Menu
              <SidebarItem Icon={Home} text="Home" to="/" isOpen={isOpen} />
          <SidebarItem Icon={Compass} text="Explore" to="/explore" isOpen={isOpen} />
          <SidebarItem Icon={PlaySquare} text="Subscriptions" to="/subscriptions" isOpen={isOpen} />
            </motion.h2>
            
        
       
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="border-t pt-2 px-3 mb-2">
              <h2 className="text-lg font-semibold mb-2">Library</h2>
              <SidebarItem Icon={Clock} text="History" to="/history" isOpen={isOpen} />
              <SidebarItem Icon={ThumbsUp} text="Liked Videos" to="/liked" isOpen={isOpen} />
            </div>
            
            <div className="border-t pt-2 px-3">
              <h2 className="text-lg font-semibold mb-2">Explore</h2>
              <SidebarItem Icon={Film} text="Movies" to="/movies" isOpen={isOpen} />
              <SidebarItem Icon={Gamepad2} text="Gaming" to="/gaming" isOpen={isOpen} />
              <SidebarItem Icon={Newspaper} text="News" to="/news" isOpen={isOpen} />
              <SidebarItem Icon={Trophy} text="Sports" to="/sports" isOpen={isOpen} />
              <SidebarItem Icon={Lightbulb} text="Learning" to="/learning" isOpen={isOpen} />
            </div>
          </motion.div>
        
      </div>
      </div>}
    </motion.aside>
  );
}