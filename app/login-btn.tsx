'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import UserInformation from './user-information';

export default function Component() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <UserInformation data={session.user} />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
