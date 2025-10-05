import { FiSearch, FiLogOut, FiUser, FiMenu, FiHome, FiCalendar, FiUsers, FiSettings,FiEdit, FiPlusCircle } from 'react-icons/fi';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';




const NavBar=() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/loginScreen');
  };

  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/home' },
    { icon: FiCalendar, label: 'Events', path: '/events' },
    { icon: FiUsers, label: 'My Events', path: '/myevents' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
    ...(user?.role === 'admin' ? [{ icon: FiPlusCircle, label: 'Create Event', path: '/newEvent' }] : []),
    ...(user?.role === 'admin' ? [{ icon: FiEdit, label: 'Edit Event', path: '/editEvent' }] : [])
  ];

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 h-16 bg-white border-b shadow-sm z-50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left: Hamburger and Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiMenu className="w-5 h-5 text-gray-700" />
            </button>
            <img src="/fullLogo.png" alt="Logo" className="h-20 w-auto mt-2" /> {/* Increased from h-8 to h-10 */}
          </div>
          
          {/* Center: Search */}
          <div className="flex-1 max-w-2xl px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-4 pr-10 py-2"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
              <FiUser className="w-5 h-5 text-[#800000]" />
              <span className="text-sm font-medium text-gray-700">{user?.userName}</span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-[#800000] hover:bg-red-50 rounded-lg transition-colors">
              <FiLogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r shadow-sm transition-transform duration-300 transform z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;
