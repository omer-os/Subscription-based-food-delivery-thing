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
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const AuthProviders: AuthOptions["providers"] = [
  DiscordProvider({
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
  }),
];

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      // console.log("user->", user);

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  providers: AuthProviders,

  adapter: FirestoreAdapter(db),

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
