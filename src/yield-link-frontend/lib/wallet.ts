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
    throw new Error("Plug wallet not detected. Please install the Plug extension from https://plugwallet.ooo/");
  }
  
  try {
    const connection = await window.ic.plug.isConnected();
    console.log("Plug connection status:", connection);
    
    if (!connection) {
      console.log("Requesting Plug connection with whitelist:", whitelist, "host:", host);
      await window.ic.plug.requestConnect({ whitelist, host });
    }
    
    console.log("Creating Plug agent...");
    await window.ic.plug.createAgent({ whitelist, host });
    
    console.log("Getting principal...");
    const principal = await window.ic.plug.getPrincipal();
    console.log("Principal obtained:", principal.toText());
    
    return { principalText: principal.toText(), connected: true };
  } catch (error) {
    console.error("Plug connection error:", error);
    throw new Error(`Failed to connect Plug wallet: ${error instanceof Error ? error.message : String(error)}`);
  }
}


