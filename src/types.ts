/**
 * Core Types for Vortcoin Network Application
 */

export interface Block {
  height: number;
  hash: string;
  previousHash: string;
  timestamp: number;
  miner: string;
  txCount: number;
  sizeBytes: number;
  rewardVort: number;
  gasBurnedVort: number;
  nonce: number;
  difficulty: number;
}

export interface Transaction {
  hash: string;
  blockHeight: number;
  from: string;
  to: string;
  amountVort: number;
  gasFeeVort: number;
  burnedVort: number;
  timestamp: number;
  status: "confirmed" | "pending";
  type: "transfer" | "mining_reward" | "rwa_mint" | "bridge_escrow";
}

export interface MiningTelemetry {
  isRunning: boolean;
  threads: number;
  hashrate: number;
  totalHashes: number;
  sharesFound: number;
  minedVort: number;
  acceptedNonces: string[];
  minerAddress: string;
  logs: string[];
}

export type PageTab = "home" | "download" | "whitepaper" | "developer" | "explorer";
export type ActiveDomain = "vortcoin.org" | "explorer.vortcoin.org";

export interface RpcEndpointDoc {
  method: string;
  description: string;
  params: string;
  sampleResponse: Record<string, unknown>;
}
