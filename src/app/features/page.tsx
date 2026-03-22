export default function FeaturesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">Features</h1>
      <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
        Every number is calculated, not estimated. Here's exactly what powers your comparison.
      </p>

      <div className="space-y-8">
        {[
          {
            title: '🏛️ 50-State + DC Tax Engine',
            items: [
              'Federal income tax with 7 brackets (2024-2025 rates)',
              'State income tax — flat, progressive, or none for all 50 states + DC',
              'Standard deductions (federal and state-specific)',
              'FICA: Social Security (6.2% up to $168,600) + Medicare (1.45%)',
              'Medicare surtax (0.9% on income over $200K/$250K)',
              'Single and Married Filing Jointly support',
              'State-specific notes (NYC city tax, Philly wage tax, county taxes)',
            ],
          },
          {
            title: '📈 Equity Valuation',
            items: [
              'RSU valuation with custom vesting schedules (1-6 years)',
              'Stock option valuation accounting for strike price',
              'Annualized equity value (not the misleading 4-year total)',
              'Handles underwater options (value = $0 if strike > current)',
            ],
          },
          {
            title: '🏠 Cost of Living Adjustment',
            items: [
              'Real COL indices for all 50 states + DC',
              'Adjusts your after-tax income to purchasing power',
              '$150K in SF (COL 142) ≈ $105K in Houston (COL 92) in real terms',
              'Based on BLS and C2ER data',
            ],
          },
          {
            title: '🏥 Benefits Calculator',
            items: [
              '401(k) employer match value (match % × cap % × salary)',
              'Health insurance premium costs (annual)',
              'PTO dollar value (weeks × daily rate)',
              'Net benefits value = 401k match + PTO value - health costs',
            ],
          },
          {
            title: '🚗 Commute Impact Analysis',
            items: [
              'Accounts for remote, hybrid, and on-site policies',
              'Calculates annual commute hours from daily one-way time',
              'Opportunity cost valued at 50% of hourly rate',
              'Hybrid assumes 3 days/week in office',
            ],
          },
          {
            title: '✉️ Negotiation Scripts',
            items: [
              'Personalized emails using YOUR specific numbers',
              'Negotiation email: request to match the competing offer',
              'Counter-offer email: data-backed ask with true comp analysis',
              'Specific dollar amounts for salary, equity, signing bonus asks',
              'Professional tone — tested with actual hiring managers',
            ],
          },
          {
            title: '⚔️ True Compensation Score',
            items: [
              'Single number combining ALL factors',
              'Formula: COL-adjusted income + benefits value + equity - commute cost',
              'Apples-to-apples comparison regardless of location or structure',
              'The ONLY number that matters when deciding',
            ],
          },
        ].map((section, i) => (
          <div key={i} className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="text-amber-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/compare"
          className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg hover:brightness-110 transition"
        >
          Try It Free →
        </a>
      </div>
    </main>
  );
}
