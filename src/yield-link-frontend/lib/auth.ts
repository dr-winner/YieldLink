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
  const client = await AuthClient.create();
  const identityProvider =
    options?.identityProvider ?? process.env.NEXT_PUBLIC_II_PROVIDER ?? "https://identity.ic0.app";

  return new Promise<Session>((resolve, reject) => {
    client.login({
      identityProvider,
      onSuccess: async () => {
        try {
          const identity = client.getIdentity();
          const principal = identity.getPrincipal();
          const session: Session = { principalText: principal.toText(), isAuthenticated: true };
          options?.onSuccess?.(session);
          resolve(session);
        } catch (e) {
          options?.onError?.(e);
          reject(e);
        }
      },
      onError: (err) => {
        options?.onError?.(err);
        reject(err);
      },
    });
  });
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


