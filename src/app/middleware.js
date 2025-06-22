import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/hello",
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const role = req?.nextauth?.token?.user?.role;

    if (url.includes("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      async authorized({ token }) {
        if (!token) {
          return false;
        }
      },
    },
  }
);
