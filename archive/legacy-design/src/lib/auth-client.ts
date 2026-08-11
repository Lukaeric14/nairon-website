import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_CONVEX_SITE_URL || "http://localhost:3001",
});

export const { signIn, signUp, signOut, useSession } = authClient;
