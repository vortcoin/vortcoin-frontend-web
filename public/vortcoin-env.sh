#!/usr/bin/env bash
# =========================================================================
# 🌀 VORTCOIN (VORT) SHELL ENVIRONMENT & DUAL-COMMAND SYNCHRONIZER
# Source this file to enable instant access:
#    source vortcoin-env.sh   (or: . vortcoin-env.sh)
# =========================================================================

# Expose local binary paths
export PATH="$PATH:/usr/local/bin:$HOME/.vortcoin/bin:$HOME/.cargo/bin"

# Ensure both 'vortcoin' and 'vortcoin-cli' work seamlessly
if command -v vortcoin-cli &> /dev/null && ! command -v vortcoin &> /dev/null; then
    alias vortcoin="vortcoin-cli"
elif command -v vortcoin &> /dev/null && ! command -v vortcoin-cli &> /dev/null; then
    alias vortcoin-cli="vortcoin"
fi

# Protocol Environment Variables
export VORTCOIN_HOME="$HOME/.vortcoin"
export VORTCOIN_GENESIS="$HOME/.vortcoin/genesis.json"
export VORTCOIN_RPC_URL="http://127.0.0.1:8545"
export VORTCOIN_P2P_PORT="3690"
export VORTCOIN_RPC_PORT="8545"

echo "================================================================="
echo "🌀 VORTCOIN L1 Environment Loaded Successfully!"
echo "   Dual CLI Commands Ready: 'vortcoin' & 'vortcoin-cli'"
echo "   Active Genesis Manifest: $VORTCOIN_GENESIS"
echo "================================================================="
