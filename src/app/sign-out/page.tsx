'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { signOut } from '~/actions/user';

export default function SignOut() {
  const router = useRouter();
  const [state, action] = useFormState(signOut, null)

  useEffect(() => {
    action()
    setTimeout(() => {
      router.push('/sign-in')
    }, 2000)
  })
  return <div className='flex w-full h-dvh justify-center items-center'>
    Signing out...
  </div>
}