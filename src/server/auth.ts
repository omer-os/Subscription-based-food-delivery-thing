import {
  AuthOptions,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

import { env } from "~/env";
import { db } from "./firebase/firebase-admin";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: UserRole;
  }
}

export type UserRole = "admin" | "user";

export const AuthProviders: AuthOptions["providers"] = [
  DiscordProvider({
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
  }),
];

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const userRef = db.collection("users").doc(user.id);
      const doc = await userRef.get();

      if (doc.exists) {
        const role = doc.data()?.role;

        !role && (await userRef.update({ role: "user" }));
      }

      return true;
    },

    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      };
    },
  },
  providers: AuthProviders,

  adapter: FirestoreAdapter(db) as import("next-auth/adapters").Adapter,

  pages: {
    signIn: "/auth/signin",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
