"use client";
import React, { useState } from "react";
import Link from "next/link";

// ...existing code...
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <Link href={href} className="group relative inline-block px-3 py-2 text-sm font-medium text-white hover:text-white/90">
        <span className="relative z-10">{children}</span>
        <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/80 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
    </Link>
);

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              {/* simple logo */}
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0" stopColor="#6D28D9" />
                    <stop offset="1" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#g)" />
                <path d="M7 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">MyShop</span>
            </Link>
            <span className="hidden sm:inline-block text-xs text-gray-500">Design • Performance • Trust</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/products" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-black">Products</Link>
            <Link href="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-black">About</Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-black">Contact</Link>
            <Link href="/cart" className="ml-2 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-indigo-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 6M7 13l-2 7h12l-2-7M16 21a1 1 0 11-2 0 1 1 0 012 0zM9 21a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              Cart
            </Link>
          </nav>

          {/* Mobile actions */}
          <div className="sm:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-sidebar"
              onClick={() => setOpen(v => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar (off-canvas) */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 transition-opacity ${open ? "opacity-80 bg-black/50" : "opacity-0"}`}
        />

        {/* sidebar panel: full screen height + bright gradient when open */}
        <aside
          id="mobile-sidebar"
          className={`fixed top-0 left-0 h-screen w-72 shadow-xl transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} bg-gradient-to-b from-indigo-500 via-pink-500 to-yellow-400 text-white`}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
                <defs>
                  <linearGradient id="g2" x1="0" x2="1">
                    <stop offset="0" stopColor="#6D28D9" />
                    <stop offset="1" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#g2)" />
                <path d="M7 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-base font-semibold text-white">MyShop</span>
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="p-2 rounded-md text-white/90 hover:bg-white/10"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="p-4 space-y-2">
            <Link href="/products" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">Products</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">About</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">Contact</Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="mt-1 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white shadow transition hover:bg-white/20">Cart</Link>
          </nav>

          <div className="mt-auto p-4 border-t border-white/20">
            <a href="#" className="text-sm text-white/90">© {new Date().getFullYear()} MyShop</a>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
// ...existing code...