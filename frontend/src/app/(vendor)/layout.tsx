import type { ReactNode } from 'react';
import { VendorNavbar } from '@/components/navbars/VendorNavbar';

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <VendorNavbar />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
