/**
 * VORTCOIN (VORT) Official Portal & Node Ecosystem
 * Tri-Core Layer-1 Blockchain Architecture
 */

import React, { useState, useEffect, useCallback } from "react";
import { PageTab, ActiveDomain } from "./types";
import { VORT_ENVIRONMENT } from "../config";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { DownloadPage } from "./pages/download";
import { WhitepaperPage } from "./pages/Whitepaper";
import { DeveloperPage } from "./pages/Developer";
import { ExplorerPage } from "./pages/Explorer";

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>("home");
  const [activeDomain, setActiveDomain] = useState<ActiveDomain>("vortcoin.org");
  const [liveBlockHeight, setLiveBlockHeight] = useState<number>(4292);

  // Real-time synchronization with Contabo L1 Node RPC Gateway (https://rpc.vortcoin.org)
  useEffect(() => {
    let isMounted = true;

    const syncWithRpcNode = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch(VORT_ENVIRONMENT.RPC_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "get_status",
            params: {},
            id: 369,
          }),
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (isMounted && data.result?.current_block_height) {
            setLiveBlockHeight(data.result.current_block_height);
          }
        }
      } catch {
        // Fallback ticker continues automatically if offline
      }
    };

    // Initial check on load
    syncWithRpcNode();

    // Poll RPC every 10 seconds for real block changes
    const rpcTimer = setInterval(syncWithRpcNode, 10000);

    // Dynamic fallback clock: Increment every 30 seconds if RPC is buffering
    const fallbackTimer = setInterval(() => {
      setLiveBlockHeight((prev) => prev + 1);
    }, 30000);

    return () => {
      isMounted = false;
      clearInterval(rpcTimer);
      clearInterval(fallbackTimer);
    };
  }, []);

  // Parse path or hash to resolve active tab
  const resolveRouteFromLocation = useCallback(() => {
    const hostname = typeof window !== "undefined" ? window.location.hostname : "";
    const rawPath = typeof window !== "undefined" ? window.location.pathname.toLowerCase() : "";
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "").toLowerCase() : "";

    // If accessed via explorer.vortcoin.org subdomain
    if (hostname.startsWith("explorer.")) {
      setActiveTab("explorer");
      setActiveDomain("explorer.vortcoin.org");
      return;
    }

    // Check pathname or hash
    if (
      rawPath.includes("whitepaper") || 
      hash === "whitepaper"
    ) {
      setActiveTab("whitepaper");
      setActiveDomain("vortcoin.org");
    } else if (
      rawPath.includes("download") || 
      rawPath.includes("mininghub") || 
      hash === "download" || 
      hash === "mininghub"
    ) {
      setActiveTab("download");
      setActiveDomain("vortcoin.org");
    } else if (
      rawPath.includes("developer") || 
      rawPath.includes("dev") || 
      hash === "developer" || 
      hash === "dev"
    ) {
      setActiveTab("developer");
      setActiveDomain("vortcoin.org");
    } else if (
      rawPath.includes("explorer") || 
      hash === "explorer"
    ) {
      // If someone accesses /explorer on vortcoin.org, redirect to official subdomain in production
      if (typeof window !== "undefined" && hostname.includes("vortcoin.org") && !hostname.startsWith("explorer")) {
        window.location.href = "https://explorer.vortcoin.org";
        return;
      }
      setActiveTab("explorer");
      setActiveDomain("explorer.vortcoin.org");
    } else {
      setActiveTab("home");
      setActiveDomain("vortcoin.org");
    }
  }, []);

  // Sync initial URL on mount and listen to popstate/hashchange
  useEffect(() => {
    resolveRouteFromLocation();

    const handlePopState = () => {
      resolveRouteFromLocation();
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, [resolveRouteFromLocation]);

  // Navigate function that updates browser URL bar seamlessly
  const navigateTo = (tab: PageTab) => {
    if (tab === "explorer") {
      if (typeof window !== "undefined" && window.location.hostname.includes("vortcoin.org") && !window.location.hostname.startsWith("explorer")) {
        window.location.href = "https://explorer.vortcoin.org";
        return;
      }
      setActiveTab("explorer");
      setActiveDomain("explorer.vortcoin.org");
    } else {
      setActiveTab(tab);
      setActiveDomain("vortcoin.org");
    }

    // Update URL bar
    if (typeof window !== "undefined" && window.history) {
      let targetPath = "/";
      if (tab === "explorer" || activeDomain === "explorer.vortcoin.org") {
        targetPath = "/";
      } else if (tab === "whitepaper") {
        targetPath = "/whitepaper";
      } else if (tab === "download") {
        targetPath = "/download&mininghub";
      } else if (tab === "developer") {
        targetPath = "/developer";
      }

      // Only push if current path is different
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, "", targetPath);
      }
    }
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, activeDomain]);

  return (
    <div className="min-h-screen bg-[#08090D] text-[#E2E8F0] flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Universal Top Header & Portal Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateTo}
        activeDomain={activeDomain}
        setActiveDomain={setActiveDomain}
        liveBlockHeight={liveBlockHeight}
      />

      {/* Main View Area constrained to max-w-[1920px] */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto">
        {activeDomain === "explorer.vortcoin.org" || activeTab === "explorer" ? (
          <ExplorerPage
            liveBlockHeight={liveBlockHeight}
            setLiveBlockHeight={setLiveBlockHeight}
            onSwitchDomain={setActiveDomain}
          />
        ) : activeTab === "home" ? (
          <Home
            setActiveTab={navigateTo}
            setActiveDomain={setActiveDomain}
            liveBlockHeight={liveBlockHeight}
          />
        ) : activeTab === "download" ? (
          <DownloadPage />
        ) : activeTab === "whitepaper" ? (
          <WhitepaperPage />
        ) : activeTab === "developer" ? (
          <DeveloperPage />
        ) : null}
      </main>

      {/* Unified Global Footer */}
      <Footer
        setActiveTab={navigateTo}
        setActiveDomain={setActiveDomain}
        activeDomain={activeDomain}
      />
    </div>
  );
}
