import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const fieldError = fieldErrorFactory(res);
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return fieldError('Missing parameters');
    }

    if (email.length < 3) {
      return fieldError('E-Mail too short.');
    }
    if (password.length < 6) {
      return fieldError('Password too short.');
    }

    try {
      // create user in Hasura
      return res.status(200).end();
    } catch (err: any) {
      return res.status(503).json({ err: err.toString() });
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
