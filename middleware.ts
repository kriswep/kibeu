// export { default } from 'next-auth/middleware';

// export const config = {
//   matcher: '/does/not/work/due/to/custom/jwt/:path*',
// };

// import withAuth from 'next-auth/middleware';
// import { authOptions } from 'pages/api/auth/[...nextauth]';

// export const config = { matcher: ['/protected'] };

// export default withAuth({
//   jwt: { decode: authOptions?.jwt?.decode },
//   callbacks: {
//     authorized: ({ token }) => {
//       console.log(token);
//       return !!token;
//     },
//   },
// });
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: '/protected/:path*',
};

// use our own little auth middleware
export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;

  const token = await getToken({
    req,
    secret,
    // Raw gives the un-decoded JWT
    raw: true,
  });

  if (!token) {
    // return NextResponse.redirect(new URL('/signin', req.url)); // Problem with page not getting reloaded
    return NextResponse.redirect(new URL('/', req.url)); // we could prob also redirect to an error page
    // return new NextResponse(
    //   JSON.stringify({ success: false, message: 'authentication failed' }),
    //   { status: 401, headers: { 'content-type': 'application/json' } },
    // );
  }
}
