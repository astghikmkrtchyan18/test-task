'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from 'next-themes';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(4, { message: 'Password must be at least 4 chars' }),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const [apiError, setApiError] = useState('');

  const onSubmit = async (data: LoginFormData) => {
    setApiError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setApiError(result.message || 'Login failed');
        return;
      }

      login(result.role);

      if (result.role === 'Manager') {
        router.push('/dashboard');
      } else {
        router.push('/'); 
      }
    } catch (err) {
      console.error(err);
      setApiError('Network error, try again later');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="flex flex-col justify-center items-center w-full md:flex-1 p-8 transition-colors duration-300"
        style={{
          backgroundColor: isLight ? '#f9f9f9' : '#1a1a1a',
          color: isLight ? '#171717' : '#ffffff',
        }}
      >
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <ThemeToggle />
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Sign In to Your Account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {apiError && (
              <p className="text-red-600 text-sm text-center">{apiError}</p>
            )}

            <label className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <input type="checkbox" className="mr-2" />I agree to all Terms,
              Privacy Policy and Fees
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition-colors duration-300 disabled:opacity-60"
            >
              {isSubmitting ? 'Loading...' : 'Get Started'}
            </button>
          </form>

          <div className="flex items-center my-4">
            <span className="border-t border-gray-300 dark:border-gray-600 flex-1"></span>
            <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">
              OR
            </span>
            <span className="border-t border-gray-300 dark:border-gray-600 flex-1"></span>
          </div>

          <div className="space-y-2">
            <button className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg flex justify-center items-center gap-2 transition-colors duration-300">
              Sign in with Google
            </button>
            <button className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg flex justify-center items-center gap-2 transition-colors duration-300">
              Sign in with Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Don’t have an account?{' '}
            <a href="#" className="text-blue-500 dark:text-blue-400 underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/3">
        <div
          className="h-full w-full bg-cover bg-center transition-all duration-300"
          style={{
            backgroundImage: isLight
              ? "url('/light.jpg')"
              : "url('/dark.jpg')",
          }}
        />
      </div>
    </div>
  );
}
