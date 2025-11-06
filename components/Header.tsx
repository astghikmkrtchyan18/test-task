'use client';

import { useAuth } from '@/store/useAuth';
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';


export default function Header() {
  const { token, role, logout } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header
      className="flex items-center justify-between mb-6 p-2 rounded-md transition-colors duration-300"
      style={{
        backgroundColor: isLight ? '#ffffff' : '#1a1a1a',
        color: isLight ? '#171717' : '#ededed',
      }}
    >
      {/* Left: Search */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-72 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            style={{
              backgroundColor: isLight ? '#ffffff' : '#272727',
              borderColor: isLight ? '#d1d5db' : '#3f3f46',
              color: isLight ? '#171717' : '#ededed',
            }}
          />
          <span
            style={{ color: isLight ? '#9ca3af' : '#c4c4c4' }}
            className="absolute left-3 top-2.5"
          >
            🔍
          </span>
        </div>
        <button
          className="ml-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          style={{
            backgroundColor: isLight ? '#2563eb' : '#3b82f6',
            color: '#ffffff',
          }}
        >
          Search
        </button>
      </div>

      {/* Right: User actions */}
      <div className="flex items-center gap-4">
        {token ? (
          <>
            <span
              style={{ color: isLight ? '#4b5563' : '#d1d5db' }}
              className="text-sm"
            >
              👋 Hello, <strong>{role}</strong>
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              style={{
                backgroundColor: isLight ? '#dc2626' : '#ef4444',
                color: '#ffffff',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            style={{
              backgroundColor: isLight ? '#9333ea' : '#a855f7',
              color: '#ffffff',
            }}
          >
            Login
          </button>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}
