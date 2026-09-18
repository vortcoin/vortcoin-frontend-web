/**
 * Unified Environmental Network Manifest for VORTCOIN (VORT)
 * Tri-Core Layer-1 Blockchain Architecture
 */

export interface VortNetworkConfig {
  NAME: string;
  SYMBOL: string;
  NATIVE_DECIMALS: number;
  MAX_SUPPLY_VORT: number;
  BLOCK_TIME_SECONDS: number;
  HALVING_CYCLE_BLOCKS: number;
  INITIAL_BLOCK_REWARD: number;
  GAS_BURN_PERCENTAGE: number;
  CREATION_BURN_TAX_VORT: number;
  PBKDF2_TESLA_ITERATIONS: number;
  P2P_PORT: number;
  RPC_PORT: number;
  RPC_URL: string;
  POLLING_INTERVAL_MS: number;
  SERVER_NODE_INSTALL_COMMAND: string;
  QUICK_CLIENT_INSTALL_COMMAND: string;
  MINER_INSTALL_COMMAND: string;
  BASH_ENV_COMMAND: string;
  GITHUB_ORG: string;
  GENESIS_TIMESTAMP: string;
  GENESIS_HASH: string;
  BLACK_HOLE_BURN_ADDRESS: string;
  CROSS_CHAIN_BRIDGE_OUTLET: string;
  DOWNLOADS: {
    APK: {
      VERSION: string;
      FILE_NAME: string;
      FILE_SIZE: string;
      MIN_OS: string;
      SHA256: string;
      RELEASE_DATE: string;
    };
    DESKTOP: {
      VERSION: string;
      WINDOWS: { FILE_NAME: string; FILE_SIZE: string; ARCH: string };
      MACOS: { FILE_NAME: string; FILE_SIZE: string; ARCH: string };
      LINUX: { FILE_NAME: string; FILE_SIZE: string; ARCH: string };
    };
    CLI: {
      VERSION: string;
      FILE_NAME: string;
      FILE_SIZE: string;
      TARGET: string;
    };
  };
  HARDWARE_REQUIREMENTS: {
    CPU: string;
    RAM: string;
    STORAGE: string;
    OS: string;
  };
}

export const VORT_ENVIRONMENT: VortNetworkConfig = {
  NAME: "VORTCOIN",
  SYMBOL: "VORT",
  NATIVE_DECIMALS: 9,
  MAX_SUPPLY_VORT: 36900000,
  BLOCK_TIME_SECONDS: 30,
  HALVING_CYCLE_BLOCKS: 3690000,
  INITIAL_BLOCK_REWARD: 10.0,
  GAS_BURN_PERCENTAGE: 36.9,
  CREATION_BURN_TAX_VORT: 36.9,
  PBKDF2_TESLA_ITERATIONS: 3690,
  P2P_PORT: 3690,
  RPC_PORT: 8545,
  RPC_URL: "https://rpc.vortcoin.org",
  POLLING_INTERVAL_MS: 3690,
  SERVER_NODE_INSTALL_COMMAND: "curl -sSfL https://vortcoin.org/vortcoin-node.sh | bash",
  QUICK_CLIENT_INSTALL_COMMAND: "curl -sSfL https://vortcoin.org/install-node.sh | bash",
  MINER_INSTALL_COMMAND: "curl -sSfL https://vortcoin.org/vortcoin-node.sh | bash",
  BASH_ENV_COMMAND: "source vortcoin-env.sh",
  GITHUB_ORG: "https://github.com/vortcoin",
  GENESIS_TIMESTAMP: "2026-03-09T00:00:00Z",
  GENESIS_HASH: "0x369000000000000000000000000000000000000000000000000000000000369a",
  BLACK_HOLE_BURN_ADDRESS: "vort_q_000000000000000000000000000000000000dead",
  CROSS_CHAIN_BRIDGE_OUTLET: "vortcoin_q_cross_chain_wrapped_bridge_outlet",
  DOWNLOADS: {
    APK: {
      VERSION: "1.3.69",
      FILE_NAME: "vortcoin-node-v1.3.69-release.apk",
      FILE_SIZE: "16.4 MB",
      MIN_OS: "Android 8.0+ (Oreo)",
      SHA256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      RELEASE_DATE: "2026-03-09",
    },
    DESKTOP: {
      VERSION: "1.3.69",
      WINDOWS: {
        FILE_NAME: "Vortcoin-Miner-Tauri-v1.3.69-x64.msi",
        FILE_SIZE: "24.8 MB",
        ARCH: "Windows 10 / 11 (64-bit)",
      },
      MACOS: {
        FILE_NAME: "Vortcoin-Miner-Tauri-v1.3.69-Universal.dmg",
        FILE_SIZE: "29.2 MB",
        ARCH: "macOS 12+ (Apple Silicon & Intel)",
      },
      LINUX: {
        FILE_NAME: "Vortcoin-Miner-Tauri-v1.3.69-amd64.AppImage",
        FILE_SIZE: "28.5 MB",
        ARCH: "Ubuntu / Debian / Arch / Fedora x86_64",
      },
    },
    CLI: {
      VERSION: "1.3.69",
      FILE_NAME: "vortcoin-core-daemon-v1.3.69-linux-x86_64.tar.gz",
      FILE_SIZE: "12.1 MB",
      TARGET: "x86_64-unknown-linux-gnu (Ubuntu 22.04 / 24.04 LTS)",
    },
  },
  HARDWARE_REQUIREMENTS: {
    CPU: "1 vCPU Core (Standard Virtual CPU or higher)",
    RAM: "1 GB RAM or higher",
    STORAGE: "20 GB SSD / NVMe (High IOPS for localized Sled DB ledger operations)",
    OS: "Ubuntu 22.04 LTS / Ubuntu 24.04 LTS (Bare-metal or Cloud VPS)",
  },
};
