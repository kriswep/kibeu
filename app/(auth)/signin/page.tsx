// import { useState } from 'react';
// import { getCsrfToken } from 'next-auth/react';
// import Link from 'next/link';
import SignIn from './SignInForm';

export default async function SignInPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  //   const csrfToken = await getCsrfToken();
  const callbackUrl =
    typeof searchParams?.callbackUrl === 'string'
      ? searchParams.callbackUrl
      : '/';
  return (
    <>
      <SignIn callbackUrl={callbackUrl} />
    </>
  );
}
