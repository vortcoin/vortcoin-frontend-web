import React, { useState } from "react";
import { VORT_ENVIRONMENT } from "../../config";
import { RPC_DOCS } from "../mockData";
import { RpcEndpointDoc } from "../types";
import { 
  Terminal, 
  Code, 
  Copy, 
  Check, 
  Play, 
  Server, 
  ShieldCheck, 
  Database, 
  Network, 
  Zap, 
  FileCode,
  HardDrive,
  Cpu,
  Download
} from "lucide-react";

export const DeveloperPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cli" | "rpc" | "systemd" | "specs" | "sync">("cli");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedRpc, setSelectedRpc] = useState<RpcEndpointDoc>(RPC_DOCS[0]);
  const [rpcResult, setRpcResult] = useState<string>(
    JSON.stringify(RPC_DOCS[0].sampleResponse, null, 2)
  );
  const [isExecutingRpc, setIsExecutingRpc] = useState<boolean>(false);

  const copyText = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const executeRpcCall = () => {
    setIsExecutingRpc(true);
    setTimeout(() => {
      setRpcResult(JSON.stringify(selectedRpc.sampleResponse, null, 2));
      setIsExecutingRpc(false);
    }, 300);
  };

  const cliCommands = [
    {
      id: "env",
      title: "Activate Local Environment Shortcut",
      command: "source vortcoin-env.sh",
      desc: "Loads binary paths, socket bindings, and environment variables into current bash shell session.",
      category: "Setup"
    },
    {
      id: "wallet-create",
      title: "Generate Quantum-Safe Wallet",
      command: "vortcoin wallet-create",
      desc: "Generates BIP-39 24-word passphrase stretched with 3,690 Tesla PBKDF2 matrix iterations.",
      category: "Wallet"
    },
    {
      id: "balance",
      title: "Query On-Chain Account Balance",
      command: "vortcoin balance --address vort_q_369a489f0293cb837190e2fa8372b01488c994ad",
      desc: "Queries local Sled DB or remote RPC endpoint for confirmed VORT balance and nonce.",
      category: "Wallet"
    },
    {
      id: "transfer",
      title: "Send VORT (Automated 36.9% Gas Burn)",
      command: "vortcoin transfer --from vort_q_sender... --to vort_q_receiver... --amount 100",
      desc: "Executes standard transfer where 36.9% of base gas is permanently sent to dead address.",
      category: "Transactions"
    },
    {
      id: "node-start",
      title: "Launch PoAV Miner / Validator Node",
      command: "vortcoin node-start --miner-address vort_q_369a489f0293cb837190e2fa8372b01488c994ad",
      desc: "Starts P2P daemon on port 3690 and RPC daemon on port 8545, participating in block validation.",
      category: "Mining"
    },
    {
      id: "bridge-to-wrapped",
      title: "Lock Native Coins for Official DEX Listing Bridge",
      command: "vortcoin bridge-to-wrapped --from-address vort_q_miner... --target-network ethereum --target-wallet-escrow 0xDexEscrowVault... --amount 1000",
      desc: "Locks native mined VORT into the official DEX listing bridge outlet vault (vortcoin_q_cross_chain_wrapped_bridge_outlet) for initial Uniswap (ERC-20) or Raydium (SPL) pool liquidity.",
      category: "Bridge & Listing"
    },
    {
      id: "bridge-to-native",
      title: "Redeem Wrapped Tokens to Native L1 (Arbitrage Engine)",
      command: "vortcoin bridge-to-native --to-address vort_q_miner... --from-network ethereum --proof-tx-hash 0xExternalBurnProofHash... --amount 1000",
      desc: "Verifies external burn proof transaction hash and unlocks 1:1 native VORT from the official DEX bridge outlet vault back to your L1 wallet.",
      category: "Bridge & Listing"
    },
    {
      id: "bridge-balance",
      title: "Audit Official DEX Listing Reserve Vault",
      command: "vortcoin balance --address vortcoin_q_cross_chain_wrapped_bridge_outlet",
      desc: "Audits on-chain balance of the designated DEX listing bridge outlet address (vortcoin_q_cross_chain_wrapped_bridge_outlet) transparently.",
      category: "Ecosystem"
    }
  ];

  return (
    <div className="space-y-12 px-4 sm:px-8 max-w-[1920px] mx-auto py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span>DEVELOPER & NODE OPERATOR HUB</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Build & Validate on VORTCOIN
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Comprehensive CLI reference, JSON-RPC 2.0 gateway documentation, network firewall specifications, and systemd deployment automation for node validators.
        </p>
      </div>

      {/* Primary Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/5 pb-4 font-mono text-xs">
        <button
          onClick={() => setActiveTab("cli")}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === "cli"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10"
              : "bg-[#0C0E15] text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>CLI Command Reference</span>
        </button>

        <button
          onClick={() => setActiveTab("rpc")}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === "rpc"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10"
              : "bg-[#0C0E15] text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Code className="w-4 h-4" />
          <span>JSON-RPC 2.0 Playground</span>
        </button>

        <button
          onClick={() => setActiveTab("systemd")}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === "systemd"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10"
              : "bg-[#0C0E15] text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Systemd Service Generator</span>
        </button>

        <button
          onClick={() => setActiveTab("specs")}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === "specs"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10"
              : "bg-[#0C0E15] text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Ports & Hardware Specs</span>
        </button>

        <button
          onClick={() => setActiveTab("sync")}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === "sync"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10"
              : "bg-[#0C0E15] text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Cpu className="w-4 h-4 text-amber-400" />
          <span>Sync Multi-Repo Script</span>
        </button>
      </div>

      {/* Tab 1: CLI Commands Reference */}
      {activeTab === "cli" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-bold">CLI 1.3.69</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold block">VORTCOIN L1 Core Ledger Daemon</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                    Dual Command Active
                  </span>
                </div>
                <span className="text-slate-400 text-[11px]">
                  Both <code>vortcoin</code> and <code>vortcoin-cli</code> commands are mapped identically across all terminal sessions.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-amber-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                vortcoin --help
              </code>
              <span className="text-slate-500 text-xs">or</span>
              <code className="text-amber-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                vortcoin-cli --help
              </code>
            </div>
          </div>

          {/* Fair Launch & Official DEX Listing Bridge Outlet Banner */}
          <div className="p-5 rounded-2xl bg-[#090B10] border border-amber-500/25 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 font-mono text-xs shadow-lg shadow-black/40">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                  100% Fair Launch • Official Initial DEX Listing Vault
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                  On-Chain Verified
                </span>
              </div>
              <p className="text-slate-300 text-xs font-sans leading-relaxed">
                Native VORT is acquired solely via PoAV mining. For the initial DEX listing (Uniswap ERC-20 / Raydium SPL), all initial wrapped liquidity will be provisioned directly through this designated on-chain bridge vault, keeping the Genesis Validator node completely isolated and dedicated to network consensus.
              </p>
            </div>
            <div className="shrink-0 p-3 rounded-xl bg-black/90 border border-amber-500/30 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold block">
                Official Listing Bridge Vault (Consensus Constant):
              </span>
              <code className="text-amber-400 text-xs font-bold select-all block break-all">
                vortcoin_q_cross_chain_wrapped_bridge_outlet
              </code>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cliCommands.map((cmd) => (
              <div
                key={cmd.id}
                className="p-6 rounded-2xl bg-[#0D0F17] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 font-mono flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                      {cmd.category}
                    </span>
                    <button
                      onClick={() => copyText(cmd.command, cmd.id)}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === cmd.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === cmd.id ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans">{cmd.title}</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{cmd.desc}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5">
                  <code className="text-xs text-amber-300 bg-black/80 px-3 py-2 rounded-lg block overflow-x-auto border border-slate-850 select-all">
                    {cmd.command}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: JSON-RPC 2.0 API Playground */}
      {activeTab === "rpc" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* RPC Method List */}
          <div className="lg:col-span-1 rounded-2xl border border-slate-800 bg-[#0B0D14] p-5 space-y-3 font-mono text-xs">
            <div className="pb-3 border-b border-white/5 flex items-center justify-between">
              <span className="text-amber-400 font-bold uppercase tracking-wider">Methods (Port 8545)</span>
              <span className="text-slate-500">JSON-RPC 2.0</span>
            </div>

            <div className="space-y-1.5">
              {RPC_DOCS.map((doc) => (
                <button
                  key={doc.method}
                  onClick={() => {
                    setSelectedRpc(doc);
                    setRpcResult(JSON.stringify(doc.sampleResponse, null, 2));
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                    selectedRpc.method === doc.method
                      ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="block font-bold">{doc.method}</span>
                  <span className="text-[10px] text-slate-500 truncate block font-sans mt-0.5">
                    {doc.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RPC Inspector & Live Runner */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl border border-amber-500/30 bg-[#0E1018] space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Selected Endpoint:</span>
                  <span className="text-lg font-bold text-amber-400">{selectedRpc.method}</span>
                </div>
                <button
                  onClick={executeRpcCall}
                  disabled={isExecutingRpc}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 font-bold flex items-center gap-1.5 hover:from-amber-300 hover:to-amber-500 transition-all cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isExecutingRpc ? "Querying..." : "Execute RPC Call"}</span>
                </button>
              </div>

              <p className="text-slate-300 font-sans text-xs">{selectedRpc.description}</p>

              <div>
                <span className="text-slate-500 text-[11px] block mb-1">Payload Request Parameters:</span>
                <pre className="p-3 rounded-xl bg-black/80 border border-slate-800 text-slate-300 overflow-x-auto">
{`{
  "jsonrpc": "2.0",
  "method": "${selectedRpc.method}",
  "params": ${selectedRpc.params},
  "id": 369
}`}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500 text-[11px]">RPC Response Payload:</span>
                  <span className="text-[10px] text-emerald-400">HTTP 200 OK (30ms)</span>
                </div>
                <pre className="p-4 rounded-xl bg-black/90 border border-amber-500/20 text-emerald-400 overflow-x-auto text-[11px] leading-relaxed">
                  {rpcResult}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Systemd Validator Service Generator */}
      {activeTab === "systemd" && (
        <div className="rounded-2xl border border-slate-800 bg-[#0C0E16] p-6 sm:p-8 space-y-6 font-mono text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-display">
                  Automated Systemd 24/7 Validator Service
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Repo Synchronized
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Official service manifest matching <code>vortcoin-node.sh</code> from the core GitHub repository. Both <code>vortcoin</code> and <code>vortcoin-cli</code> commands are active.
              </p>
            </div>
            <button
              onClick={() => copyText(`[Unit]
Description=VORTCOIN Network PoAV Validator Node
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/vortcoin_miner_node
ExecStart=/usr/local/bin/vortcoin node-start
Restart=always
RestartSec=10
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/ubuntu/.cargo/bin"

[Install]
WantedBy=multi-user.target`, "systemd")}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-2 cursor-pointer"
            >
              {copiedId === "systemd" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === "systemd" ? "Copied Service File" : "Copy Service Configuration"}</span>
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-slate-400 text-xs">Target Path: <code>/etc/systemd/system/vortcoin-node.service</code></span>
            <pre className="p-5 rounded-2xl bg-black/80 border border-slate-800 text-amber-300 overflow-x-auto select-all leading-relaxed">
{`[Unit]
Description=VORTCOIN Network PoAV Validator Node
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/vortcoin_miner_node
ExecStart=/usr/local/bin/vortcoin node-start
Restart=always
RestartSec=10
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/ubuntu/.cargo/bin"

# Directed Retail Mining Mode (Optional):
# If you wish to route block rewards directly to an external cold/web address:
# ExecStart=/usr/local/bin/vortcoin node-start --miner-address vort_q_369a489f0293cb837190e2fa8372b01488c994ad

[Install]
WantedBy=multi-user.target`}
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2 font-mono text-[11px] text-slate-300">
            <span className="text-amber-400 font-bold block">Enable, start, and monitor logs in real-time:</span>
            <div className="space-y-1">
              <code>sudo systemctl daemon-reload && sudo systemctl enable --now vortcoin-node.service</code>
              <div className="text-emerald-400 font-bold mt-1">
                <code>journalctl -u vortcoin-node.service -f</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Ports & Hardware Specs */}
      {activeTab === "specs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* Ports */}
          <div className="p-6 rounded-2xl bg-[#0D0F17] border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Network className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-sans">Network Firewall Ports</h4>
                <p className="text-xs text-slate-400 font-sans">Configure your cloud firewall rules (GCP / AWS / VPS)</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
                <div className="flex justify-between items-center text-slate-200">
                  <span className="font-bold text-amber-400">Port 3690 (P2P Socket)</span>
                  <span className="text-[10px] text-emerald-400 uppercase">Inbound TCP</span>
                </div>
                <p className="text-slate-400 text-[11px] font-sans mt-1">
                  Peer-to-peer block gossiping, PoAV handshake verification, and mempool synchronization.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
                <div className="flex justify-between items-center text-slate-200">
                  <span className="font-bold text-amber-400">Port 8545 (RPC HTTP API)</span>
                  <span className="text-[10px] text-emerald-400 uppercase">Inbound TCP</span>
                </div>
                <p className="text-slate-400 text-[11px] font-sans mt-1">
                  Query balances, inspect blocks, and broadcast signed raw transactions via JSON-RPC.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-slate-500 text-[10px] block mb-1">UFW Linux Firewall Command:</span>
              <code className="text-amber-300 bg-black/80 p-2.5 rounded-lg block border border-slate-800">
                sudo ufw allow 3690/tcp && sudo ufw allow 8545/tcp
              </code>
            </div>
          </div>

          {/* Hardware Specs */}
          <div className="p-6 rounded-2xl bg-[#0D0F17] border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-slate-200">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-sans">Hardware Validation Specs</h4>
                <p className="text-xs text-slate-400 font-sans">Efficient PoAV footprint without GPU waste</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between p-3 rounded-xl bg-black/50 border border-slate-800">
                <span className="text-slate-400">CPU:</span>
                <span className="text-white font-bold">{VORT_ENVIRONMENT.HARDWARE_REQUIREMENTS.CPU}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-black/50 border border-slate-800">
                <span className="text-slate-400">Memory (RAM):</span>
                <span className="text-white font-bold">{VORT_ENVIRONMENT.HARDWARE_REQUIREMENTS.RAM}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-black/50 border border-slate-800">
                <span className="text-slate-400">Fast Disk Storage:</span>
                <span className="text-amber-400 font-bold">{VORT_ENVIRONMENT.HARDWARE_REQUIREMENTS.STORAGE}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-black/50 border border-slate-800">
                <span className="text-slate-400">Operating System:</span>
                <span className="text-white font-bold">{VORT_ENVIRONMENT.HARDWARE_REQUIREMENTS.OS}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Multi-Repo Protocol Synchronization */}
      {activeTab === "sync" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-amber-500/30 bg-[#0E1018] space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Harmonization Engine
                </span>
                <h3 className="text-lg font-bold text-white font-sans mt-0.5">
                  Multi-Repository Auto-Patching Script
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Automatically aligns Mobile Wallet (Ed25519 signer & RPC client) and Desktop Miner (PoAV share dispatcher) to Genesis L1 Core (<code>handler.rs</code>).
                </p>
              </div>

              <a
                href="/sync-vortcoin-repos.sh"
                download="sync-vortcoin-repos.sh"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download sync-vortcoin-repos.sh</span>
              </a>
            </div>

            {/* Quick Terminal Run Block */}
            <div className="p-4 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs space-y-2">
              <span className="text-slate-400 text-[11px] block">
                # Run directly inside your multi-repo workspace to auto-patch all files:
              </span>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-black/70 border border-slate-850">
                <code className="text-amber-300 font-bold select-all break-all">
                  curl -sSfL https://vortcoin.org/sync-vortcoin-repos.sh | bash
                </code>
                <button
                  onClick={() => copyText("curl -sSfL https://vortcoin.org/sync-vortcoin-repos.sh | bash", "sync-cmd")}
                  className="px-3 py-1.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  {copiedId === "sync-cmd" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === "sync-cmd" ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Matrix comparison table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left font-mono text-xs border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-black/60 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Target Component</th>
                    <th className="p-3">Repository Path</th>
                    <th className="p-3">Protocol Match in handler.rs</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-300 bg-black/30">
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Mobile Signer</td>
                    <td className="p-3"><code>src/crypto/signer.js</code></td>
                    <td className="p-3 text-[11px] text-slate-400">Zero-whitespace serialization, 32-byte Ed25519 Pubkey</td>
                    <td className="p-3"><span className="text-emerald-400 font-bold">● Harmonized</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Mobile RPC Client</td>
                    <td className="p-3"><code>src/services/rpcClient.js</code></td>
                    <td className="p-3 text-[11px] text-slate-400"><code>broadcast_transaction</code> & <code>get_account_details</code></td>
                    <td className="p-3"><span className="text-emerald-400 font-bold">● Harmonized</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Tauri Native Miner</td>
                    <td className="p-3"><code>src-tauri/src/main.rs</code></td>
                    <td className="p-3 text-[11px] text-slate-400"><code>submit_web_share</code> with <code>wallet + nonce</code></td>
                    <td className="p-3"><span className="text-emerald-400 font-bold">● Harmonized</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Genesis Node</td>
                    <td className="p-3"><code>Dedicated Ubuntu VPS</code></td>
                    <td className="p-3 text-[11px] text-slate-400">L1 Sled DB + P2P Port 3690 + Warp RPC 8545</td>
                    <td className="p-3"><span className="text-emerald-400 font-bold">● 24/7 Live</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
