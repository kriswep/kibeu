import './globals.css';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import * as argon2 from 'argon2';

import { ReactNode } from 'react';
import Link from 'next/link';
import LoginBtn from './login-btn';
import Providers from './providers';

type Props = { children: ReactNode; session: any };

export default async function RootLayout({ children, session }: Props) {
  // const session2 = await unstable_getServerSession(authOptions);
  // return <pre>{JSON.stringify(session, null, 2)}</pre>

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <Providers session={session}>
          <header className="flex">
            <h1 className="text-lg font-bold p-4">
              <Link href="/">Header</Link>
            </h1>
            <Link href="/protected">Protected</Link>
            <LoginBtn />
          </header>
          <div className="flex p-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
