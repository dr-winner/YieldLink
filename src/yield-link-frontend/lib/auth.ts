"use client";

import { AuthClient } from "@dfinity/auth-client";

export interface Session {
  principalText: string;
  isAuthenticated: boolean;
}

export async function loginWithInternetIdentity(options?: {
  identityProvider?: string;
  onSuccess?: (session: Session) => void;
  onError?: (err: unknown) => void;
}): Promise<Session> {
  try {
    console.log("Creating Internet Identity client...");
    const client = await AuthClient.create();
    const identityProvider =
      options?.identityProvider ?? process.env.NEXT_PUBLIC_II_PROVIDER ?? "https://identity.ic0.app";
    
    console.log("Using identity provider:", identityProvider);

    return new Promise<Session>((resolve, reject) => {
      client.login({
        identityProvider,
        onSuccess: async () => {
          try {
            console.log("Internet Identity login successful");
            const identity = client.getIdentity();
            const principal = identity.getPrincipal();
            const session: Session = { principalText: principal.toText(), isAuthenticated: true };
            console.log("Principal obtained:", principal.toText());
            options?.onSuccess?.(session);
            resolve(session);
          } catch (e) {
            console.error("Error getting principal:", e);
            options?.onError?.(e);
            reject(e);
          }
        },
        onError: (err) => {
          console.error("Internet Identity login error:", err);
          options?.onError?.(err);
          reject(err);
        },
      });
    });
  } catch (error) {
    console.error("Failed to create Internet Identity client:", error);
    throw new Error(`Failed to initialize Internet Identity: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function logoutInternetIdentity(): Promise<void> {
  const client = await AuthClient.create();
  await client.logout();
}

export async function getCurrentSession(): Promise<Session> {
  const client = await AuthClient.create();
  const isAuthenticated = await client.isAuthenticated();
  if (!isAuthenticated) return { principalText: "", isAuthenticated: false };
  const principalText = client.getIdentity().getPrincipal().toText();
  return { principalText, isAuthenticated: true };
}


