'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = theme === 'light';

  return (
    <button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="px-4 py-2 rounded-md border transition-colors duration-300 text-sm font-medium
                 hover:brightness-105"
      style={{
        backgroundColor: isLight ? '#f9f9f9' : '#1a1a1a',
        color: isLight ? '#171717' : '#ffffff',    
        borderColor: isLight ? '#d1d5db' : '#4b5563',
      }}
    >
      {isLight ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
    </button>
  );
}
