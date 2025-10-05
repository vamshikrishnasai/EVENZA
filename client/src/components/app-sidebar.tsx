import { Home, Calendar, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Users, label: 'My Events', path: '/myevents' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r border-gray-200 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col h-full p-4">
        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <item.icon className="w-5 h-5" />
              {isOpen && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
