import Link from 'next/link';

export function EndUserNavbar() {
  return (
    <nav className='w-full border-b bg-white/70 backdrop-blur sticky top-0 z-40'>
      <div className='mx-auto max-w-7xl px-4 h-14 flex items-center gap-6 text-sm'>
        <Link href='/admin' className='font-semibold'>
          Admin Dashboard
        </Link>
        <Link href='/admin/products'>Products</Link>
        <Link href='/admin/orders'>Orders</Link>
        <Link href='/admin/pricing'>Pricelists</Link>
        <Link href='/admin/reports'>Reports</Link>
        <div className='ml-auto flex items-center gap-4'>
          <Link
            href='/'
            className='text-muted-foreground hover:text-foreground'
          >
            View Site
          </Link>
          <button className='rounded border px-3 py-1.5 text-xs'>Logout</button>
        </div>
      </div>
    </nav>
  );
}
