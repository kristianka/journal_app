import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

let firebaseConfig;

// TODO: REMOVE HARD CODED VALUES
const firebaseConfigDev = {};

const app = initializeApp(firebaseConfigDev);

export const auth = getAuth(app);
export default app;
