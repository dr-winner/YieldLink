"use client";

import { HttpAgent } from "@dfinity/agent";

declare global {
  interface Window {
    ic?: {
      plug?: {
        isConnected: () => Promise<boolean>;
        requestConnect: (opts?: { whitelist?: string[]; host?: string }) => Promise<void>;
        createAgent: (opts?: { whitelist?: string[]; host?: string }) => Promise<void>;
        agent?: HttpAgent;
        getPrincipal: () => Promise<{ toText: () => string }>;
      };
    };
  }
}

export interface WalletSession {
  principalText: string;
  connected: boolean;
}

export async function connectPlug(whitelist: string[], host?: string): Promise<WalletSession> {
  if (!window.ic?.plug) {
    throw new Error("Plug wallet not detected. Install Plug extension.");
  }
  const connection = await window.ic.plug.isConnected();
  if (!connection) {
    await window.ic.plug.requestConnect({ whitelist, host });
  }
  await window.ic.plug.createAgent({ whitelist, host });
  const principal = await window.ic.plug.getPrincipal();
  return { principalText: principal.toText(), connected: true };
}


