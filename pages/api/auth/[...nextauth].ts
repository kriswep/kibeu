import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { JWT } from 'next-auth/jwt';
import { HasuraAdapter } from 'next-auth-hasura-adapter';
import * as jsonwebtoken from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // // You need to provide your own logic here that takes the credentials
        // // submitted and returns either a object representing a user or value
        // // that is false/null if the credentials are invalid.
        // // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // // You can also use the `req` object to obtain additional parameters
        // // (i.e., the request IP address)
        // const res = await fetch('/your/endpoint', {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { 'Content-Type': 'application/json' },
        // });
        // const user = await res.json();

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // // Return null if user data could not be retrieved
        // return null;
        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: 'e1f457a4-f12e-46c3-9e94-ec1cd362e9dd',
          name: 'J Smith',
          email: 'jsmith@example.com',
          extra: 'info',
        };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
  // adapter: HasuraAdapter({
  //   endpoint: process.env.HASURA_GRAPHQL_ENDPOINT!,
  //   adminSecret: process.env.HASURA_ADMIN_SECRET!,
  // }),
  theme: {
    colorScheme: 'auto',
  },
  // Use JWT strategy so we can forward them to Hasura
  session: { strategy: 'jwt' },
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

  // callbacks: {
  //   jwt({ token, user }) {
  //     // update token
  //     if (user?.email) {
  //       token.new = user.email;
  //     }
  //     return token;
  //   },
  // },

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
