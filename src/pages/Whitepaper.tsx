import React, { useState } from "react";
import { VORT_ENVIRONMENT } from "../../config";
import { 
  BookOpen, 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  Check, 
  Copy, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Lock, 
  Coins, 
  Search,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export const WhitepaperPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("executive-summary");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedFormula(id);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: "executive-summary", title: "1. Executive Summary & Vision" },
    { id: "tesla-matrix", title: "2. Cosmic Mathematical Parameters (3-6-9)" },
    { id: "multi-token-rwa", title: "3. Multi-Token System & RWA Preservation" },
    { id: "poav-consensus", title: "4. Proof of Adaptive Velocity (PoAV)" },
    { id: "quantum-crypto", title: "5. Quantum-Safe Cryptography (3,690 Iterations)" },
    { id: "vesting-bridge", title: "6. Fair Launch & Swadaya Bridge Infrastructure" },
    { id: "network-ports", title: "7. Network Topology & Port Specifications" },
  ];

  return (
    <div className="space-y-12 px-4 sm:px-8 max-w-[1920px] mx-auto py-8">
      {/* Top Whitepaper Banner */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-[#10131C] via-[#0D0F17] to-[#0A0C13] p-8 sm:p-12 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL TECHNICAL SPECIFICATION • ARCHITECTURE V1.3.69</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              VORTCOIN Network (VORT) Whitepaper
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-sans max-w-3xl">
              Tri-Core Layer-1 Blockchain Architecture: Proof of Adaptive Velocity (PoAV), Tesla 3-6-9 Cosmic Scarcity, and Post-Quantum Ledger Physics.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                const blob = new Blob([document.getElementById("whitepaper-full-text")?.innerText || ""], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "VORTCOIN-Tri-Core-L1-Whitepaper.md";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 font-extrabold uppercase tracking-wider hover:from-amber-300 hover:to-amber-500 flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Export Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar Table of Contents + Document Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Table of Contents */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-28 rounded-2xl border border-slate-800 bg-[#0B0D14] p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 font-mono text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider">Table of Contents</span>
              <span className="text-slate-500">7 Sections</span>
            </div>

            {/* Quick Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search whitepaper..."
                className="w-full bg-black/60 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-slate-300 placeholder-slate-600 focus:border-amber-500/50 outline-none"
              />
            </div>

            {/* Links */}
            <nav className="space-y-1 font-sans text-xs">
              {sections
                .filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`block px-3 py-2.5 rounded-lg transition-all ${
                      activeSection === sec.id
                        ? "bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}
            </nav>

            <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/20 font-mono text-[11px] space-y-1.5">
              <span className="text-amber-400 font-bold block">Consensus Standard:</span>
              <span className="text-slate-400 block">PoAV Handshake Matrix</span>
              <span className="text-slate-500 text-[10px] block">Capped at 36,900,000 VORT</span>
            </div>
          </div>
        </div>

        {/* Reader Document Pane */}
        <div id="whitepaper-full-text" className="lg:col-span-3 space-y-16 text-slate-300 font-sans leading-relaxed">
          {/* Section 1 */}
          <section id="executive-summary" className="scroll-mt-32 space-y-4 p-8 rounded-3xl bg-[#0C0E16] border border-slate-800/90">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <span>Section 01</span>
              <span>•</span>
              <span>Vision & Motivation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              1. Executive Summary & Core Philosophy
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              VORTCOIN (VORT) is a long-term adaptive Layer-1 blockchain engineered to fuse the immutable scarcity physics of hard-sound money with the ultra-high throughput efficiency of parallelized monolithic architectures.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Designed to seamlessly bridge the concrete stability of Real World Assets (RWA) and the fluid velocity of community-driven tokens, VORTCOIN integrates specialized post-quantum cryptographic primitives to secure a resilient, future-proof global financial infrastructure.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-black/50 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase block">Scarcity Engine</span>
                <span className="text-amber-400 font-bold text-base mt-1 block">Hard Sound Money</span>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase block">Throughput</span>
                <span className="text-emerald-400 font-bold text-base mt-1 block">Parallelized L1</span>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase block">Asset Class</span>
                <span className="text-white font-bold text-base mt-1 block">RWA + Sub-Tokens</span>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="tesla-matrix" className="scroll-mt-32 space-y-6 p-8 rounded-3xl bg-[#0C0E16] border border-amber-500/20">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <span>Section 02</span>
              <span>•</span>
              <span>Emission & Halving</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              2. Cosmic Mathematical Parameters & Halving (Tesla Alignment 3-6-9)
            </h2>
            <p className="text-sm text-slate-300">
              Adopting Nikola Tesla's 3-6-9 matrix harmonic theory, VORTCOIN's emission parameters are hard-coded into the core Rust ledger daemon as follows:
            </p>

            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              <li><strong>Max Supply:</strong> Permanently capped at exactly <strong>36,900,000 VORT</strong> (with 9-decimal precision / Nano-Vort).</li>
              <li><strong>Halving Cycle (Era):</strong> Triggers automatically every <strong>3,690,000 blocks</strong>.</li>
              <li><strong>Target Block Time:</strong> Averaging 30 seconds per block.</li>
              <li><strong>Duration per Era:</strong> 3,690,000 blocks × 30 seconds = 110,700,000 seconds (~3.508 Years).</li>
              <li><strong>Initial Block Reward:</strong> 10.0 VORT per block (Era 1), decaying by 50% every subsequent era using a localized right bit-shift algorithm executed directly on Rust memory allocations.</li>
            </ul>

            {/* Formula Block */}
            <div className="p-4 rounded-xl bg-black/80 border border-amber-500/30 flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Reward Decay Bit-Shift Formula:</span>
                <code className="text-amber-300 font-bold text-sm">Reward(Era) = INITIAL_REWARD &gt;&gt; (Era - 1)</code>
              </div>
              <button
                onClick={() => copyToClipboard("Reward(Era) = 10.0 / (2^(Era-1))", "f1")}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                {copiedFormula === "f1" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedFormula === "f1" ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Halving Era Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-left">
                    <th className="py-2.5 px-3">Era</th>
                    <th className="py-2.5 px-3">Block Height Range</th>
                    <th className="py-2.5 px-3">Block Reward</th>
                    <th className="py-2.5 px-3">Era Supply Mined</th>
                    <th className="py-2.5 px-3">Cumulative Cap %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  <tr className="bg-amber-500/5 text-amber-300">
                    <td className="py-2.5 px-3 font-bold">Era 1 (Current)</td>
                    <td className="py-2.5 px-3">0 – 3,690,000</td>
                    <td className="py-2.5 px-3 font-bold">10.00 VORT</td>
                    <td className="py-2.5 px-3">18,450,000 VORT</td>
                    <td className="py-2.5 px-3 font-bold">50.0%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">Era 2</td>
                    <td className="py-2.5 px-3">3,690,001 – 7,380,000</td>
                    <td className="py-2.5 px-3">5.00 VORT</td>
                    <td className="py-2.5 px-3">9,225,000 VORT</td>
                    <td className="py-2.5 px-3">75.0%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">Era 3</td>
                    <td className="py-2.5 px-3">7,380,001 – 11,070,000</td>
                    <td className="py-2.5 px-3">2.50 VORT</td>
                    <td className="py-2.5 px-3">4,612,500 VORT</td>
                    <td className="py-2.5 px-3">87.5%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">Era 4</td>
                    <td className="py-2.5 px-3">11,070,001 – 14,760,000</td>
                    <td className="py-2.5 px-3">1.25 VORT</td>
                    <td className="py-2.5 px-3">2,306,250 VORT</td>
                    <td className="py-2.5 px-3">93.75%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}
          <section id="multi-token-rwa" className="scroll-mt-32 space-y-6 p-8 rounded-3xl bg-[#0C0E16] border border-slate-800/90">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <span>Section 03</span>
              <span>•</span>
              <span>Asset Scarcity Preservation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              3. Multi-Token System & VORT Value Preservation Mechanism
            </h2>
            <p className="text-sm text-slate-300">
              To prevent dilution of the primary supply of 36.9M VORT, Real World Assets (RWA) and community-driven utility assets are issued as distinct Sub-Token Classes riding on top of the exact same ledger state.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-black/40 border border-amber-500/30 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">1. Creation Burn Tax</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every minting initialization of a new community token or RWA sub-token requires a mandatory initiation fee of <strong>36.9 VORT</strong>, which is automatically burned and removed from the global circulating supply.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-amber-500/30 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">2. Dynamic Hyper-Deflation (36.9% Gas Burn)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  For every native coin, RWA, or token transaction processed on-chain, the network automatically deducts a base gas fee, where <strong>exactly 36.9% of the total gas fee is immediately destroyed forever</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="poav-consensus" className="scroll-mt-32 space-y-4 p-8 rounded-3xl bg-[#0C0E16] border border-slate-800/90">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <span>Section 04</span>
              <span>•</span>
              <span>Consensus Mechanism</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              4. Proof of Adaptive Velocity (PoAV) Consensus
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Proof of Adaptive Velocity (PoAV) is an advanced cryptographic consensus model designed to maintain deterministic block generation times while dynamically adjusting handshake difficulty in real-time according to immediate network transactions per second (TPS).
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Rather than relying solely on arbitrary compute consumption, PoAV adjusts difficulty parameters every 369 blocks, optimizing memory bandwidth and hashing throughput across diverse hardware topologies—from lightweight Android client devices to high-core bare-metal servers.
            </p>
          </section>

          {/* Section 5 */}
          <section id="quantum-crypto" className="scroll-mt-32 space-y-4 p-8 rounded-3xl bg-[#0C0E16] border border-slate-800/90">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <span>Section 05</span>
              <span>•</span>
              <span>Post-Quantum Security</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              5. Quantum-Safe Cryptography (3,690 Tesla PBKDF2)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standard seed phrase generation in traditional blockchains frequently suffers from insufficient key stretching against quantum algorithmic acceleration.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              VORTCOIN employs heavy-duty key stretching utilizing an enhanced <code>pbkdf2-hmac-sha512</code> key-derivation pipeline calibrated with <strong>3,690 Tesla matrix iterations</strong>. This renders brute-force precomputation and Shor/Grover quantum search vectors computationally intractable.
            </p>
          </section>

          {/* Section 6 */}
          <section id="vesting-bridge" className="scroll-mt-32 space-y-4 p-8 rounded-3xl bg-[#0C0E16] border border-slate-800/90">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <span>Section 06</span>
              <span>•</span>
              <span>Fair Launch & Cross-Chain Bridges</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              6. 100% Fair Launch & Swadaya Bridge Infrastructure
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              VORTCOIN is built upon uncompromising Fair Launch principles: there are zero private sales, zero investor pre-mines, and zero hidden allocations. The only valid mechanism to acquire native VORT is through decentralized Proof of Adaptive Velocity (PoAV) mining or open decentralized exchanges (DEX).
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              For initial cross-chain market liquidity (wVORT on Uniswap / Raydium), the protocol provides a decentralized public outlet vault (<code className="text-amber-400">pub const VORTCOIN_CROSS_CHAIN_BRIDGE_OUTLET: &str = "vortcoin_q_cross_chain_wrapped_bridge_outlet";</code>). Miners and community developers can voluntarily lock their mined coins into this public outlet without touching the primary Genesis Validator node, ensuring clean separation of consensus operations and 100% on-chain transparency for all observers.
            </p>
          </section>

          {/* Section 7 */}
          <section id="network-ports" className="scroll-mt-32 space-y-4 p-8 rounded-3xl bg-[#0C0E16] border border-slate-800/90">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <span>Section 07</span>
              <span>•</span>
              <span>Network Topology & Ports</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              7. Network Topology & Port Specifications
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              When deploying a VORTCOIN L1 validator or miner node on your server (GCP, AWS, or bare-metal VPS), ensure Linux firewall rules permit inbound traffic on:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-black/60 border border-slate-800">
                <span className="text-amber-400 font-bold block text-sm">Port 3690 (P2P Socket)</span>
                <span className="text-slate-400 mt-1 block">
                  Used for secure node-to-node communications, block synchronization, and processing PoAV handshake mechanics.
                </span>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-slate-800">
                <span className="text-amber-400 font-bold block text-sm">Port 8545 (RPC HTTP API)</span>
                <span className="text-slate-400 mt-1 block">
                  Used by Web3 frontends, block explorers, and browser extension wallets to asynchronously query on-chain data.
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
