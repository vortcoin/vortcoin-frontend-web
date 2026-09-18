import React from "react";
import { PageTab } from "../types";
import { VORT_ENVIRONMENT } from "../../config";
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  FileText, 
  Github, 
  Disc as Discord, 
  Send, 
  Compass, 
  ExternalLink,
  Flame,
  Zap,
  Lock
} from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  setActiveDomain: (domain: "vortcoin.org" | "explorer.vortcoin.org") => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, setActiveDomain }) => {
  return (
    <footer className="w-full border-t border-amber-500/20 bg-[#06070A] text-slate-400 font-sans mt-20">
      {/* 3-6-9 Tesla Alignment Banner */}
      <div className="border-b border-white/5 bg-gradient-to-r from-[#0B0D14] via-[#121520] to-[#0B0D14] py-8">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-black/40 border border-amber-500/20">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Tesla Matrix Alignment
              </div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">36,900,000 VORT</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Hard-coded maximum cap with 9-decimal precision (Nano-Vort).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-black/40 border border-amber-500/20">
            <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-amber-500">
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Hyper-Deflationary Burn
              </div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">36.9% Gas Burned</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Automatic permanent burn into black hole address on every transaction.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-black/40 border border-slate-700/40">
            <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Quantum-Safe Primitives
              </div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">3,690 Iterations</div>
              <p className="text-[11px] text-slate-400 mt-1">
                PBKDF2 key-stretching protecting BIP-39 24-word passphrases.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-black/40 border border-emerald-500/20">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                PoAV Consensus Core
              </div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">30s Block Time</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Proof of Adaptive Velocity scaling difficulty dynamically with TPS.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand & Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl p-0.5 bg-gradient-to-br from-amber-400/50 via-amber-600/30 to-black border border-amber-500/40 shadow-md shadow-amber-500/10 overflow-hidden shrink-0">
              <img 
                src="/logo.png" 
                alt="VORTCOIN Logo" 
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-lg font-bold text-white font-display">VORTCOIN (VORT)</span>
              <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                Tri-Core L1
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            VORTCOIN is a long-term adaptive Layer-1 blockchain engineered to fuse the immutable scarcity physics of hard-sound money with the ultra-high throughput efficiency of parallelized monolithic architectures.
          </p>

          <div className="pt-2 font-mono text-xs text-slate-400 space-y-1">
            <div>
              Main Portal: <span className="text-amber-400">vortcoin.org</span>
            </div>
            <div>
              Explorer Subdomain: <span className="text-amber-400">explorer.vortcoin.org</span>
            </div>
            <div>
              P2P Protocol: <span className="text-slate-300">Port 3690 (Inbound TCP)</span>
            </div>
            <div>
              RPC API Gateway: <span className="text-slate-300">Port 8545 (JSON-RPC HTTP)</span>
            </div>
          </div>
        </div>

        {/* Col 2: Mining Ecosystem */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">
            Mining Ecosystem
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button 
                onClick={() => { setActiveTab("download"); }}
                className="hover:text-amber-300 transition-colors text-left"
              >
                Android Mobile APK (v{VORT_ENVIRONMENT.DOWNLOADS.APK.VERSION})
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveTab("download"); }}
                className="hover:text-amber-300 transition-colors text-left"
              >
                Desktop Tauri Suite (Win / Mac / Linux)
              </button>
            </li>
            <li>
              <button 
                onClick={() => { 
                  setActiveTab("download");
                  setTimeout(() => {
                    document.getElementById("web-miner-section")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="hover:text-amber-300 transition-colors text-left text-amber-400/90 font-medium"
              >
                Instant Web Worker Miner
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveTab("developer"); }}
                className="hover:text-amber-300 transition-colors text-left"
              >
                CLI Daemon (Headless VPS)
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveTab("developer"); }}
                className="hover:text-amber-300 transition-colors text-left"
              >
                Hardware Requirements Guide
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Architecture & Protocol */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            Protocol & RWA
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button 
                onClick={() => setActiveTab("whitepaper")}
                className="hover:text-amber-300 transition-colors text-left"
              >
                Whitepaper (Full Tri-Core)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("whitepaper")}
                className="hover:text-amber-300 transition-colors text-left"
              >
                Tesla 3-6-9 Halving Era Model
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("whitepaper")}
                className="hover:text-amber-300 transition-colors text-left"
              >
                Multi-Token RWA Sub-Tokens
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("whitepaper")}
                className="hover:text-amber-300 transition-colors text-left"
              >
                Creation Burn Tax (36.9 VORT)
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setActiveDomain("explorer.vortcoin.org");
                  setActiveTab("explorer");
                }}
                className="hover:text-amber-300 transition-colors text-left text-amber-400 flex items-center gap-1"
              >
                <span>Ledger Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Developers */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            Developers & Nodes
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button 
                onClick={() => setActiveTab("developer")}
                className="hover:text-amber-300 transition-colors text-left"
              >
                CLI Command Quickstart
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("developer")}
                className="hover:text-amber-300 transition-colors text-left"
              >
                JSON-RPC 2.0 API Docs
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("developer")}
                className="hover:text-amber-300 transition-colors text-left"
              >
                Systemd Validator Service
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("developer")}
                className="hover:text-amber-300 transition-colors text-left"
              >
                Rust Crate SDK Integration
              </button>
            </li>
            <li>
              <div className="pt-1">
                <span className="text-[11px] text-slate-500 font-mono block">Validator Node Deploy (Server):</span>
                <code className="text-[10px] text-amber-300 font-mono bg-black/60 px-2 py-1 rounded block mt-1 overflow-x-auto border border-slate-800">
                  {VORT_ENVIRONMENT.SERVER_NODE_INSTALL_COMMAND}
                </code>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-white/5 bg-[#040507] py-6 px-4 sm:px-8">
        <div className="max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © 2026 VORTCOIN Foundation. Open-source under the{" "}
            <span className="text-slate-300 font-bold">MIT License</span>.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-amber-400 font-bold">Tesla Alignment: 3 • 6 • 9</span>
            <span>Tri-Core L1 Architecture</span>
            <span className="text-emerald-400">● Mainnet Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
