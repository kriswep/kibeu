'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import UserInformation from './user-information';
import {
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from 'components/ui/navigation-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from 'components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';

export default function Component() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        <NavigationMenuItem>
          <HoverCard>
            <HoverCardTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent>
              <NavigationMenuItem>
                <button
                  onClick={() => signOut()}
                  className={navigationMenuTriggerStyle()}
                >
                  Sign out
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                Signed in as {session.user.email}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <UserInformation data={session.user} />
              </NavigationMenuItem>
            </HoverCardContent>
          </HoverCard>
        </NavigationMenuItem>
      </>
    );
  }
  return (
    <>
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
