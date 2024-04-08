import { initializeApp, getApps, cert } from "firebase-admin/app";
import admin, { firestore } from "firebase-admin";
import { env } from "~/env";

const firebaseAdminConfig = {
  credential: cert({
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY,
    projectId: env.FIREBASE_PROJECT_ID,
  }),
};

let app;

if (getApps().length <= 0) {
  app = initializeApp(firebaseAdminConfig);
}

export const db = firestore();

export default admin;
