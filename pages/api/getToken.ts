// This is an example of how to read a JSON Web Token from an API route
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

type Data = {};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req, raw: true });
  if (token) {
    // Signed in
    console.log('JSON Web Token', JSON.stringify(token, null, 2));
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end(token);
};
