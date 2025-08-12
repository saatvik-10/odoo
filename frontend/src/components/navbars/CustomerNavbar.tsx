import Link from 'next/link';

export function CustomerNavbar() {
  return (
    <nav className='w-full border-b bg-white/70 backdrop-blur sticky top-0 z-40'>
      <div className='mx-auto max-w-7xl px-4 h-14 flex items-center gap-6 text-sm'>
        <Link href='/' className='font-semibold'>
          Rentals
        </Link>
        <Link href='/cart'>Cart</Link>
        <Link href='/my/rentals'>My Rentals</Link>
        <Link href='/support'>Support</Link>
        <div className='ml-auto flex items-center gap-4'>
          <Link href='/login' className='text-sm'>
            Login
          </Link>
          <Link href='/signup' className='text-sm font-medium'>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}