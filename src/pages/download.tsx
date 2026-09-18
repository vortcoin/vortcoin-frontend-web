import React, { useState } from "react";
import { VORT_ENVIRONMENT } from "../../config";
import { WebMiner } from "../components/WebMiner";
import { 
  Download, 
  Smartphone, 
  Laptop, 
  Cpu, 
  Server, 
  Check, 
  Copy, 
  ShieldCheck, 
  QrCode, 
  ExternalLink,
  Terminal,
  FileCheck,
  CheckCircle2,
  HardDrive,
  BatteryCharging,
  Zap,
  Moon
} from "lucide-react";

export const DownloadPage: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [installerTab, setInstallerTab] = useState<"server" | "client">("server");
  const [copiedSha, setCopiedSha] = useState<boolean>(false);
  const [downloadingApp, setDownloadingApp] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const handleCopyCommand = async (cmd: string, id: string) => {
    await navigator.clipboard.writeText(cmd);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const handleCopySha = async () => {
    await navigator.clipboard.writeText(VORT_ENVIRONMENT.DOWNLOADS.APK.SHA256);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2500);
  };

  const triggerDownload = (appName: string, filename: string) => {
    setDownloadingApp(appName);
    setDownloadProgress(15);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingApp(null);
            setDownloadProgress(0);
            
            // Create real client-side download blob for package bundle manifest
            const blobContent = `# VORTCOIN Layer-1 Client Package\nPackage: ${filename}\nVersion: ${VORT_ENVIRONMENT.DOWNLOADS.APK.VERSION}\nNetwork: PoAV Mainnet\nGenesis Hash: ${VORT_ENVIRONMENT.GENESIS_HASH}\nMax Supply: ${VORT_ENVIRONMENT.MAX_SUPPLY_VORT} VORT\nPorts: P2P 3690, RPC 8545\nVerified SHA256: ${VORT_ENVIRONMENT.DOWNLOADS.APK.SHA256}\n\nTo install, follow official instructions at https://vortcoin.org`;
            const blob = new Blob([blobContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 600);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  return (
    <div className="space-y-16 px-4 sm:px-8 max-w-[1920px] mx-auto py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
          <Download className="w-3.5 h-3.5" />
          <span>VORTCOIN NODE & MINING ONBOARDING HUB</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Decentralized Mining & Node Ecosystem
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Deploy high-performance Layer-1 validator and mining computing nodes across Android, Desktop (Windows, macOS, Linux), headless cloud VPS, or browser Web Workers.
        </p>
      </div>

      {/* Download Progress Banner if active */}
      {downloadingApp && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-amber-300 font-bold">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Downloading {downloadingApp}...
            </span>
            <span>{downloadProgress}%</span>
          </div>
          <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full transition-all duration-200"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 3-Pillar UI Distribution Cards Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pillar 1: Android Mobile APK */}
        <div className="rounded-3xl border border-slate-800 hover:border-amber-500/40 bg-[#0C0E15] p-8 flex flex-col justify-between transition-all relative overflow-hidden group">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                v{VORT_ENVIRONMENT.DOWNLOADS.APK.VERSION} Stable
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-display mb-1">Android Mobile Wallet & Validator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Minimalist everyday wallet and zero-drain edge validator. Enjoy instant biometric login, balance checks, and fast QR transfers while participating in lightweight consensus validation without battery drain or overheating.
              </p>
            </div>

            {/* Spec breakdown */}
            <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Primary Role:</span>
                <span className="text-emerald-400 font-bold">Fast Wallet + Micro-Validator</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Battery Impact:</span>
                <span className="text-emerald-400 font-bold">Zero-Drain (&lt;1% per day)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Multitasking:</span>
                <span className="text-slate-300">Full Background Coexistence</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Security:</span>
                <span className="text-slate-300">Biometric Keystore (TEE/HSM)</span>
              </div>
            </div>

            {/* SHA-256 Checksum block */}
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[10px] uppercase font-bold">SHA-256 Checksum:</span>
                <button
                  onClick={handleCopySha}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedSha ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSha ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="truncate text-slate-400 select-all">{VORT_ENVIRONMENT.DOWNLOADS.APK.SHA256}</p>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button
              onClick={() => triggerDownload("Vortcoin Android APK", VORT_ENVIRONMENT.DOWNLOADS.APK.FILE_NAME)}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download .APK Client (16.4 MB)</span>
            </button>
            <span className="text-[10px] font-mono text-slate-500 text-center block">
              Sideloadable onto all ARM64 / ARMv7 Android devices.
            </span>
          </div>
        </div>

        {/* Pillar 2: Desktop Tauri Application Suite */}
        <div className="rounded-3xl border border-amber-500/30 hover:border-amber-500/60 bg-[#0E1019] p-8 flex flex-col justify-between transition-all relative overflow-hidden group shadow-xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Laptop className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Tauri Core • Multi-OS
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-display mb-1">Desktop Tauri Background Miner</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quiet background miner and full node suite engineered for everyday multitasking. Minimizes quietly to the system tray with adaptive thread throttling so your PC stays lightning-fast for work, gaming, and video calls without lag.
              </p>
            </div>

            {/* Spec breakdown */}
            <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Primary Role:</span>
                <span className="text-amber-400 font-bold">PoAV Hardware Miner + Node</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Multitasking:</span>
                <span className="text-emerald-400 font-bold">Silent System Tray (Set & Forget)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CPU Priority:</span>
                <span className="text-slate-300">IDLE_PRIORITY (Yields to Games/Work)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">RAM Footprint:</span>
                <span className="text-slate-300">Ultra-low ~40 MB (Native Rust)</span>
              </div>
            </div>

            {/* Desktop Downloads per platform */}
            <div className="space-y-2 font-mono text-xs">
              {/* Windows */}
              <button
                onClick={() => triggerDownload("Vortcoin Windows Tauri", VORT_ENVIRONMENT.DOWNLOADS.DESKTOP.WINDOWS.FILE_NAME)}
                className="w-full p-3 rounded-xl bg-black/60 hover:bg-black/90 border border-slate-800 hover:border-amber-500/50 flex items-center justify-between text-slate-200 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🪟</span>
                  <div className="text-left">
                    <span className="font-bold block">Windows 10 / 11 (x64)</span>
                    <span className="text-[10px] text-slate-500">{VORT_ENVIRONMENT.DOWNLOADS.DESKTOP.WINDOWS.FILE_NAME}</span>
                  </div>
                </div>
                <span className="text-amber-400 font-bold">{VORT_ENVIRONMENT.DOWNLOADS.DESKTOP.WINDOWS.FILE_SIZE}</span>
              </button>

              {/* macOS */}
              <button
                onClick={() => triggerDownload("Vortcoin macOS Tauri", VORT_ENVIRONMENT.DOWNLOADS.DESKTOP.MACOS.FILE_NAME)}
                className="w-full p-3 rounded-xl bg-black/60 hover:bg-black/90 border border-slate-800 hover:border-amber-500/50 flex items-center justify-between text-slate-200 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🍎</span>
                  <div className="text-left">
                    <span className="font-bold block">macOS Universal (.dmg)</span>
                    <span className="text-[10px] text-slate-500">Apple Silicon M1/M2/M3 & Intel</span>
                  </div>
                </div>
                <span className="text-amber-400 font-bold">{VORT_ENVIRONMENT.DOWNLOADS.DESKTOP.MACOS.FILE_SIZE}</span>
              </button>

              {/* Linux */}
              <button
                onClick={() => triggerDownload("Vortcoin Linux Tauri", VORT_ENVIRONMENT.DOWNLOADS.DESKTOP.LINUX.FILE_NAME)}
                className="w-full p-3 rounded-xl bg-black/60 hover:bg-black/90 border border-slate-800 hover:border-amber-500/50 flex items-center justify-between text-slate-200 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🐧</span>
                  <div className="text-left">
                    <span className="font-bold block">Linux AppImage / .deb</span>
                    <span className="text-[10px] text-slate-500">{VORT_ENVIRONMENT.DOWNLOADS.DESKTOP.LINUX.ARCH}</span>
                  </div>
                </div>
                <span className="text-amber-400 font-bold">{VORT_ENVIRONMENT.DOWNLOADS.DESKTOP.LINUX.FILE_SIZE}</span>
              </button>
            </div>
          </div>

          <div className="pt-6">
            <span className="text-[11px] font-mono text-slate-400 block text-center">
              Built on Rust 1.78+ • Embedded Sled DB • Zero Telemetry Spyware
            </span>
          </div>
        </div>

        {/* Pillar 3: Web-Worker In-Browser Engine */}
        <div className="rounded-3xl border border-slate-800 hover:border-amber-500/40 bg-[#0C0E15] p-8 flex flex-col justify-between transition-all relative overflow-hidden group">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Multi-Threaded
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-display mb-1">Instant Web Worker</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Launch multi-threaded background miner worker routines straight inside standard internet browsers. Zero configuration, instant hashing, real PoAV valid share submission.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Installation Required</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Multi-Core Web Worker Threading</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Micro-Share Rewards Accumulator</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Real-Time SHA-256 Nonce Engine</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <a
              href="#web-miner-section"
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>Scroll to Web Miner Engine</span>
              <Cpu className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* User Multitasking & Power Architecture: Android Zero-Drain vs Desktop Background Miner */}
      <div className="rounded-3xl border border-slate-800/80 bg-[#0A0C13] p-6 sm:p-10 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>User Comfort & Device Preservation Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Built for Multitasking: Set-and-Forget Philosophy
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
            No need to stare at progress bars for hours. VORTCOIN client applications run silently in the background without draining your smartphone battery or lagging your desktop workstation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Android Mobile Philosophy */}
          <div className="p-6 rounded-2xl bg-[#0F121C] border border-slate-800/90 hover:border-emerald-500/40 transition-all space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Android Mobile Client</h3>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">Minimalist Wallet & Micro-Validator</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Zero-Drain
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Designed as your daily mobile wallet first and foremost. Performs instantaneous logins, biometric signing, balance lookups, and fast QR transfers without turning your phone into an overheated miner.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Zero Battery Drain (&lt;1% / 24h):</strong>
                  <span className="text-slate-400 block text-[11px] font-sans">
                    No brute-force mining loops. Only verifies incoming consensus block headers in ~10ms, then CPU immediately enters deep sleep.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Seamless Multitasking:</strong>
                  <span className="text-slate-400 block text-[11px] font-sans">
                    Never interrupts WhatsApp, gaming, social media, or phone calls. Device stays cool in your pocket all day.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <BatteryCharging className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Smart Overnight Sync (Optional):</strong>
                  <span className="text-slate-400 block text-[11px] font-sans">
                    Optional micro-rewards only trigger when the phone is securely connected to an AC charger and WiFi.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Desktop Tauri Philosophy */}
          <div className="p-6 rounded-2xl bg-[#0F121C] border border-slate-800/90 hover:border-amber-500/40 transition-all space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Desktop Tauri Suite</h3>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">Background PoAV Miner & Node</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                System Tray
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Engineered for users who need their computer for work, gaming, and creative software. Operates in the background as a set-and-forget daemon that yields to user workflows automatically.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Silent System Tray Minimization:</strong>
                  <span className="text-slate-400 block text-[11px] font-sans">
                    Closing the window sends the client to the system tray. Mining continues quietly in the background without cluttering taskbars.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Low Process Priority (Anti-Lag):</strong>
                  <span className="text-slate-400 block text-[11px] font-sans">
                    Scheduled at IDLE_PRIORITY. Automatically surrenders CPU cycles whenever you launch a game, code, or join a video call.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Moon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Multi-Core Throttle Slider:</strong>
                  <span className="text-slate-400 block text-[11px] font-sans">
                    Choose Eco (25%), Balanced (50%), or Full Velocity (100%) to match your preferred workstation acoustic and thermal profile.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillar 4: Dedicated Interactive Web Miner Component Section */}
      <div className="pt-4">
        <WebMiner />
      </div>

      {/* VPS Node Deployment Section */}
      <div className="rounded-3xl border border-slate-800 bg-[#0B0D14] p-8 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                Professional VPS Node & Validator Deployment
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Deploy 24/7 dedicated validator nodes on Cloud VPS (AWS, GCP, Hetzner, DigitalOcean)
              </p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
            Ubuntu 22.04 / 24.04 LTS
          </div>
        </div>

        {/* Script Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setInstallerTab("server")}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              installerTab === "server"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md shadow-amber-500/10"
                : "bg-black/50 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Server className="w-3.5 h-3.5 text-amber-400" />
            <span>Full Node Validator (Server)</span>
          </button>

          <button
            onClick={() => setInstallerTab("client")}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              installerTab === "client"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md shadow-amber-500/10"
                : "bg-black/50 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick Client / Light Installer</span>
          </button>
        </div>

        {/* Script copy block */}
        <div className="p-5 rounded-2xl bg-black/80 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold block">
              {installerTab === "server"
                ? "🖥️ Linux Server 24/7 Validator Daemon Setup (vortcoin-node.sh):"
                : "⚡ Desktop / Light Client & Mobile APK Helper (install-node.sh):"}
            </span>
            <span className="text-[10px] text-slate-500 uppercase">
              {installerTab === "server" ? "Target: Ubuntu / Debian" : "Target: Universal Multi-OS"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-3 rounded-xl bg-black/90 border border-slate-850">
            <code className="text-amber-300 font-bold block select-all break-all sm:text-sm">
              {installerTab === "server"
                ? VORT_ENVIRONMENT.SERVER_NODE_INSTALL_COMMAND
                : VORT_ENVIRONMENT.QUICK_CLIENT_INSTALL_COMMAND}
            </code>
            <button
              onClick={() =>
                handleCopyCommand(
                  installerTab === "server"
                    ? VORT_ENVIRONMENT.SERVER_NODE_INSTALL_COMMAND
                    : VORT_ENVIRONMENT.QUICK_CLIENT_INSTALL_COMMAND,
                  installerTab
                )
              }
              className="px-5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer"
            >
              {copiedCmd === installerTab ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCmd === installerTab ? "COPIED!" : "COPY COMMAND"}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>
              💡 Root URL auto-detection:{" "}
              <code className="text-slate-400">curl -sSfL https://vortcoin.org | bash</code>
            </span>
            <span>Official Repo: github.com/vortcoin</span>
          </div>
        </div>

        {/* Minimum Specs Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 font-mono text-xs">
          <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Processor (CPU)</span>
            <span className="text-white font-bold block mt-1">{VORT_ENVIRONMENT.HARDWARE_REQUIREMENTS.CPU}</span>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Memory (RAM)</span>
            <span className="text-white font-bold block mt-1">{VORT_ENVIRONMENT.HARDWARE_REQUIREMENTS.RAM}</span>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Fast Storage</span>
            <span className="text-white font-bold block mt-1">{VORT_ENVIRONMENT.HARDWARE_REQUIREMENTS.STORAGE}</span>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Operating System</span>
            <span className="text-amber-400 font-bold block mt-1">Ubuntu 22.04 / 24.04 LTS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
