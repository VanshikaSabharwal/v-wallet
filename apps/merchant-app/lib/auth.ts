import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";
import { NextAuthOptions } from "next-auth";
import { Account, Profile, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User | null;
      account: Account | null;
      profile?: Profile;
    }) {
      console.log("hi signin");

      // Check if user and account are valid
      if (!user || !user.email || !account) {
        return false;
      }

      await db.merchant.upsert({
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name || "", // Default to empty string if name is undefined
          auth_type: account.provider === "google" ? "Google" : "Github",
        },
        update: {
          name: user.name || "", // Default to empty string if name is undefined
          auth_type: account.provider === "google" ? "Google" : "Github",
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
