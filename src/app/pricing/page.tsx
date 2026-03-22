export default function PricingPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">Pricing</h1>
      <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
        The comparison is free. The negotiation kit pays for itself in 5 minutes.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Free */}
        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <div className="text-sm font-medium text-zinc-400 mb-2">Free</div>
          <div className="text-4xl font-bold mb-1">$0</div>
          <div className="text-zinc-500 text-sm mb-6">Forever free</div>
          <ul className="space-y-3 mb-8">
            {[
              'Side-by-side offer comparison',
              '50-state tax calculations',
              'Cost of living adjustment',
              'Equity valuation (RSUs + options)',
              'Benefits & commute analysis',
              'True compensation score',
              'Key insights & highlights',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                <span className="text-green-400">✓</span> {item}
              </li>
            ))}
          </ul>
          <a
            href="/compare"
            className="block text-center px-6 py-3 rounded-lg border border-zinc-700 text-zinc-300 font-medium hover:border-zinc-500 transition"
          >
            Compare Now
          </a>
        </div>

        {/* Pro */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-amber-500/5 to-transparent border border-amber-500/20 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
            MOST VALUE
          </div>
          <div className="text-sm font-medium text-amber-400 mb-2">Negotiation Kit</div>
          <div className="text-4xl font-bold mb-1">$9.99</div>
          <div className="text-zinc-500 text-sm mb-6">One-time purchase</div>
          <ul className="space-y-3 mb-8">
            {[
              'Everything in Free',
              '3 customized negotiation emails',
              'Counter-offer email with data',
              'Signing bonus request template',
              'Equity negotiation script',
              'Professional PDF comparison report',
              '30-day negotiation timeline',
              'Salary research summary',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                <span className="text-amber-400">✓</span> {item}
              </li>
            ))}
          </ul>
          <a
            href="/compare"
            className="block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:brightness-110 transition"
          >
            Get Started →
          </a>
          <p className="text-xs text-zinc-500 text-center mt-3">
            Average user negotiates $8,200 more. That's 820x ROI.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-20 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">FAQ</h2>
        <div className="space-y-6">
          {[
            {
              q: 'Is the comparison really free?',
              a: 'Yes. Full side-by-side comparison with taxes, COL, equity, benefits, commute — completely free. No signup required. No data stored.',
            },
            {
              q: 'How accurate are the tax calculations?',
              a: 'We use 2024-2025 federal brackets, real state tax rates for all 50 states + DC, FICA calculations including Medicare surtax, and standard deductions. These are the same calculations a CPA would run.',
            },
            {
              q: 'What do I get for $9.99?',
              a: 'Three personalized negotiation emails (not templates — they use YOUR specific numbers), a professional PDF comparison report, salary research data, and a 30-day negotiation timeline. One-time purchase, no subscription.',
            },
            {
              q: 'Will this actually help me negotiate more money?',
              a: 'Glassdoor data shows 85% of people who negotiate get more. The average successful negotiation yields $5,000-$10,000+. Having specific, data-backed numbers makes your ask credible. A $9.99 tool that helps you get even $1,000 more is a 100x return.',
            },
            {
              q: 'Is my data stored anywhere?',
              a: 'No. All calculations happen in your browser. Nothing is sent to a server. Your salary data never leaves your device.',
            },
          ].map((faq, i) => (
            <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
