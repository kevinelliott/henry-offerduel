import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OfferDuel — Job Offer Comparison & Negotiation Toolkit",
  description: "Compare two job offers side-by-side with real tax calculations, cost of living adjustments, equity valuation, and benefits analysis. Get negotiation scripts that actually work.",
  openGraph: {
    title: "OfferDuel — Stop Guessing. Know Which Offer Wins.",
    description: "Free job offer comparison with 50-state tax calculations, COL adjustment, equity valuation, and AI-generated negotiation emails.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <nav className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="text-2xl">⚔️</span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">OfferDuel</span>
            </a>
            <div className="flex items-center gap-6 text-sm">
              <a href="/compare" className="text-zinc-400 hover:text-white transition">Compare</a>
              <a href="/features" className="text-zinc-400 hover:text-white transition">Features</a>
              <a href="/pricing" className="text-zinc-400 hover:text-white transition">Pricing</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
