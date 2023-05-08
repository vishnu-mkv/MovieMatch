// export { default } from "next-auth/middleware";

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { User } from "./constants";

const adminOnly = [/\/genres\/\w+\/(edit|delete)/, /\/genres\/new/];

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const user: User = req.nextauth.token?.user as any;
    // console.log(req.nextauth.token);
    if (
      adminOnly.some((rx) => rx.test(req.nextUrl.pathname)) &&
      user.role !== "Admin"
    )
      return NextResponse.redirect(
        new URL("/auth/login?message=You Are Not Authorized!", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/my-movies",
    "/genres/:path*/edit",
    "/genres/:path*/id",
    "/genres/new",
    "/movies/:path*/edit",
    "/movies/new",
  ],
};
