import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Check if user is logged in
      if (!token) return false;
      
      // If they are accessing an admin route, they MUST be an ADMIN
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token.role === 'ADMIN';
      }
      
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
