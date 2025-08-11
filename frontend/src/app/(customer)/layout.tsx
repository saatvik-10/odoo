import type { ReactNode } from 'react';
import { CustomerNavbar } from '@/components/navbars/CustomerNavbar';

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <CustomerNavbar />
      <main className='flex-1'>{children}</main>
    </div>
  );
}