// This is an example of to protect an API route
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { request } from 'graphql-request';
import { graphql } from '@/gql/gql';
import { GetUserMailQuery } from '@/gql/graphql';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    const secret = process.env.NEXTAUTH_SECRET;

    const token = await getToken({
      req,
      secret,
      // Raw gives the un-decoded JWT
      raw: true,
    });

    const query = graphql(`
      query GetUserMail($id: uuid!) {
        users_by_pk(id: $id) {
          email
        }
      }
    `);

    const { users_by_pk: user }: GetUserMailQuery = await request(
      process.env.HASURA_GRAPHQL_ENDPOINT!,
      query,
      { id: session.user?.id },
      { authorization: `Bearer ${token}` },
    );
    res.send({
      content: `This is protected content. Your mail is ${user?.email}`,
    });
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
};
