'use client';
import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = { children: ReactNode; session: any };
const Providers: FC<Props> = (
  { children, session }, //   pageProps: { session, ...pageProps },
) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
  //   return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default Providers;

// import React, { FunctionComponent } from 'react';

// type CardProps = {
//   title: string,
//   paragraph: string
// }

// // we can use children even though we haven't defined them in our CardProps
// export const Card: FunctionComponent<CardProps> = ({ title, paragraph, children }) => <aside>
//   <h2>{ title }</h2>
//   <p>
//     { paragraph }
//   </p>
//   { children }
// </aside>
