'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import {
  registerUserSchema,
  RegisterUserValidator,
} from '@/validators/user.validator';
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
import { useRouter } from 'next/navigation';

interface UserSignUpProps {
  onSuccess?: (data: RegisterUserValidator) => void;
  redirectTo?: string;
}

export function UserSignUp({ onSuccess, redirectTo }: UserSignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const route = useRouter();

  const form = useForm<RegisterUserValidator>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: '',
      email: '',
      mobileNumber: undefined,
      password: '',
    },
  });

  const handleUserSignUp = async (data: RegisterUserValidator) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await api.auth.registerUser(data);
      setSuccess(true);
      form.reset();
      if (onSuccess) {
        onSuccess(res);
      }
      if (redirectTo) {
        setTimeout(() => {
          route.push(redirectTo);
        }, 2000);
      }
    } catch (error: any) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center'>
          Customer Sign Up
        </CardTitle>
        <CardDescription className='text-center'>
          Create your account to get started
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
            onSubmit={form.handleSubmit(handleUserSignUp)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your full name'
                      {...field}
                      disabled={isLoading || success}
                    />
                  </FormControl>
                  <FormDescription>
                    Your name should be between 3-20 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormDescription>
                    We'll use this email for your account
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='mobileNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter your mobile number'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading || success}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a valid 10-digit mobile number
                  </FormDescription>
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
                  <FormDescription>
                    Password must be 8-20 characters with uppercase, lowercase,
                    number, and special character
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full'
              disabled={isLoading || success}
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating Account...
                </>
              ) : success ? (
                <>
                  <CheckCircle className='mr-2 h-4 w-4' />
                  Account Created!
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
