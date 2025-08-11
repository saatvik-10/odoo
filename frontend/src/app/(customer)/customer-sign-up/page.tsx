import { UserSignUp } from '@/components/forms/userSignUp';
import React from 'react';

const CustomerSignUpPage = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <UserSignUp redirectTo='/product-list' />
    </div>
  );
};

export default CustomerSignUpPage;
