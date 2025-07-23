"use client";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm flex items-center justify-between px-4 py-2 md:px-8">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
        <span className="text-xl font-bold text-blue-700">IBPS Mock</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="/" className="text-blue-700 font-semibold hover:underline">Dashboard</a>
      </div>
    </nav>
  );
} 