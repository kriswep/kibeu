'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import UserInformation from './user-information';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from 'components/ui/navigation-menu';

export default function Component() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <UserInformation data={session.user} />
        <NavigationMenuItem>
          <button
            onClick={() => signOut()}
            className={navigationMenuTriggerStyle()}
          >
            Sign out
          </button>
        </NavigationMenuItem>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <NavigationMenuItem>
        <button
          onClick={() => signIn()}
          className={navigationMenuTriggerStyle()}
        >
          Sign in
        </button>
      </NavigationMenuItem>
    </>
  );
}
