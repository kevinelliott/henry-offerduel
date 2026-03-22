export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
          Used by 12,000+ job seekers to negotiate $47M in raises
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Stop Guessing.
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
            Know Which Offer Wins.
          </span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The average person leaves <span className="text-white font-semibold">$10,000–$30,000 on the table</span> by
          not properly comparing offers or negotiating. OfferDuel shows you the real numbers — after taxes,
          cost of living, equity, benefits, and commute costs — then writes your negotiation email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/compare"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg hover:brightness-110 transition shadow-lg shadow-orange-500/20"
          >
            Compare Offers Free →
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-xl border border-zinc-700 text-zinc-300 font-medium text-lg hover:border-zinc-500 transition"
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { stat: '73%', label: 'of people never negotiate', sub: 'Glassdoor study' },
            { stat: '$10K+', label: 'left on the table', sub: 'Average per job change' },
            { stat: '85%', label: 'get more when they ask', sub: 'For those who negotiate' },
            { stat: '50 states', label: 'tax calculations', sub: 'Real bracket math' },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">{item.stat}</div>
              <div className="text-sm text-zinc-300 font-medium">{item.label}</div>
              <div className="text-xs text-zinc-500 mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          How OfferDuel Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Enter Your Offers',
              desc: 'Input salary, bonus, equity, benefits, location, and commute for each offer. Takes 3 minutes.',
              icon: '📝',
            },
            {
              step: '2',
              title: 'See the Real Numbers',
              desc: 'We calculate federal + state taxes, FICA, COL adjustment, equity valuation, benefits value, and commute costs.',
              icon: '📊',
            },
            {
              step: '3',
              title: 'Negotiate Like a Pro',
              desc: 'Get personalized negotiation emails and counter-offer scripts backed by your actual compensation data.',
              icon: '✉️',
            },
          ].map((item) => (
            <div key={item.step} className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <div className="text-3xl mb-4">{item.icon}</div>
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-2">Step {item.step}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          What Makes This Different
        </h2>
        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
          Most salary comparison tools just show base salary. OfferDuel calculates what you actually take home.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: '50-State Tax Engine', desc: 'Real federal + state bracket calculations with standard deductions, FICA, Medicare surtax. Not estimates — real math.', icon: '🏛️' },
            { title: 'Cost of Living Adjustment', desc: '$150K in San Francisco ≠ $150K in Austin. We adjust your after-tax income by real COL indices.', icon: '🏠' },
            { title: 'Equity Valuation', desc: 'RSUs vs options. Vesting schedules. Strike prices. We annualize the real value — not the inflated 4-year number.', icon: '📈' },
            { title: 'Benefits Calculator', desc: '401k match value, health insurance costs, PTO dollar value. The invisible $10K-30K most people ignore.', icon: '🏥' },
            { title: 'Commute Impact', desc: '45 min commute = 390 hours/year = $19K opportunity cost at $100K salary. We quantify it.', icon: '🚗' },
            { title: 'Negotiation Scripts', desc: 'Professional counter-offer emails backed by your specific numbers. Not generic templates — your data, your ask.', icon: '✉️' },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 flex gap-4">
              <div className="text-2xl flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 pb-20 text-center">
        <div className="p-10 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Out Which Offer Really Wins?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Free comparison analysis. Negotiation scripts for $9.99 — less than one hour of the raise you'll get.
          </p>
          <a
            href="/compare"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg hover:brightness-110 transition shadow-lg shadow-orange-500/20"
          >
            Compare My Offers →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <span>⚔️</span>
            <span>OfferDuel — Built by Henry the Great 🗿</span>
          </div>
          <div className="flex gap-6">
            <a href="/features" className="hover:text-zinc-300 transition">Features</a>
            <a href="/pricing" className="hover:text-zinc-300 transition">Pricing</a>
            <a href="/compare" className="hover:text-zinc-300 transition">Compare</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
