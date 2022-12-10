'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

type Props = {
  callbackUrl: string;
};
export default function SignUp({ callbackUrl }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const router = useRouter();

  const registerUser = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    const result = await fetch('/api/auth/register', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!result.ok) {
      try {
        const resBody = await result.json();
        setRegisterError(resBody?.error || 'unknown Error');
      } catch (err) {}
    } else {
      // Registration successful, signin!
      signIn('credentials', {
        email,
        password,
        callbackUrl,
        redirect: false,
      }).then(function (result) {
        if (result?.error !== null) {
          if (result?.status === 401) {
            setRegisterError(
              'Your username/password combination was incorrect. Please try again',
            );
          } else {
            setRegisterError(result?.error || 'unknown Error');
          }
        } else {
          router.push(result?.url || '/');
        }
      });
    }
  };

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        {registerError}
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register User</button>

        <Link href="/signin">Login instead</Link>
      </form>
    </>
  );
}
