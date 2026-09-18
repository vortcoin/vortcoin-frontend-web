/**
 * VORTCOIN PoAV High-Performance Web Worker Thread Asset
 * Proof of Adaptive Velocity (PoAV) In-Browser Hashing Core
 */

let isRunning = false;
let minerAddress = "vort_q_369a000000000000000000000000000000000000";
let targetDifficulty = 2; // Leading zero hex nibbles required
let threadId = 0;
let blockHeight = 4220;
let prevHash = "0x369a489f0293cb837190e2fa8372b01488c994ad51e893c76ef4829377482910";

// Fast SHA-256 implementation inside Worker for high-throughput hashing
function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let lengthProperty = 'length';
  let i, j;
  let result = '';

  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  
  let hash = sha256.h = sha256.h || [];
  let k = sha256.k = sha256.k || [];
  let primeCounter = k[lengthProperty];

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1/3) * maxWord) | 0;
    }
  }
  
  ascii += '\x80';
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return;
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength) | 0;
  
  for (j = 0; j < words[lengthProperty];) {
    const w = words.slice(j, j += 16);
    const oldHash = hash;
    hash = hash.slice(0, 8);
    
    for (i = 0; i < 64; i++) {
      const i2 = i + j;
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];
      const temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & hash[5]) ^ ((~e) & hash[6]))
        + k[i]
        + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0
        );
      const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  
  for (i = 0; i < 8; i++) {
    for (let i2 = 3; i2 >= 0; i2--) {
      const c = (hash[i] >> (i2 * 8)) & 255;
      result += ((c < 16) ? '0' : '') + c.toString(16);
    }
  }
  return result;
}

let nonce = Math.floor(Math.random() * 100000000);
let totalHashes = 0;
let lastTelemetryTime = performance.now();
let hashesSinceLastTelemetry = 0;

function mineLoop() {
  if (!isRunning) return;

  const batchSize = 120;
  const targetPrefix = "0".repeat(targetDifficulty);

  for (let i = 0; i < batchSize; i++) {
    nonce++;
    totalHashes++;
    hashesSinceLastTelemetry++;

    const payload = `${prevHash}:${blockHeight}:${minerAddress}:${nonce}:${threadId}`;
    const hash = sha256(payload);

    if (hash && hash.startsWith(targetPrefix)) {
      // Valid share found!
      self.postMessage({
        type: "SHARE_FOUND",
        data: {
          threadId,
          nonce,
          hash: "0x" + hash,
          blockHeight,
          minerAddress,
          timestamp: Date.now(),
          reward: 0.369 // Micro share reward in VORT
        }
      });
    }
  }

  const now = performance.now();
  if (now - lastTelemetryTime >= 350) {
    const elapsedSec = (now - lastTelemetryTime) / 1000;
    const hashrate = Math.round(hashesSinceLastTelemetry / elapsedSec);
    self.postMessage({
      type: "TELEMETRY",
      data: {
        threadId,
        hashrate,
        totalHashes,
        currentNonce: nonce
      }
    });
    lastTelemetryTime = now;
    hashesSinceLastTelemetry = 0;
  }

  // Next tick
  setTimeout(mineLoop, 0);
}

self.onmessage = function (e) {
  const { action, data } = e.data;
  if (action === "START") {
    minerAddress = data.minerAddress || minerAddress;
    targetDifficulty = data.difficulty || 2;
    threadId = data.threadId || 0;
    blockHeight = data.blockHeight || blockHeight;
    prevHash = data.prevHash || prevHash;
    isRunning = true;
    lastTelemetryTime = performance.now();
    hashesSinceLastTelemetry = 0;
    mineLoop();
  } else if (action === "STOP") {
    isRunning = false;
  } else if (action === "UPDATE_DIFF") {
    targetDifficulty = data.difficulty;
  }
};
