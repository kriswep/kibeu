import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import * as jsonwebtoken from 'jsonwebtoken';
import * as argon2 from 'argon2';
import { request } from 'graphql-request';
import { graphql } from '@/gql/gql';
import { GetUserQuery } from '@/gql/graphql';

export const authOptions: NextAuthOptions = {
  // Use JWT strategy so we can forward them to Hasura
  session: {
    strategy: 'jwt',
    // maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: '/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'E-Mail', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const query = graphql(/* GraphQL */ `
          query GetUser($email: String!) {
            users(where: { email: { _eq: $email } }, limit: 1) {
              id
              password
              email
            }
          }
        `);
        try {
          const { users }: GetUserQuery = await request(
            process.env.HASURA_GRAPHQL_ENDPOINT!,
            query,
            { email: credentials.email },
            { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET! },
          );
          const user = users[0];

          if (
            user.password &&
            user.id.length > 0 &&
            user.email === credentials.email &&
            (await argon2.verify(user.password, credentials.password || ''))
          ) {
            return {
              id: user.id,
              email: user.email,
            };
          } else {
            // console.error('Invalid Password');
            return null;
          }
        } catch (error) {
          console.error(JSON.stringify(error, undefined, 2));
          return null;
        }
        return null;
        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
    // ...add more providers here
  ],
  // Encode and decode your JWT with the HS256 algorithm
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(token!, secret, {
        algorithm: 'HS256',
      });
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret, {
        algorithms: ['HS256'],
      });
      return decodedToken as JWT;
    },
  },

  callbacks: {
    // Add the required Hasura claims
    // https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#the-spec
    async jwt({ token }) {
      return {
        ...token,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user'],
          'x-hasura-default-role': 'user',
          'x-hasura-role': 'user',
          'x-hasura-user-id': token.sub,
        },
      };
    },
    // Add user ID to the session
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
