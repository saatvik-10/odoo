"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/vendor-dashboard' },
  { label: 'Rentals', href: '/vendor-rentals' },
  { label: 'Orders', href: '/vendor-orders' },
  { label: 'Products', href: '/vendor-products' },
  { label: 'Pricing', href: '/vendor-pricing' },
  { label: 'Reports', href: '/vendor-reports' },
  { label: 'Settings', href: '/vendor-settings' },
];

export function VendorNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className='w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40'>
      <div className='mx-auto max-w-7xl px-4 h-14 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4 min-w-0'>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='sm' className='lg:hidden px-2'>
                <Menu className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-80 p-6'>
              <div className='space-y-4'>
                <h2 className='text-lg font-semibold'>Navigation</h2>
                <nav className='flex flex-col space-y-1'>
                  {navItems.map(item => {
                    const active = pathname === item.href || (item.href !== '/vendor-dashboard' && pathname.startsWith(item.href));
                    return (
                      <Button
                        key={item.href}
                        asChild
                        variant={active ? 'default' : 'ghost'}
                        size='sm'
                        className={cn('justify-start', active && 'bg-gray-900 text-white hover:bg-gray-900/90')}
                        onClick={() => setOpen(false)}
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </Button>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <nav className='hidden lg:flex items-center gap-1 overflow-x-auto text-sm'>
            {navItems.map(item => {
              const active = pathname === item.href || (item.href !== '/vendor-dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-1.5 rounded-md font-medium transition-colors',
                    active ? 'bg-gray-900 text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-100'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className='flex items-center space-x-2 sm:space-x-3'>
          <Avatar className='h-8 w-8'>
            <AvatarFallback>
              <User className='h-4 w-4' />
            </AvatarFallback>
          </Avatar>
          <span className='hidden sm:inline text-sm font-medium'>Vendor</span>
          <Button variant='outline' size='sm' className='text-xs'>Logout</Button>
        </div>
      </div>
    </nav>
  );
}
