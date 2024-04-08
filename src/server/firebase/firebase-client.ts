import { initializeApp, getApp, getApps } from "firebase/app";
import { env } from "~/env";

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_DB_API_KEY,
  authDomain: env.NEXT_PUBLIC_DB_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_DB_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_DB_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_DB_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_DB_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export { app };
