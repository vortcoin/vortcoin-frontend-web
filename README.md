# VORTCOIN Layer-1 Portal & Explorer Web

Official decentralized web portal, blockchain explorer, developer JSON-RPC gateway hub, and in-browser Web Miner for **VORTCOIN (VORT)** — a Layer-1 blockchain powered by Proof of Adaptive Velocity (PoAV), 3,690 Tesla quantum harmonics, and an automated black-hole deflationary burn engine.

---

## Key Modules Included

- **Mainnet Live Dashboard**: Real-time PoAV consensus telemetry, TPS, dynamic difficulty, block generation, and black-hole burn metrics.
- **On-Chain Explorer**: Interactive search by block height, cryptographic block hashes, transaction hashes, and wallet addresses.
- **Official DEX Listing Bridge Outlet**: Verifiable consensus bridge vault (`vortcoin_q_cross_chain_wrapped_bridge_outlet`) for fair launch Uniswap/Raydium liquidity provisioning.
- **Node Operator & Developer Hub**: Complete CLI references, JSON-RPC 2.0 endpoints, Linux systemd daemon configurations, and firewall ports (P2P 3690, RPC 8545).
- **In-Browser Web Miner**: Multi-threaded client-side Web Worker PoAV mining engine directly executing inside standard modern browsers.
- **Download & Onboarding Center**: Official distribution links and SHA-256 verified manifests for the Android APK, Desktop Tauri Suite, and headless Linux server setup scripts.
- **Technical Whitepaper (v3.6.9)**: In-depth documentation covering tokenomics, PoAV consensus, and fair launch economics.

---

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Bundler & Dev Server**: Vite
- **Styling & Design System**: Tailwind CSS
- **Motion & Interactions**: `motion/react`
- **Iconography**: Lucide React
- **Cryptography & Encoding**: BIP-39, SHA-256, Quantum Tesla 3,690 harmonic math

---

## Getting Started

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn or pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/vortcoin/vortcoin-frontend-web.git
cd vortcoin-frontend-web

# Install dependencies
npm install
```

### 3. Development Mode
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 4. Production Build
```bash
npm run build
```
Static production assets will be built into the `dist/` directory.

---

## Consensus & Network Constants

| Parameter | Value | Description |
| :--- | :--- | :--- |
| **P2P Gossip Port** | `3690` | P2P daemon node synchronization |
| **RPC JSON Gateway** | `8545` | Standard JSON-RPC 2.0 endpoint |
| **Genesis Hash** | `0x369a489f0293cb837190e2fa8372b01488c994ad...` | Network Genesis Anchor |
| **Listing Bridge Outlet** | `vortcoin_q_cross_chain_wrapped_bridge_outlet` | Official Initial DEX Listing Vault |
| **Burn Address** | `vort_q_blackhole_burn_address_0000000000000000` | Deflationary Gas Fee Sink (36.9%) |

---

## License
This repository is open-sourced under the MIT License.