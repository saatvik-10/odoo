import type { ReactNode } from 'react';
import { VendorNavbar } from '@/components/navbars/VendorNavbar';
import { AuthProvider } from '@/components/context/context';

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <VendorNavbar />
      <main className='flex-1'>
        <AuthProvider>{children}</AuthProvider>
      </main>
    </div>
  );
}
