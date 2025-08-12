'use client';

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export function CustomerNavbar() {
  const route = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status on mount and when cookies change
    const checkAuth = () => {
      const token = Cookies.get('token');
      const role = Cookies.get('role');
      setIsAuthenticated(!!token);
      setUserRole(role || null);
    };

    checkAuth();

    // Set up an interval to check for cookie changes
    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setIsAuthenticated(false);
    setUserRole(null);
    route.push('/');
  };

  return (
    <nav className='w-full border-b bg-white/70 backdrop-blur sticky top-0 z-40'>
      <div className='mx-auto max-w-7xl px-4 h-14 flex items-center gap-6 text-sm'>
        <Link href='/' className='font-semibold'>
          Rentals
        </Link>
        <Link href='/cart'>Cart</Link>
        <Link href='/myRentals'>My Rentals</Link>
        <Link href='/support'>Support</Link>
        <div className='ml-auto flex items-center gap-4'>
          {isAuthenticated && userRole === 'user' && (
            <span className='hidden sm:inline text-sm font-medium'>User</span>
          )}
          {isAuthenticated && userRole === 'user' ? (
            <Button
              onClick={handleLogout}
              variant='outline'
              size='sm'
              className='text-xs hover:bg-orange-100'
            >
              Logout
            </Button>
          ) : (
            <Link href='/customer-sign-in'>
              <Button
                variant='outline'
                size='sm'
                className='text-xs hover:bg-orange-100'
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
