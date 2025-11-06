'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatsGrid from '@/components/StatsGrid';
import AddProductForm from '@/components/AddProductForm';
import { useTheme } from 'next-themes';

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const { role, token } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!token) {
      router.replace('/login');
    } else if (role !== 'Manager') {
      router.replace('/');
    }
  }, [token, role, router, isHydrated]);

  if (!isHydrated) return null;

  if (!token || role !== 'Manager') return null;

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        isLight ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100'
      }`}
    >
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} role={role} />

      <main className="flex-1 flex flex-col p-6">
        <Header />
        <StatsGrid />
        {showAddProduct && <AddProductForm onClose={() => setShowAddProduct(false)} />}
      </main>
    </div>
  );
}
