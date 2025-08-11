import Link from 'next/link';

export function VendorNavbar() {
  return (
    <nav className='w-full border-b bg-white/70 backdrop-blur sticky top-0 z-40'>
      {/* Background spans full width; inner wrapper centers content */}
      <div className='mx-auto max-w-7xl px-4 h-14 flex items-center justify-between text-sm'>
        <div className='flex gap-6'>
          <Link href='/vendor' className='font-semibold'>Dashboard</Link>
          <Link href='/vendor/products'>Products</Link>
          <Link href='/vendor/orders'>Orders</Link>
          <Link href='/vendor/pricing'>Pricing</Link>
          <Link href='/vendor/reports'>Reports</Link>
          <Link href='/vendor/settings'>Settings</Link>
        </div>
        <div className='flex items-center gap-3'>
          <span className='text-xs text-muted-foreground'>vendor@example.com</span>
          <button className='rounded border px-3 py-1.5 text-xs'>Logout</button>
        </div>
      </div>
    </nav>
  );
}