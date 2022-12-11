import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  schema: [
    {
      [process.env.HASURA_GRAPHQL_ENDPOINT!]: {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET!,
        },
      },
    },
  ],
  documents: ['pages/**/*.tsx', 'pages/**/*.ts', 'app/**/*.tsx', 'app/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './types/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
