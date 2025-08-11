import type { ReactNode } from 'react';
import { EndUserNavbar } from '@/components/navbars/EndUserNavbar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <EndUserNavbar />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
