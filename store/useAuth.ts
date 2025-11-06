'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Role = 'Manager' | 'StoreKeeper' | null;

interface AuthState {
  role: Role;
  token: string | null;
  login: (role: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      token: null,

      login: (role: string) => {
        console.log('🟡 login called with:', role);

        if (role === 'Manager') {
          set({ role: 'Manager', token: 'fake-manager-token' });
        } else if (role === 'StoreKeeper') {
          set({ role: 'StoreKeeper', token: 'fake-storekeeper-token' });
        } else {
          set({ role: null, token: null });
        }
      },

      logout: () => {
        console.log('🚪 Logging out');
        set({ role: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ role: state.role, token: state.token }),
    }
  )
);
