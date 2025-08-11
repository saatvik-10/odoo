import { UserSignIn } from '@/components/forms/userSignIn';
import React from 'react';

const CustomerSignUpPage = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <UserSignIn redirectTo='/product-list' />
    </div>
  );
};

export default CustomerSignUpPage;
