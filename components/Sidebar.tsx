'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  role?: string;
}

export default function Sidebar({ activeMenu, setActiveMenu, role }: SidebarProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const router = useRouter();

  const baseBtnClasses = 'block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200';
  const hoverClass = isLight ? 'hover:bg-gray-100' : 'hover:bg-zinc-700';
  const activeClass = isLight ? 'bg-gray-100 font-medium' : 'bg-zinc-800 font-medium';

  const handleNavigation = (menu: string, path: string) => {
    setActiveMenu(menu);
    router.push(path);
  };

  return (
    <aside
      className={`w-64 shadow-sm flex flex-col transition-colors duration-300 ${
        isLight ? 'bg-white text-[#010114]' : 'bg-zinc-900 text-[#ededed]'
      }`}
    >
      <div className="p-6 text-2xl font-bold">Bitstore</div>

      <nav className="flex flex-col px-4 space-y-2">
        <button
          onClick={() => handleNavigation('Home', '/')}
          className={`${baseBtnClasses} ${hoverClass} ${activeMenu === 'Home' ? activeClass : ''}`}
        >
          🏠 Home
        </button>

        {role === 'Manager' && (
          <button
            onClick={() => handleNavigation('Dashboard', '/dashboard')}
            className={`${baseBtnClasses} ${hoverClass} ${activeMenu === 'Dashboard' ? activeClass : ''}`}
          >
            📊 Dashboard
          </button>
        )}

        <div className="mt-2">
          <p className={`px-4 text-sm uppercase ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Store</p>
          <div className="pl-4 mt-1 space-y-1">
            <button
              onClick={() => handleNavigation('Products', '/products')}
              className={`${baseBtnClasses} ${hoverClass} ${activeMenu === 'Products' ? activeClass : ''}`}
            >
              🛒 Products
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
