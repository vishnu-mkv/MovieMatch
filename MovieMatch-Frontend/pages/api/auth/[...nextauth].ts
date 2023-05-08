import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const providers = [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: "Credentials",
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // You can also use the `req` object to obtain additional parameters
      // (i.e., the request IP address)
      const res = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const user = await res.json();

      // If no error and we have user data, return it
      if (res.ok && user) {
        return user;
      }

      if (user && !user.success) {
        throw new Error(user.message);
      }
      // Return null if user data could not be retrieved
      return null;
    },
  }),
];

export const authOptions: AuthOptions = {
  providers,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      // console.log("jwt", token, user, trigger, session);
      if (trigger === "update") {
        return session;
      }

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // console.log("Session", session, token, user);
      session.token = token.token as any;
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
export default NextAuth(authOptions);
