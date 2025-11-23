"use client";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import ChatWidget from "../components/Chatwidget";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navigation isScrolled={isScrolled} />

      {/* Global Animated Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10">{children}</div>

      <ChatWidget />
    </div>
  );
}
