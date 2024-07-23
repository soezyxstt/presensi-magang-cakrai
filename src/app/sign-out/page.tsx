'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { signOut } from '~/actions/user';
import { TextGenerateEffect } from '~/components/aceternity/text-generate-effect';

export default function SignOut() {
  const router = useRouter();
  const [state, action] = useFormState(signOut, null)

  useEffect(() => {
    action()
    setTimeout(() => {
      router.push('/sign-in')
    }, 2000)
  })
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <TextGenerateEffect words="Signing out..." className="text-xl md:text-3xl" />
    </div>
  );
}