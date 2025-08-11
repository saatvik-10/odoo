import { VendorSignUp } from '@/components/forms/vendorSignUp';
import React from 'react';

const VendorSignUpPage = () => {
  return (
    <div className='flex items-center justify-between h-screen'>
      <VendorSignUp redirectTo='/vendor-dashboard' />
    </div>
  );
};

export default VendorSignUpPage;
