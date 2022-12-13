import type { NextApiRequest, NextApiResponse } from 'next';
import * as argon2 from 'argon2';
import { request, gql } from 'graphql-request';
import { graphql } from '@/gql/gql';
import { RegisterUserMutation } from '@/gql/graphql';

export function validateInputs(
  fieldError: (errorText: string) => void,
  email: any,
  password: any,
) {
  if (typeof email !== 'string' || typeof password !== 'string') {
    return fieldError('Missing parameters');
  }

  if (email.length < 3) {
    return fieldError('E-Mail too short.');
  }
  if (password.length < 6) {
    return fieldError('Password too short.');
  }
  return true;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const fieldError = fieldErrorFactory(res);
    const { email, password } = req.body;

    if (!validateInputs(fieldError, email, password)) {
      return;
    }

    const hash = await argon2.hash(password);

    const registerUser = graphql(/* GraphQL */ `
      mutation registerUser($email: String!, $password: String!) {
        insert_users(objects: { email: $email, password: $password }) {
          affected_rows
          returning {
            id
            email
          }
        }
      }
    `);
    try {
      const gqlResponse: RegisterUserMutation = await request(
        process.env.HASURA_GRAPHQL_ENDPOINT!,
        registerUser,
        { email, password: hash },
        { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET! },
      );
    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2));
      return fieldError('User could not be created!');
    }

    try {
      // create user in Hasura
      return res.status(200).end();
    } catch (err: any) {
      return res.status(503).json({ err: err?.toString() });
    }
  } else {
    return res
      .status(405)
      .json({ error: 'This request only supports POST requests' });
  }
};

function fieldErrorFactory(res: NextApiResponse) {
  return (errorText: string) => res.status(400).json({ error: errorText });
}
