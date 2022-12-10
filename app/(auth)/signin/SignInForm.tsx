'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  callbackUrl: string;
};
export default function SignIn({ callbackUrl }: Props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    signIn('credentials', {
      email: user,
      password,
      callbackUrl,
      redirect: false,
    }).then(function (result) {
      if (result?.error !== null) {
        if (result?.status === 401) {
          setLoginError(
            'Your username/password combination was incorrect. Please try again',
          );
        } else {
          setLoginError(result?.error || 'unknown Error');
        }
      } else {
        router.push(result?.url || '/');
      }
    });
  };

  return (
    <form onSubmit={handleLogin}>
      {loginError}
      <label>
        Email:{' '}
        <input
          type="text"
          name="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </label>
      <label>
        Password:{' '}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Sign in</button>

      <Link href="/signup">Register instead</Link>
    </form>
  );
}
