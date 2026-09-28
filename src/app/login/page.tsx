'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, LoginFormValues } from '@/lib/validations';

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  async function onSubmit(values: LoginFormValues) {
    // No backend yet — simulate a login request
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('Logging in with:', values);
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/dashboard');
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — form */}
      <div className="flex w-full flex-col justify-center px-10 sm:px-20 md:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-slate-900">WorkFlowHub</span>
          </div>

          <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
          <p className="mb-6 text-sm text-slate-500">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
              {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" placeholder="Enter your password" {...register('password')} />
              {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-blue-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right — illustration panel */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-blue-600 text-white md:flex">
        <div className="max-w-sm px-10 text-center">
          <h2 className="text-2xl font-semibold">Better workflow.</h2>
          <h2 className="text-2xl font-semibold">Higher productivity.</h2>
          <p className="mt-4 text-blue-100">
            Manage your projects, tasks and team — all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}