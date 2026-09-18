#!/usr/bin/env bash
# ==============================================================================
# VORTCOIN (VORT) Protocol Harmonization & Auto-Patching Script
# Synchronizes: Mobile Wallet APK & Desktop/Web Miner with Dedicated L1 handler.rs
# Official Repository: https://github.com/vortcoin
# ==============================================================================

set -e

GOLD='\033[1;33m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GOLD}"
echo "=================================================================="
echo "    VORTCOIN (VORT) AUTOMATED REPO SYNCHRONIZATION SCRIPT         "
echo "      Aligning Mobile Wallet & Desktop Miner with handler.rs     "
echo -e "==================================================================${NC}"

echo -e "${CYAN}[*] Target RPC Endpoint: https://rpc.vortcoin.org${NC}"
echo -e "${CYAN}[*] Cryptography Standard: Ed25519 (Signatures) + Tesla 3-6-9 Nano Precision${NC}"
echo ""

# ------------------------------------------------------------------------------
# 1. PATCH: Mobile Wallet (vortcoin-wallet-mobile)
# ------------------------------------------------------------------------------
MOBILE_DIR="vortcoin-wallet-mobile"
if [ -d "$MOBILE_DIR" ] || [ -d "src/crypto" ]; then
    TARGET_MOBILE="."
    [ -d "$MOBILE_DIR" ] && TARGET_MOBILE="$MOBILE_DIR"
    echo -e "${GREEN}[+] Patching Mobile Wallet in: $TARGET_MOBILE${NC}"

    mkdir -p "$TARGET_MOBILE/src/crypto"
    mkdir -p "$TARGET_MOBILE/src/services"

    # Write Harmonized signer.js
    cat << 'EOF' > "$TARGET_MOBILE/src/crypto/signer.js"
import * as tweetnacl from 'tweetnacl';
import { Buffer } from 'buffer';

/**
 * Deterministic serialization matching Rust handler.rs format!() exactly:
 * {"from":"<64_hex_pubkey>","to":"vort_q_<addr>","amount_nano":<int>,"timestamp":<int>}
 */
export function serializePayloadForRust(txPayload) {
    const amountNano = typeof txPayload.amount_nano === 'bigint' || typeof txPayload.amount_nano === 'number'
        ? BigInt(txPayload.amount_nano).toString()
        : BigInt(Math.round(Number(txPayload.amount) * 1e9)).toString();

    // SANGAT PENTING: Tanpa spasi setelah tanda : agar cocok karakter-demi-karakter dengan Rust format!()
    return `{"from":"${txPayload.from}","to":"${txPayload.to}","amount_nano":${amountNano},"timestamp":${Math.floor(txPayload.timestamp)}}`;
}

/**
 * Signs the transaction payload offline inside mobile secure memory
 */
export function signTransactionLocally(txPayload, privateKeyHex) {
    const rawMessage = serializePayloadForRust(txPayload);
    const msgBytes = Buffer.from(rawMessage, 'utf-8');
    const privKeyBytes = Buffer.from(privateKeyHex, 'hex');

    const signatureBytes = tweetnacl.sign.detached(msgBytes, privKeyBytes);
    return {
        signatureHex: Buffer.from(signatureBytes).toString('hex'),
        serializedMessage: rawMessage
    };
}
EOF

    # Write Harmonized rpcClient.js
    cat << 'EOF' > "$TARGET_MOBILE/src/services/rpcClient.js"
import { signTransactionLocally } from '../crypto/signer';

const RPC_ENDPOINT = "https://rpc.vortcoin.org";

/**
 * Broadcast Ed25519-signed transfer to Dedicated L1 L1 Node
 */
export async function broadcastVortTransfer(recipientAddress, amountVort, userWallet) {
    const timestamp = Date.now();
    const amountNano = Math.round(Number(amountVort) * 1_000_000_000);

    const txPayload = {
        from: userWallet.rawPublicKeyHex, // Wajib 64-character HEX (32 bytes Ed25519 Pubkey)
        to: recipientAddress,             // Format vort_q_...
        amount_nano: amountNano,
        timestamp: timestamp
    };

    const { signatureHex } = signTransactionLocally(txPayload, userWallet.privateKeyHex);

    const response = await fetch(RPC_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: "broadcast_transaction",
            params: {
                raw_tx: signatureHex,
                from: txPayload.from,
                to: txPayload.to,
                amount_nano: txPayload.amount_nano,
                timestamp: txPayload.timestamp
            },
            id: 369
        })
    });

    return await response.json();
}

/**
 * Query on-chain wallet balance from Sled DB
 */
export async function getAccountDetails(walletAddress) {
    const response = await fetch(RPC_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: "get_account_details",
            params: {
                address: walletAddress
            },
            id: 369
        })
    });

    return await response.json();
}
EOF
    echo -e "${GREEN}[✔] Mobile Wallet files patched successfully!${NC}"
fi

# ------------------------------------------------------------------------------
# 2. PATCH: Desktop / Web Miner (vortcoin-web-miner)
# ------------------------------------------------------------------------------
MINER_DIR="vortcoin-web-miner"
if [ -d "$MINER_DIR" ] || [ -d "src-tauri" ]; then
    TARGET_MINER="."
    [ -d "$MINER_DIR" ] && TARGET_MINER="$MINER_DIR"
    echo -e "${GREEN}[+] Patching Desktop/Web Miner in: $TARGET_MINER${NC}"

    mkdir -p "$TARGET_MINER/src-tauri/src"

    cat << 'EOF' > "$TARGET_MINER/src-tauri/src/main.rs"
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::thread;
use md5;

static MINING_ACTIVE: AtomicBool = AtomicBool::new(false);

#[tauri::command]
async fn toggle_native_miner(miner_wallet: String, threads: u8) -> Result<String, String> {
    if MINING_ACTIVE.load(Ordering::SeqCst) {
        MINING_ACTIVE.store(false, Ordering::SeqCst);
        return Ok("MINING_PAUSED_SUCCESSFULLY".to_string());
    }

    MINING_ACTIVE.store(true, Ordering::SeqCst);
    let mining_flag = Arc::new(&MINING_ACTIVE);

    for id in 0..threads {
        let flag = mining_flag.clone();
        let wallet = miner_wallet.clone();

        thread::spawn(move || {
            let mut nonce: u64 = id as u64;
            println!("[Tauri Miner] Thread #{} active.", id);

            while flag.load(Ordering::SeqCst) {
                // SINKRON DENGAN handler.rs: format!("{}{}", worker_wallet, nonce)
                let raw_string = format!("{}{}", wallet, nonce);
                let computed_hash = format!("{:x}", md5::compute(raw_string.as_bytes()));

                // Difficulty target 4 zero prefix
                if computed_hash.starts_with("0000") {
                    println!("[SUCCESS] Share found locally by thread #{}! Nonce: {}, Hash: {}", id, nonce, computed_hash);
                    
                    // Dispatch ke RPC Dedicated L1 method submit_web_share
                    let client = reqwest::blocking::Client::new();
                    let payload = serde_json::json!({
                        "jsonrpc": "2.0",
                        "method": "submit_web_share",
                        "params": {
                            "worker_wallet": wallet,
                            "nonce": nonce,
                            "difficulty": 4
                        },
                        "id": 369
                    });

                    let _ = client.post("https://rpc.vortcoin.org")
                        .json(&payload)
                        .send();
                }
                nonce += threads as u64;
            }
        });
    }

    Ok("MINING_STARTED_SUCCESSFULLY".to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![toggle_native_miner])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
EOF
    echo -e "${GREEN}[✔] Desktop Miner main.rs patched successfully!${NC}"
fi

echo ""
echo -e "${GOLD}==================================================================${NC}"
echo -e "${GOLD}✔ ALL PROTOCOLS ARE NOW SYNCHRONIZED WITH L1 CORE HANDLER.RS!    ${NC}"
echo -e "${GOLD}==================================================================${NC}"
