import { VendorSignIn } from '@/components/forms/vendorSignIn';
import React from 'react';

const VendorSignInPage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <VendorSignIn redirectTo='/vendor-dashboard' />
    </div>
  );
};

export default VendorSignInPage;
