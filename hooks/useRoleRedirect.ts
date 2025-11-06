'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';

export function useRoleRedirect(requiredRole: string) {
  const router = useRouter();
  const { role, token } = useAuth();

  useEffect(() => {
    if (!token) router.replace('/login');
    else if (role !== requiredRole) router.replace('/');
  }, [token, role, router]);

  return { role, token };
}
