'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from 'components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  email: z.string().min(3, {
    message: 'Email must be at least 3 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

type Props = {
  callbackUrl: string;
};
export default function SignIn({ callbackUrl }: Props) {
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn('credentials', {
      email: values.email,
      password: values.password,
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loginError}
        <Button type="submit">Sign in</Button>

        <Link href="/signup">Register instead</Link>
      </form>
    </Form>
  );
}
