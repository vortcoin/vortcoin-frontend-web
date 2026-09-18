import React, { useState } from "react";
import { PageTab, ActiveDomain } from "../types";
import { VORT_ENVIRONMENT } from "../../config";
import { 
  Terminal, 
  Cpu, 
  BookOpen, 
  Download, 
  Compass, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck, 
  Zap,
  Globe,
  Coins
} from "lucide-react";

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  activeDomain: ActiveDomain;
  setActiveDomain: (domain: ActiveDomain) => void;
  liveBlockHeight: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeDomain,
  setActiveDomain,
  liveBlockHeight,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: PageTab) => {
    setActiveTab(tab);
    if (tab === "explorer") {
      setActiveDomain("explorer.vortcoin.org");
    } else {
      setActiveDomain("vortcoin.org");
    }
    setMobileMenuOpen(false);
  };

  const toggleDomain = (domain: ActiveDomain) => {
    setActiveDomain(domain);
    if (domain === "explorer.vortcoin.org") {
      setActiveTab("explorer");
    } else if (activeTab === "explorer") {
      setActiveTab("home");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-500/20 bg-[#08090D]/90 backdrop-blur-xl">
      {/* Top micro-bar: Subdomain switcher & live status */}
      <div className="border-b border-white/5 bg-[#050608]/80 px-4 sm:px-8 py-1.5 text-[11px] font-mono flex flex-wrap items-center justify-between gap-3 text-slate-400 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold uppercase tracking-wider">PoAV Mainnet</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Port: <strong className="text-amber-400">3690</strong> (P2P) / <strong className="text-amber-400">8545</strong> (RPC)</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <span>Tesla 3-6-9 Alignment:</span>
            <span className="text-amber-400 font-bold">36.9M VORT Cap</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-300 font-bold">36.9% Gas Burn</span>
          </div>
        </div>

        {/* Subdomain Switcher Button Group */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-slate-500">Active Domain:</span>
          <div className="inline-flex rounded-lg p-0.5 bg-black/60 border border-slate-800">
            <button
              onClick={() => toggleDomain("vortcoin.org")}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                activeDomain === "vortcoin.org"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              vortcoin.org
            </button>
            <button
              onClick={() => toggleDomain("explorer.vortcoin.org")}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                activeDomain === "explorer.vortcoin.org"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Compass className="w-3 h-3 text-amber-400" />
              explorer.vortcoin.org
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-slate-400 pl-2">
            <span>Block:</span>
            <span className="text-amber-400 font-bold">#{liveBlockHeight}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div 
          onClick={() => handleTabClick("home")} 
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl p-0.5 bg-gradient-to-br from-amber-400/60 via-amber-600/30 to-black border border-amber-500/40 shadow-lg shadow-amber-500/20 group-hover:border-amber-400 transition-all overflow-hidden shrink-0">
            <img 
              src="/logo.png" 
              alt="VORTCOIN Logo" 
              className="w-full h-full object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                VORTCOIN
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded">
                L1 Core
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Proof of Adaptive Velocity (PoAV) • 36.9M Supply
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => handleTabClick("home")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "home" && activeDomain === "vortcoin.org"
                ? "text-amber-300 bg-amber-500/10 border border-amber-500/30 shadow-inner"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Ecosystem
          </button>

          <button
            onClick={() => handleTabClick("whitepaper")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "whitepaper"
                ? "text-amber-300 bg-amber-500/10 border border-amber-500/30 shadow-inner"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            Whitepaper (3-6-9)
          </button>

          <button
            onClick={() => handleTabClick("download")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "download"
                ? "text-amber-300 bg-amber-500/10 border border-amber-500/30 shadow-inner"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Download className="w-4 h-4 text-amber-400" />
            Download & Mining Hub
          </button>

          <button
            onClick={() => handleTabClick("developer")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "developer"
                ? "text-amber-300 bg-amber-500/10 border border-amber-500/30 shadow-inner"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Terminal className="w-4 h-4 text-slate-300" />
            Developers & CLI
          </button>

          <button
            onClick={() => handleTabClick("explorer")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "explorer" || activeDomain === "explorer.vortcoin.org"
                ? "text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-inner font-semibold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            Explorer
            <span className="text-[9px] font-mono px-1 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
              subdomain
            </span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab("download");
              setTimeout(() => {
                const el = document.getElementById("web-miner-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-lg overflow-hidden border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-yellow-600/10 text-amber-300 hover:border-amber-400 hover:text-amber-200 shadow-md shadow-amber-500/10 transition-all cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Launch Web Miner</span>
          </button>

          <button
            onClick={() => handleTabClick("download")}
            className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Get Node / APK</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg border border-slate-800"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-amber-500/20 bg-[#0A0B10] px-4 py-5 space-y-3">
          <div className="flex items-center justify-between p-2 rounded-lg bg-black/60 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Domain Mode:</span>
            <div className="flex gap-1">
              <button
                onClick={() => toggleDomain("vortcoin.org")}
                className={`px-2 py-1 rounded text-xs ${
                  activeDomain === "vortcoin.org" ? "bg-amber-500/20 text-amber-300 font-bold" : "text-slate-400"
                }`}
              >
                vortcoin.org
              </button>
              <button
                onClick={() => toggleDomain("explorer.vortcoin.org")}
                className={`px-2 py-1 rounded text-xs ${
                  activeDomain === "explorer.vortcoin.org" ? "bg-amber-500/20 text-amber-300 font-bold" : "text-slate-400"
                }`}
              >
                explorer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => handleTabClick("home")}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === "home" ? "bg-amber-500/20 text-amber-300" : "text-slate-300"
              }`}
            >
              Ecosystem & Home
            </button>
            <button
              onClick={() => handleTabClick("whitepaper")}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === "whitepaper" ? "bg-amber-500/20 text-amber-300" : "text-slate-300"
              }`}
            >
              Whitepaper (Tesla 3-6-9)
            </button>
            <button
              onClick={() => handleTabClick("download")}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === "download" ? "bg-amber-500/20 text-amber-300" : "text-slate-300"
              }`}
            >
              Download & Mining Hub (APK, Tauri, Web)
            </button>
            <button
              onClick={() => handleTabClick("developer")}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === "developer" ? "bg-amber-500/20 text-amber-300" : "text-slate-300"
              }`}
            >
              Developer & Node CLI
            </button>
            <button
              onClick={() => handleTabClick("explorer")}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === "explorer" ? "bg-amber-500/20 text-amber-300 font-bold" : "text-slate-300"
              }`}
            >
              Explorer (explorer.vortcoin.org)
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                handleTabClick("download");
                setTimeout(() => {
                  const el = document.getElementById("web-miner-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="w-full py-2.5 bg-amber-500/15 border border-amber-500/30 text-amber-300 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-amber-400" />
              Launch Instant Web Miner
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
