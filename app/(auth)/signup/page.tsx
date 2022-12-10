'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        <label>
          First Name:{' '}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:{' '}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:{' '}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:{' '}
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
