import './globals.css';

import Link from 'next/link';
import LoginBtn from './login-btn';
import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <Providers>
          <header className="flex">
            <h1 className="text-lg font-bold p-4">
              <Link href="/">Header</Link>
            </h1>
            <LoginBtn />
          </header>
          <div className="flex p-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
