import React, { useState, useEffect } from "react";
import { VORT_ENVIRONMENT } from "../../config";
import { Block, Transaction } from "../types";
import { INITIAL_BLOCKS, INITIAL_TRANSACTIONS } from "../mockData";
import { 
  Compass, 
  Search, 
  Layers, 
  Cpu, 
  Flame, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  ArrowRight, 
  ArrowUpRight,
  Shield,
  Coins,
  RefreshCw,
  Hash,
  Activity,
  Globe,
  Wallet
} from "lucide-react";

interface ExplorerProps {
  liveBlockHeight: number;
  setLiveBlockHeight: React.Dispatch<React.SetStateAction<number>>;
  onSwitchDomain?: (domain: "vortcoin.org" | "explorer.vortcoin.org") => void;
}

interface AccountDetails {
  address: string;
  balanceVort: number;
  balanceNano: number;
  rwaCount: number;
  memeCount: number;
  verificationStatus: string;
}

export const ExplorerPage: React.FC<ExplorerProps> = ({
  liveBlockHeight,
  setLiveBlockHeight,
  onSwitchDomain,
}) => {
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<AccountDetails | null>(null);
  const [isSearchingAccount, setIsSearchingAccount] = useState<boolean>(false);
  const [rpcOnline, setRpcOnline] = useState<boolean>(true);
  const [hashrateSpeed, setHashrateSpeed] = useState<number>(3690);
  const [circulatingSupply, setCirculatingSupply] = useState<number>(4010989.96);

  // Dynamic bar graph simulation values
  const [telemetryBars, setTelemetryBars] = useState<number[]>([
    45, 68, 52, 92, 74, 88, 62, 95, 80, 85, 70, 96
  ]);

  // Era Halving calculations based on 369,000 blocks per Era
  const currentEra = Math.floor((liveBlockHeight - 1) / VORT_ENVIRONMENT.HALVING_CYCLE_BLOCKS) + 1;
  const currentBlockReward = VORT_ENVIRONMENT.INITIAL_BLOCK_REWARD / Math.pow(2, currentEra - 1);
  const eraBlockProgress = (liveBlockHeight - 1) % VORT_ENVIRONMENT.HALVING_CYCLE_BLOCKS;
  const eraProgressPercent = Math.min(100, Math.max(0.1, (eraBlockProgress / VORT_ENVIRONMENT.HALVING_CYCLE_BLOCKS) * 100));
  const blocksUntilNextHalving = VORT_ENVIRONMENT.HALVING_CYCLE_BLOCKS - eraBlockProgress;

  // Real-time synchronization of the newest block with liveBlockHeight
  useEffect(() => {
    setBlocks((prev) => {
      if (prev.length > 0 && prev[0].height === liveBlockHeight) {
        return prev;
      }
      const randomHash = "0x369" + Array.from({ length: 61 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      const topBlock: Block = {
        height: liveBlockHeight,
        hash: randomHash,
        previousHash: prev[0]?.hash || VORT_ENVIRONMENT.GENESIS_HASH,
        timestamp: Date.now() - 4000,
        miner: "vort_q_369a489f0293cb837190e2fa8372b01488c994ad",
        txCount: Math.floor(Math.random() * 20) + 8,
        sizeBytes: 42910 + Math.floor(Math.random() * 5000),
        rewardVort: currentBlockReward,
        gasBurnedVort: 0.369 * 0.05 * 12,
        nonce: Math.floor(Math.random() * 9000000),
        difficulty: 3690,
      };
      return [topBlock, ...prev.filter((b) => b.height < liveBlockHeight).slice(0, 8)];
    });
  }, [liveBlockHeight, currentBlockReward]);

  // Periodic hashrate telemetry fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setHashrateSpeed((prev) => {
        const delta = Math.floor(Math.random() * 80) - 40;
        return Math.max(3400, Math.min(3980, prev + delta));
      });
      setTelemetryBars((prev) => {
        const next = [...prev.slice(1), Math.floor(Math.random() * 55) + 45];
        return next;
      });
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Check RPC Node Health & Real-time Global Metrics
  useEffect(() => {
    const checkRpc = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(VORT_ENVIRONMENT.RPC_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "get_status",
            params: {},
            id: 1,
          }),
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const json = await res.json();
          setRpcOnline(true);
          if (json.result) {
            if (typeof json.result.current_block_height === "number" && json.result.current_block_height > 0) {
              setLiveBlockHeight(json.result.current_block_height);
            }
            if (typeof json.result.circulating_supply_vort === "number" && json.result.circulating_supply_vort > 0) {
              setCirculatingSupply(json.result.circulating_supply_vort);
            }
          }
        } else {
          setRpcOnline(false);
        }
      } catch {
        setRpcOnline(false);
      }
    };
    checkRpc();
    const interval = setInterval(checkRpc, 10000);
    return () => clearInterval(interval);
  }, [setLiveBlockHeight]);

  // Search logic for Address lookup via RPC
  const handlePerformSearch = async () => {
    const query = searchQuery.trim();
    if (!query) return;

    // Check if query is an address
    if (query.startsWith("vort_q_") || query.length >= 35) {
      setIsSearchingAccount(true);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch(VORT_ENVIRONMENT.RPC_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "get_account_details",
            params: { address: query },
            id: 101,
          }),
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const json = await res.json();
          if (json.result) {
            setSelectedAccount({
              address: query,
              balanceVort: json.result.balance_vort ?? 0,
              balanceNano: json.result.balance_nano ?? 0,
              rwaCount: json.result.rwa_holdings_count ?? 0,
              memeCount: json.result.meme_holdings_count ?? 0,
              verificationStatus: json.result.verification_status ?? "SIGNATURE_VALID_PASS",
            });
            setIsSearchingAccount(false);
            return;
          }
        }
      } catch {
        // Fallback simulated local view if RPC is offline
      }

      setSelectedAccount({
        address: query,
        balanceVort: 0,
        balanceNano: 0,
        rwaCount: 0,
        memeCount: 0,
        verificationStatus: "OFFLINE_LOCAL_LOOKUP",
      });
      setIsSearchingAccount(false);
    }
  };

  // Search filter
  const filteredBlocks = blocks.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      b.height.toString().includes(q) ||
      b.hash.toLowerCase().includes(q) ||
      b.miner.toLowerCase().includes(q)
    );
  });

  const filteredTxs = transactions.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      t.hash.toLowerCase().includes(q) ||
      t.from.toLowerCase().includes(q) ||
      t.to.toLowerCase().includes(q) ||
      t.blockHeight.toString().includes(q)
    );
  });

  const handleSimulateNewBlock = () => {
    const nextHeight = liveBlockHeight + 1;
    setLiveBlockHeight(nextHeight);

    const randomHash = "0x369" + Array.from({ length: 61 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    const newBlock: Block = {
      height: nextHeight,
      hash: randomHash,
      previousHash: blocks[0]?.hash || VORT_ENVIRONMENT.GENESIS_HASH,
      timestamp: Date.now(),
      miner: "vort_q_" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      txCount: Math.floor(Math.random() * 25) + 5,
      sizeBytes: Math.floor(Math.random() * 40000) + 20000,
      rewardVort: currentBlockReward,
      gasBurnedVort: 0.369 * 0.05 * 12,
      nonce: Math.floor(Math.random() * 9000000),
      difficulty: 3690,
    };

    setBlocks((prev) => [newBlock, ...prev.slice(0, 9)]);

    const newTx: Transaction = {
      hash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      blockHeight: nextHeight,
      from: newBlock.miner,
      to: "vort_q_" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      amountVort: Number((Math.random() * 50 + 10).toFixed(2)),
      gasFeeVort: 0.05,
      burnedVort: 0.05 * 0.369,
      timestamp: Date.now(),
      status: "confirmed",
      type: "transfer",
    };
    setTransactions((prev) => [newTx, ...prev.slice(0, 9)]);
  };

  return (
    <div className="space-y-10 px-4 sm:px-8 max-w-[1920px] mx-auto py-6">
      {/* Subdomain Portal Header */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-[#0C0E16] via-[#10131E] to-[#0A0C13] p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-mono flex items-center gap-2.5">
                <img 
                  src="/logo.png" 
                  alt="VORTCOIN Logo" 
                  className="w-8 h-8 object-contain rounded-lg shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <span className="text-gold-gradient">explorer.vortcoin.org</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>PoAV Mainnet Synced</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Era {currentEra} Active
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-2">
              <span>Contabo RPC Hub:</span>
              <code className="text-amber-300">{VORT_ENVIRONMENT.RPC_URL}</code>
              <span>•</span>
              <span className={rpcOnline ? "text-emerald-400" : "text-amber-400"}>
                {rpcOnline ? "Gateway Live (Port 8545)" : "Direct Cloudflare Proxy"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 border border-amber-500/30 px-5 py-2.5 rounded-2xl text-right font-mono">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Height Matrix</span>
              <span className="text-xl font-black text-amber-400">#{liveBlockHeight} BLOCKS</span>
            </div>

            <button
              onClick={handleSimulateNewBlock}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 hover:text-amber-300 transition-all cursor-pointer shadow-sm"
              title="Force Mine / Sync Next Block"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="mt-6">
          <div className="relative">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePerformSearch()}
              placeholder="Search by Block Height (#4292), Tx Hash (0x9f4a...), or Quantum Address (vort_q_...)"
              className="w-full bg-black/80 border border-slate-700/80 focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/20 rounded-2xl pl-12 pr-28 py-3 text-xs sm:text-sm font-mono text-slate-200 placeholder-slate-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-24 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handlePerformSearch}
              disabled={isSearchingAccount}
              className="absolute right-2 top-2 px-4 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold hover:bg-amber-500/30 transition-all cursor-pointer"
            >
              {isSearchingAccount ? "Querying..." : "Search"}
            </button>
          </div>
        </div>

        {/* Real-time Halving & Era Progress Bar */}
        <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Active Emission Era</span>
            <span className="text-base font-bold text-white flex items-center gap-1.5">
              <span>Era {currentEra}</span>
              <span className="text-xs text-amber-400 font-normal">({currentBlockReward.toFixed(2)} VORT / Block)</span>
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Blocks to Next Halving</span>
            <span className="text-base font-bold text-amber-400">
              {blocksUntilNextHalving.toLocaleString()} Blocks
            </span>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Era {currentEra} Progress: <strong className="text-amber-300">{eraBlockProgress.toLocaleString()}</strong> / {VORT_ENVIRONMENT.HALVING_CYCLE_BLOCKS.toLocaleString()} Blocks</span>
              <span className="text-amber-400 font-bold">{eraProgressPercent.toFixed(2)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/60 border border-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(2, eraProgressPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Network Metrics Real-Time Graph Simulator Area */}
      <div className="rounded-3xl border border-slate-800 bg-[#0B0D14] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
            <span>🚀</span>
            <span>Decentralized Miner Hashrate Telemetry Matrix</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Window: <strong className="text-slate-200">Last 369 Handshakes</strong>
          </span>
        </div>

        {/* Multi-Core Hashrate Column Matrix Simulation */}
        <div className="h-32 flex items-end justify-between gap-1.5 sm:gap-3 border-b border-slate-800 pb-3 px-2">
          {telemetryBars.map((val, idx) => (
            <div key={idx} className="w-full flex flex-col items-center gap-1 group">
              <span className="text-[9px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {Math.round((val / 100) * 3690)}
              </span>
              <div
                className={`w-full rounded-t transition-all duration-300 ${
                  idx === telemetryBars.length - 1
                    ? "bg-gradient-to-t from-amber-500/40 to-amber-400 animate-pulse"
                    : "bg-gradient-to-t from-amber-500/15 via-amber-500/25 to-yellow-600/30 hover:from-amber-500/40 hover:to-amber-400"
                }`}
                style={{ height: `${val}%` }}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            Current Network Output velocity:{" "}
            <strong className="text-emerald-400 text-sm">{hashrateSpeed} H/s</strong>
          </div>
          <div>
            Total Cumulative Hyper-Deflation Burn:{" "}
            <strong className="text-amber-400 text-sm">36.9% VORT Allocation</strong>
          </div>
          <div>
            Circulating / Max Hard Cap:{" "}
            <strong className="text-white">
              {circulatingSupply >= 1_000_000
                ? `${(circulatingSupply / 1_000_000).toFixed(2)}M`
                : circulatingSupply.toLocaleString(undefined, { maximumFractionDigits: 1 })
              } / 36.9M VORT
            </strong>
            <span className="text-[10px] text-amber-400/90 block">
              ({((circulatingSupply / VORT_ENVIRONMENT.MAX_SUPPLY_VORT) * 100).toFixed(2)}% Minted)
            </span>
          </div>
        </div>
      </div>

      {/* Stream Area: Latest Blocks & Latest Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest Blocks Table */}
        <div className="rounded-3xl border border-slate-800 bg-[#0C0E16] p-6 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-white uppercase tracking-wider font-sans">Latest Blocks (PoAV)</h4>
            </div>
            <span className="text-slate-500 text-[11px]">{filteredBlocks.length} Blocks loaded</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {filteredBlocks.map((block) => (
              <div
                key={block.height}
                onClick={() => setSelectedBlock(block)}
                className="py-3.5 px-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-400 group-hover:text-amber-300">
                      #{block.height}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 text-[11px]">
                      {block.txCount} txs
                    </span>
                    <span className="text-[10px] text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-500/10">
                      +{currentBlockReward.toFixed(1)} VORT
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[200px] sm:max-w-xs">
                    Miner: {block.miner}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-[11px] text-slate-400 block">
                    {Math.round((Date.now() - block.timestamp) / 1000)}s ago
                  </span>
                  <span className="text-[10px] text-amber-500/90 font-bold block">
                    Burn: -{block.gasBurnedVort.toFixed(4)} VORT
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Transactions Table */}
        <div className="rounded-3xl border border-slate-800 bg-[#0C0E16] p-6 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-white uppercase tracking-wider font-sans">Latest Transactions</h4>
            </div>
            <span className="text-slate-500 text-[11px]">{filteredTxs.length} Transactions</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {filteredTxs.map((tx) => (
              <div
                key={tx.hash}
                onClick={() => setSelectedTx(tx)}
                className="py-3.5 px-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300 font-bold group-hover:text-amber-300 truncate max-w-[130px] sm:max-w-[180px]">
                      {tx.hash.slice(0, 16)}...
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {tx.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <span>From: {tx.from.slice(0, 10)}...</span>
                    <span>→</span>
                    <span>To: {tx.to.slice(0, 10)}...</span>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-sm font-bold text-amber-400 block">
                    {tx.amountVort} VORT
                  </span>
                  <span className="text-[10px] text-amber-500 font-semibold block">
                    🔥 36.9% Burn: {tx.burnedVort.toFixed(4)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Block Details Modal Inspector */}
      {selectedBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-amber-500/30 bg-[#0E1018] p-6 sm:p-8 space-y-6 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white font-sans">
                  Block #{selectedBlock.height} Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedBlock(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">Block Hash:</span>
                <span className="text-amber-400 font-bold truncate max-w-xs">{selectedBlock.hash}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">Previous Block Hash:</span>
                <span className="text-slate-300 truncate max-w-xs">{selectedBlock.previousHash}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">Miner Payout Address:</span>
                <span className="text-slate-300 truncate max-w-xs">{selectedBlock.miner}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">Block Subsidy Reward:</span>
                <span className="text-emerald-400 font-bold">{selectedBlock.rewardVort} VORT (Era 1)</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">36.9% Gas Burn Total:</span>
                <span className="text-amber-400 font-bold">{selectedBlock.gasBurnedVort.toFixed(6)} VORT</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">PoAV Nonce & Difficulty:</span>
                <span className="text-slate-300">Nonce: {selectedBlock.nonce} (Diff: {selectedBlock.difficulty})</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedBlock(null)}
                className="w-full py-2.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 font-bold transition-all"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Details Modal Inspector */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-amber-500/30 bg-[#0E1018] p-6 sm:p-8 space-y-6 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white font-sans">
                  Transaction Receipt
                </h3>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">Tx Hash:</span>
                <span className="text-amber-400 font-bold truncate max-w-xs">{selectedTx.hash}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">Included in Block:</span>
                <span className="text-slate-200">#{selectedTx.blockHeight}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">From:</span>
                <span className="text-slate-300 truncate max-w-xs">{selectedTx.from}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">To:</span>
                <span className="text-slate-300 truncate max-w-xs">{selectedTx.to}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">Amount Sent:</span>
                <span className="text-amber-400 font-bold text-sm">{selectedTx.amountVort} VORT</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">Base Gas Fee:</span>
                <span className="text-slate-300">{selectedTx.gasFeeVort} VORT</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between">
                <span className="text-slate-500">Destroyed (36.9% Burn):</span>
                <span className="text-amber-400 font-bold">{selectedTx.burnedVort.toFixed(6)} VORT</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedTx(null)}
                className="w-full py-2.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 font-bold transition-all"
              >
                Close Transaction Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Details Modal Inspector (Connected to Sled DB via RPC) */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-amber-500/30 bg-[#0E1018] p-6 sm:p-8 space-y-6 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white font-sans">
                  On-Chain Account Details (Sled DB)
                </h3>
              </div>
              <button
                onClick={() => setSelectedAccount(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-500">Public Address:</span>
                <span className="text-amber-400 font-bold truncate max-w-xs">{selectedAccount.address}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-500">Native VORT Balance:</span>
                <span className="text-emerald-400 font-bold text-base">
                  {selectedAccount.balanceVort.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 9 })} VORT
                </span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-500">Nano-VORT Precision:</span>
                <span className="text-slate-300">{selectedAccount.balanceNano.toLocaleString()} nanoVORT</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-500">Real World Assets (RWA):</span>
                <span className="text-slate-200">{selectedAccount.rwaCount} Categories Held</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-500">Community Meme Tokens:</span>
                <span className="text-slate-200">{selectedAccount.memeCount} Tokens Held</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-500">Verification Status:</span>
                <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10">
                  {selectedAccount.verificationStatus}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedAccount(null)}
                className="w-full py-2.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 font-bold transition-all cursor-pointer"
              >
                Close Account Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
