"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity" onClick={closeMenu}>
          Pochi<span className="text-blue-600 dark:text-blue-400">Tool</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/fanbox" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FANBOX</Link>
          <Link href="/skeb" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skeb</Link>
          <Link href="/booth" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">BOOTH</Link>
          <Link href="/price-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">単価計算</Link>
          <Link href="/compare" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Compare</Link>
          <Link href="/guide" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Guide</Link>
        </nav>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {mounted && theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              // X icon
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              // Hamburger icon
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
          <Link href="/fanbox" className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={closeMenu}>FANBOX</Link>
          <Link href="/skeb" className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={closeMenu}>Skeb</Link>
          <Link href="/booth" className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={closeMenu}>BOOTH</Link>
          <Link href="/price-calculator" className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={closeMenu}>単価計算</Link>
          <Link href="/compare" className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={closeMenu}>Compare</Link>
          <Link href="/guide" className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={closeMenu}>Guide</Link>
        </nav>
      )}
    </header>
  );
}
