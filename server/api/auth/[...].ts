import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "~/server/models/user";
import bcrypt from "bcrypt";
export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  providers: [
    //@ts-expect-error
    CredentialsProvider.default({
      name: "credentials",
      credentials: {},
      async authorize(credentials: { username: String; password: String }) {
        const user = await User.findOne({
          username: credentials.username.toLowerCase(),
        });

        if (!user) {
          throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
          });
        }

        const isValid = bcrypt.compare(
          credentials.password.toString(),
          user.password
        );

        if (!isValid) {
          throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
          });
        }

        return {
          ...user.toObject(),
          password: undefined,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user,
      };
      return session;
    },
  },
});
