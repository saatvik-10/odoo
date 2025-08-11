'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
import api from '@/lib/api';
import {
  LoginVendorValidator,
  loginVendorSchema,
} from '@/validators/vendor.validator';
import { useRouter } from 'next/navigation';

interface VendorSignInProps {
  onSuccess?: (data: LoginVendorValidator) => void;
  redirectTo?: string;
}

export function VendorSignIn({ onSuccess, redirectTo }: VendorSignInProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const route = useRouter();

  const form = useForm<LoginVendorValidator>({
    resolver: zodResolver(loginVendorSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleVendorSignIn = async (data: LoginVendorValidator) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await api.auth.loginVendor(data);
      setSuccess(true);
      form.reset();
      if (onSuccess) {
        onSuccess(res);
      }
      if (redirectTo) {
        route.push('/vendor-dashboard');
      }
    } catch (error: any) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>
          Vendor Sign In
        </CardTitle>
        <CardDescription className='text-center'>
          Sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <div className='mb-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-800'>
            <CheckCircle className='h-5 w-5' />
            <span>
              Account created successfully! {redirectTo && 'Redirecting...'}
            </span>
          </div>
        )}

        {error && (
          <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-800'>
            <AlertCircle className='h-5 w-5' />
            <span>{error}</span>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleVendorSignIn)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Enter your email'
                      {...field}
                      disabled={isLoading || success}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        {...field}
                        disabled={isLoading || success}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading || success}
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sign up link */}
            <div className='text-center text-sm'>
              <span className='text-muted-foreground'>Don't have an account? </span>
              <a 
                href='/vendor-sign-up' 
                className='text-primary hover:underline font-medium'
              >
                Sign up
              </a>
            </div>

            <Button
              type='submit'
              className='w-full'
              disabled={isLoading || success}
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Loading
                </>
              ) : success ? (
                <>
                  <CheckCircle className='mr-2 h-4 w-4' />
                  Signed in successfully
                </>
              ) : (
                'Sign Up'
              )}
            </Button>

            {/* Try Again Button for Errors */}
            {error && !isLoading && (
              <Button
                type='button'
                variant='outline'
                className='w-full'
                onClick={() => {
                  setError(null);
                  setSuccess(false);
                }}
              >
                Try Again
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
