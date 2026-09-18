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
  Hash
} from "lucide-react";

interface ExplorerProps {
  liveBlockHeight: number;
  setLiveBlockHeight: React.Dispatch<React.SetStateAction<number>>;
  onSwitchDomain?: (domain: "vortcoin.org" | "explorer.vortcoin.org") => void;
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
  const [filterType, setFilterType] = useState<"all" | "blocks" | "txs">("all");
  const [hashrateSpeed, setHashrateSpeed] = useState<number>(3690);

  // Dynamic bar graph simulation values
  const [telemetryBars, setTelemetryBars] = useState<number[]>([
    45, 68, 52, 92, 74, 88, 62, 95, 80, 85, 70, 96
  ]);

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

  // Search logic
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
      rewardVort: 10.0,
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
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                PoAV Mainnet Synced
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Unified Real-Time Ledger Verification & PoAV Handshake Gateway Network
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 border border-amber-500/30 px-5 py-2.5 rounded-2xl text-right font-mono">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Height Matrix</span>
              <span className="text-xl font-black text-amber-400">#{liveBlockHeight} BLOCKS</span>
            </div>

            <button
              onClick={handleSimulateNewBlock}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 hover:text-amber-300 transition-all cursor-pointer"
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
              placeholder="Search by Block Height (#4224), Transaction Hash (0x9f4a...), or Quantum-Safe Address (vort1369...)"
              className="w-full bg-black/80 border border-slate-700/80 focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/20 rounded-2xl pl-12 pr-4 py-3 text-xs sm:text-sm font-mono text-slate-200 placeholder-slate-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
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
            <strong className="text-white">3.69M / 36.9M VORT</strong>
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
                      +10.0 VORT
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
    </div>
  );
};
