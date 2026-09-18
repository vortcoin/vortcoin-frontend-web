import React, { useState } from "react";
import { PageTab } from "../types";
import { VORT_ENVIRONMENT } from "../../config";
import { 
  Zap, 
  ShieldCheck, 
  Flame, 
  Cpu, 
  Download, 
  BookOpen, 
  Terminal, 
  Compass, 
  Layers, 
  Lock, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Building,
  Server
} from "lucide-react";

interface HomeProps {
  setActiveTab: (tab: PageTab) => void;
  setActiveDomain: (domain: "vortcoin.org" | "explorer.vortcoin.org") => void;
  liveBlockHeight: number;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, setActiveDomain, liveBlockHeight }) => {
  const [halvingBlockInput, setHalvingBlockInput] = useState<number>(3690000);

  // Calculate Era and Reward dynamically based on Tesla 3-6-9 rule
  const calculatedEra = Math.floor(halvingBlockInput / VORT_ENVIRONMENT.HALVING_CYCLE_BLOCKS) + 1;
  const calculatedReward = (VORT_ENVIRONMENT.INITIAL_BLOCK_REWARD / Math.pow(2, calculatedEra - 1)).toFixed(4);
  const totalEraSupply = (36900000 * (1 - Math.pow(0.5, calculatedEra))).toLocaleString();

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8 max-w-[1920px] mx-auto overflow-hidden">
        {/* Futuristic Background Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-yellow-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Official Genesis Logo Emblem */}
          <div className="flex justify-center mb-1">
            <div className="relative p-1 rounded-2xl bg-gradient-to-b from-amber-400/30 via-amber-500/10 to-transparent border border-amber-500/30 shadow-lg shadow-amber-500/15 hover:border-amber-400/50 transition-all">
              <img 
                src="/logo.png" 
                alt="VORTCOIN Official Emblem" 
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold shadow-lg shadow-amber-500/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>NIKOLA TESLA 3-6-9 ALIGNMENT • TRI-CORE LAYER-1 BLOCKCHAIN</span>
          </div>

          {/* Main Title with Gold Shimmer */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
            Hard-Sound Money Forged in{" "}
            <span className="text-gold-gradient block mt-2">
              Adaptive Velocity Physics
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            VORTCOIN (VORT) fuses the absolute scarcity of hard-sound money with parallelized monolithic throughput. Designed to bridge the tangible backing of Real World Assets (RWA) and post-quantum cryptographic resilience.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab("download")}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 font-mono font-black text-sm uppercase tracking-wider hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download Mining Nodes</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("download");
                setTimeout(() => {
                  document.getElementById("web-miner-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#12141D] border border-amber-500/40 text-amber-300 font-mono font-bold text-sm uppercase tracking-wider hover:border-amber-400 hover:bg-amber-500/10 shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Instant Web Miner</span>
            </button>

            <button
              onClick={() => setActiveTab("whitepaper")}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-200 font-mono font-medium text-sm hover:border-slate-500 hover:text-white transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Whitepaper (PDF)</span>
            </button>
          </div>

          {/* Live Quick Network Stats Bar */}
          <div className="pt-8">
            <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/25 backdrop-blur-xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-left font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Active Height</span>
                <span className="text-xl font-bold text-amber-400">#{liveBlockHeight}</span>
                <span className="text-[10px] text-emerald-400 block flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> +1 block / 30s
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Max Hard Supply</span>
                <span className="text-xl font-bold text-white">36.9M VORT</span>
                <span className="text-[10px] text-slate-400 block">Tesla Hard Cap</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Auto Gas Burn</span>
                <span className="text-xl font-bold text-amber-400">36.9%</span>
                <span className="text-[10px] text-amber-300/80 block">Deflationary Core</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Block Reward</span>
                <span className="text-xl font-bold text-white">10.0 VORT</span>
                <span className="text-[10px] text-slate-400 block">Era 1 Distribution</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">PoAV Network Output</span>
                <span className="text-xl font-bold text-emerald-400">3,690 H/s</span>
                <span className="text-[10px] text-slate-400 block">Handshake Velocity</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">P2P / RPC Ports</span>
                <span className="text-xl font-bold text-white">3690 / 8545</span>
                <span className="text-[10px] text-slate-400 block">Open Inbound TCP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE TRI-CORE ARCHITECTURAL PILLARS */}
      <section className="px-4 sm:px-8 max-w-[1920px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            Tri-Core Layer 1 Engine
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Engineered for Mathematical Scarcity & High Throughput
          </h3>
          <p className="text-slate-400 text-sm">
            VORTCOIN departs from volatile inflationary experiments by anchoring its consensus, emission, and cryptographic primitives into Nikola Tesla's 3-6-9 frequency harmonic matrix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#11131B] to-[#0A0C12] border border-amber-500/20 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold block mb-1">Pillar I</span>
            <h4 className="text-xl font-bold text-white mb-3">PoAV Consensus</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong>Proof of Adaptive Velocity</strong> dynamically scales cryptographic handshake difficulty in real time based on the immediate transactional velocity and TPS payload across the network.
            </p>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>Target block: 30s</span>
              <span className="text-amber-400">Zero Centralization</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#11131B] to-[#0A0C12] border border-slate-700/40 hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 mb-6 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-slate-400 font-bold block mb-1">Pillar II</span>
            <h4 className="text-xl font-bold text-white mb-3">Quantum-Safe Cryptography</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Protects standard BIP-39 24-word passphrases utilizing an enhanced <code>pbkdf2</code> key-stretching mechanism backed by exactly <strong>3,690 Tesla matrix iterations</strong>.
            </p>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>BIP-39 Extended</span>
              <span className="text-slate-300">Post-Quantum</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#11131B] to-[#0A0C12] border border-amber-500/20 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold block mb-1">Pillar III</span>
            <h4 className="text-xl font-bold text-white mb-3">Hyper-Deflationary Core</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Supply hard-capped at <strong>36,900,000 VORT</strong>. For every transaction processed on-chain, exactly <strong>36.9% of the gas fee is automatically destroyed forever</strong> into a provable black hole address.
            </p>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>Auto Gas Burn</span>
              <span className="text-amber-400">36.9% Forever</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#11131B] to-[#0A0C12] border border-slate-700/40 hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-slate-400 font-bold block mb-1">Pillar IV</span>
            <h4 className="text-xl font-bold text-white mb-3">Native Vesting & Bridges</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Out-of-the-box automated Vesting-Cliff protocols alongside embedded cross-chain bridge escrows (Ethereum ERC-20 / Solana SPL) handled directly at the Layer-1 core protocol state.
            </p>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>EVM / Solana Ready</span>
              <span className="text-slate-300">Native Cliff 3B</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MULTI-TOKEN SYSTEM & REAL WORLD ASSETS (RWA) ENGINE */}
      <section className="px-4 sm:px-8 max-w-[1920px] mx-auto">
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#12141E] via-[#0E1018] to-[#08090D] p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>RWA & SUB-TOKEN ARCHITECTURE</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                Multi-Token Ecosystem Without Primary Supply Dilution
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                To prevent dilution of the primary 36.9M VORT hard money reserve, Real World Assets (RWA) and community-driven tokens are issued as distinct Sub-Token Classes residing on the same ledger state.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-amber-500/20">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Creation Burn Tax (36.9 VORT)</h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Every minting initialization of a new community token or RWA sub-token requires a mandatory initiation fee of <strong>36.9 VORT</strong>, permanently burned from the circulating supply.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-800 text-slate-300 shrink-0">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Compound Velocity Scarcity</h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      As the transactional velocity of network-issued assets scales up, native VORT becomes mathematically scarcer through the universal 36.9% gas burn rule applied to all sub-tokens.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Tokenomics Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black/70 border border-amber-500/30 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Hard-Sound Money Parameters
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Tesla Frequency
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Total Fixed Supply:</span>
                  <span className="text-white font-bold">36,900,000.000000000 VORT</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Sub-Unit Precision:</span>
                  <span className="text-amber-400 font-bold">9 Decimals (Nano-Vort)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Halving Interval (Era):</span>
                  <span className="text-white font-bold">3,690,000 Blocks (~3.508 Years)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Era 1 Block Reward:</span>
                  <span className="text-emerald-400 font-bold">10.0 VORT / Block</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Gas Destruction Rule:</span>
                  <span className="text-amber-400 font-bold">36.9% Burned to Dead Address</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Sub-Token Creation Tax:</span>
                  <span className="text-amber-400 font-bold">36.9 VORT Burn Initiation</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab("whitepaper")}
                  className="w-full py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Whitepaper Tokenomics Formulas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE TESLA 3-6-9 HALVING SCHEDULE VISUALIZER */}
      <section className="px-4 sm:px-8 max-w-[1920px] mx-auto">
        <div className="rounded-3xl border border-slate-800 bg-[#0B0D14] p-8 sm:p-12 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                Cosmic Emission Curve
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                Tesla 3-6-9 Halving Era Simulator
              </h3>
            </div>

            <div className="px-4 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-right font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Block Simulation Slider</span>
              <span className="text-amber-300 font-bold text-sm">#{halvingBlockInput.toLocaleString()} BLOCKS</span>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-3">
            <input
              type="range"
              min={1}
              max={14760000}
              step={100000}
              value={halvingBlockInput}
              onChange={(e) => setHalvingBlockInput(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>Genesis Block #0</span>
              <span>Era 1: 3,690,000</span>
              <span>Era 2: 7,380,000</span>
              <span>Era 3: 11,070,000</span>
              <span>Era 4: 14,760,000</span>
            </div>
          </div>

          {/* Output metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Simulated Halving Era</span>
              <span className="text-2xl font-bold text-amber-400 mt-1 block">Era {calculatedEra}</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Right Bit-Shift Emission Algorithm</span>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Block Subsidy Reward</span>
              <span className="text-2xl font-bold text-emerald-400 mt-1 block">{calculatedReward} VORT</span>
              <span className="text-[11px] text-slate-400 mt-1 block">50% Decay per 3,690,000 blocks</span>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Cumulative Minted Target</span>
              <span className="text-2xl font-bold text-white mt-1 block">~{totalEraSupply} VORT</span>
              <span className="text-[11px] text-amber-300/80 mt-1 block">Strict 36.9M Ceiling</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MINING ONBOARDING CALLOUT CARDS */}
      <section className="px-4 sm:px-8 max-w-[1920px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            Node & Miner Distribution
          </span>
          <h3 className="text-3xl font-extrabold text-white font-display">
            Start Mining and Validating VORTCOIN Today
          </h3>
          <p className="text-slate-400 text-sm">
            Deploy decentralized computing nodes across mobile, desktop, headless VPS, or instant browser web workers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mobile APK */}
          <div className="p-8 rounded-2xl bg-[#0E1018] border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-4">📱</div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg font-bold text-white">Android Mobile Client</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono font-bold border border-emerald-500/20">Zero-Drain</span>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Minimalist everyday wallet and lightweight edge validator. Fast biometric login, QR send/receive, and passive consensus verification without battery drain or overheating.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("download")}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition-all"
            >
              Get Android Wallet .APK (v{VORT_ENVIRONMENT.DOWNLOADS.APK.VERSION})
            </button>
          </div>

          {/* Card 2: Desktop Tauri */}
          <div className="p-8 rounded-2xl bg-[#0E1018] border border-amber-500/30 hover:border-amber-500/60 transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="text-3xl mb-4">💻</div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg font-bold text-white">Desktop Tauri Suite</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono font-bold border border-amber-500/20">System Tray</span>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Quiet background PoAV miner and local node. Runs minimized in system tray with low process priority so your PC stays smooth for gaming, coding, and multitasking.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("download")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider hover:from-amber-300 hover:to-amber-500 transition-all shadow-md shadow-amber-500/20"
            >
              Download Desktop Executable
            </button>
          </div>

          {/* Card 3: Instant Web Worker */}
          <div className="p-8 rounded-2xl bg-[#0E1018] border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-4">🌐</div>
              <h4 className="text-lg font-bold text-white mb-2">Instant Web Miner</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Launch multi-threaded background miner worker routines straight inside your internet browser without installing anything. Instant share discovery and reward calculation.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab("download");
                setTimeout(() => {
                  document.getElementById("web-miner-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="w-full py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold transition-all"
            >
              Launch In-Browser Miner
            </button>
          </div>
        </div>
      </section>

      {/* 6. VPS TERMINAL COMMAND QUICK BLOCK */}
      <section className="px-4 sm:px-8 max-w-[1920px] mx-auto">
        <div className="p-6 rounded-2xl bg-black/80 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white font-bold block">Deploy Headless Linux VPS Node / Miner</span>
              <span className="text-slate-400 text-[11px]">Hardware: 1 vCPU • 1 GB RAM • 20 GB SSD • Ubuntu 22.04 / 24.04</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <code className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 overflow-x-auto w-full md:w-auto select-all">
              {VORT_ENVIRONMENT.SERVER_NODE_INSTALL_COMMAND}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(VORT_ENVIRONMENT.SERVER_NODE_INSTALL_COMMAND);
                alert("Copied deployment command to clipboard!");
              }}
              className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold shrink-0 cursor-pointer border border-amber-500/40"
            >
              Copy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
