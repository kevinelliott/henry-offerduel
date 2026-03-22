'use client';

import { useState } from 'react';
import { STATE_DATA } from '@/lib/tax-data';
import { compareOffers, generateNegotiationEmail, generateCounterOfferEmail, type OfferInput, type ComparisonResult } from '@/lib/calculator';

const defaultOffer = (label: string): OfferInput => ({
  label,
  baseSalary: 0,
  signingBonus: 0,
  annualBonus: 10,
  equityValue: 0,
  equityVestingYears: 4,
  equityType: 'rsu',
  optionStrikePrice: 0,
  retirement401kMatch: 50,
  retirement401kMatchCap: 6,
  healthInsurancePremium: 200,
  healthInsuranceDeductible: 1500,
  ptoWeeks: 3,
  remotePolicy: 'hybrid',
  commuteMinutes: 25,
  state: 'CA',
  city: '',
});

const states = Object.entries(STATE_DATA)
  .sort((a, b) => a[1].name.localeCompare(b[1].name))
  .map(([abbr, info]) => ({ abbr, name: info.name }));

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-1">
        {label}
        {hint && <span className="text-zinc-500 font-normal ml-1">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function NumberInput({ value, onChange, prefix, placeholder }: { value: number; onChange: (v: number) => void; prefix?: string; placeholder?: string }) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">{prefix}</span>}
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        placeholder={placeholder}
        className={`w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 ${prefix ? 'pl-7' : ''}`}
      />
    </div>
  );
}

function OfferForm({ offer, onChange, index }: { offer: OfferInput; onChange: (o: OfferInput) => void; index: number }) {
  const colors = index === 0 ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500';
  const borderColor = index === 0 ? 'border-blue-500/30' : 'border-purple-500/30';

  return (
    <div className={`p-6 rounded-xl bg-zinc-900/50 border ${borderColor}`}>
      <div className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${colors} bg-clip-text text-transparent mb-4`}>
        Offer {index + 1}
      </div>

      <div className="space-y-4">
        <Field label="Company Name">
          <input
            type="text"
            value={offer.label}
            onChange={(e) => onChange({ ...offer, label: e.target.value })}
            placeholder={`Company ${index + 1}`}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
          />
        </Field>

        <div className="pt-2 border-t border-zinc-800">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">💰 Compensation</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Base Salary">
              <NumberInput value={offer.baseSalary} onChange={(v) => onChange({ ...offer, baseSalary: v })} prefix="$" placeholder="120000" />
            </Field>
            <Field label="Signing Bonus">
              <NumberInput value={offer.signingBonus} onChange={(v) => onChange({ ...offer, signingBonus: v })} prefix="$" />
            </Field>
            <Field label="Annual Bonus" hint="% of base">
              <NumberInput value={offer.annualBonus} onChange={(v) => onChange({ ...offer, annualBonus: v })} />
            </Field>
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-800">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">📈 Equity</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Total Equity Grant">
              <NumberInput value={offer.equityValue} onChange={(v) => onChange({ ...offer, equityValue: v })} prefix="$" />
            </Field>
            <Field label="Vesting" hint="years">
              <NumberInput value={offer.equityVestingYears} onChange={(v) => onChange({ ...offer, equityVestingYears: v })} />
            </Field>
            <Field label="Type">
              <select
                value={offer.equityType}
                onChange={(e) => onChange({ ...offer, equityType: e.target.value as 'rsu' | 'options' })}
                className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
              >
                <option value="rsu">RSUs</option>
                <option value="options">Stock Options</option>
              </select>
            </Field>
            {offer.equityType === 'options' && (
              <Field label="Strike Price">
                <NumberInput value={offer.optionStrikePrice || 0} onChange={(v) => onChange({ ...offer, optionStrikePrice: v })} prefix="$" />
              </Field>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-800">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">🏥 Benefits</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="401k Match" hint="% employer matches">
              <NumberInput value={offer.retirement401kMatch} onChange={(v) => onChange({ ...offer, retirement401kMatch: v })} />
            </Field>
            <Field label="Match Cap" hint="% of salary">
              <NumberInput value={offer.retirement401kMatchCap} onChange={(v) => onChange({ ...offer, retirement401kMatchCap: v })} />
            </Field>
            <Field label="Health Premium" hint="$/month">
              <NumberInput value={offer.healthInsurancePremium} onChange={(v) => onChange({ ...offer, healthInsurancePremium: v })} prefix="$" />
            </Field>
            <Field label="PTO" hint="weeks/year">
              <NumberInput value={offer.ptoWeeks} onChange={(v) => onChange({ ...offer, ptoWeeks: v })} />
            </Field>
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-800">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">📍 Location</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="State">
              <select
                value={offer.state}
                onChange={(e) => onChange({ ...offer, state: e.target.value })}
                className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
              >
                {states.map((s) => (
                  <option key={s.abbr} value={s.abbr}>{s.name}{STATE_DATA[s.abbr].type === 'none' ? ' ✨ No tax' : ''}</option>
                ))}
              </select>
            </Field>
            <Field label="Work Policy">
              <select
                value={offer.remotePolicy}
                onChange={(e) => onChange({ ...offer, remotePolicy: e.target.value as 'remote' | 'hybrid' | 'onsite' })}
                className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
              >
                <option value="remote">Fully Remote</option>
                <option value="hybrid">Hybrid (3 days/week)</option>
                <option value="onsite">On-site (5 days/week)</option>
              </select>
            </Field>
            <Field label="Commute" hint="min one-way">
              <NumberInput value={offer.commuteMinutes} onChange={(v) => onChange({ ...offer, commuteMinutes: v })} />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoneyCell({ value, highlight, sub }: { value: number; highlight?: boolean; sub?: string }) {
  const formatted = value < 0
    ? `-$${Math.abs(Math.round(value)).toLocaleString()}`
    : `$${Math.round(value).toLocaleString()}`;
  return (
    <div>
      <span className={`text-sm font-mono ${highlight ? 'text-amber-400 font-bold' : 'text-zinc-200'}`}>
        {formatted}
      </span>
      {sub && <div className="text-xs text-zinc-500">{sub}</div>}
    </div>
  );
}

function ResultsView({ result }: { result: ComparisonResult }) {
  const [activeTab, setActiveTab] = useState<'comparison' | 'negotiation' | 'counter'>('comparison');
  const winner = result.offers[result.winner];
  const loser = result.offers[result.winner === 0 ? 1 : 0];

  return (
    <div className="space-y-8">
      {/* Winner banner */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 text-center">
        <div className="text-sm text-amber-400 font-medium mb-1">⚔️ THE WINNER</div>
        <h2 className="text-3xl font-bold mb-2">{winner.label}</h2>
        <p className="text-zinc-400">
          Beats {loser.label} by <span className="text-amber-400 font-bold">${Math.round(result.deltaAnnual).toLocaleString()}/year</span>
          {' '}(${Math.round(result.deltaMonthly).toLocaleString()}/month) in true compensation
        </p>
      </div>

      {/* Highlights */}
      {result.highlights.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Key Insights</h3>
          {result.highlights.map((h, i) => (
            <div key={i} className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-sm text-zinc-300 flex items-start gap-2">
              <span className="text-amber-400">→</span> {h}
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-2">
        {[
          { key: 'comparison' as const, label: '📊 Comparison' },
          { key: 'negotiation' as const, label: '✉️ Negotiation Email' },
          { key: 'counter' as const, label: '🎯 Counter Offer' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === tab.key ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'comparison' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-3 text-sm text-zinc-500 font-medium w-1/3">Metric</th>
                <th className="py-3 text-sm font-medium text-blue-400">{result.offers[0].label}</th>
                <th className="py-3 text-sm font-medium text-purple-400">{result.offers[1].label}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[
                { label: 'Base Salary', a: result.offers[0].input.baseSalary, b: result.offers[1].input.baseSalary },
                { label: 'Total Cash Comp', a: result.offers[0].totalCashComp, b: result.offers[1].totalCashComp, sub: 'base + bonus + signing' },
                { label: 'Annual Equity Value', a: result.offers[0].annualEquityValue, b: result.offers[1].annualEquityValue },
                { label: 'Total Comp', a: result.offers[0].totalComp, b: result.offers[1].totalComp, highlight: true },
                { label: 'Federal Tax', a: -result.offers[0].federalTax, b: -result.offers[1].federalTax },
                { label: 'State Tax', a: -result.offers[0].stateTax, b: -result.offers[1].stateTax, sub: `${result.offers[0].stateInfo.name} vs ${result.offers[1].stateInfo.name}` },
                { label: 'FICA (SS + Medicare)', a: -result.offers[0].ficaTax, b: -result.offers[1].ficaTax },
                { label: 'Effective Tax Rate', a: result.offers[0].effectiveTaxRate, b: result.offers[1].effectiveTaxRate, isPercent: true },
                { label: 'After-Tax Income', a: result.offers[0].afterTaxIncome, b: result.offers[1].afterTaxIncome, highlight: true },
                { label: '401k Employer Match Value', a: result.offers[0].retirement401kValue, b: result.offers[1].retirement401kValue },
                { label: 'Health Insurance Cost', a: -result.offers[0].healthInsuranceAnnualCost, b: -result.offers[1].healthInsuranceAnnualCost, sub: '/year' },
                { label: 'PTO Value', a: result.offers[0].ptoValue, b: result.offers[1].ptoValue },
                { label: 'Net Benefits Value', a: result.offers[0].totalBenefitsValue, b: result.offers[1].totalBenefitsValue },
                { label: 'Cost of Living Index', a: result.offers[0].costOfLivingIndex, b: result.offers[1].costOfLivingIndex, isIndex: true, sub: '100 = national avg' },
                { label: 'COL-Adjusted Income', a: result.offers[0].colAdjustedIncome, b: result.offers[1].colAdjustedIncome, highlight: true },
                { label: 'Annual Commute Hours', a: result.offers[0].annualCommuteHours, b: result.offers[1].annualCommuteHours, isHours: true },
                { label: 'Commute Opportunity Cost', a: -result.offers[0].commuteOpportunityCost, b: -result.offers[1].commuteOpportunityCost },
                { label: '⚔️ TRUE COMPENSATION', a: result.offers[0].trueCompensation, b: result.offers[1].trueCompensation, highlight: true, bold: true },
              ].map((row, i) => (
                <tr key={i} className={row.bold ? 'bg-amber-500/5' : ''}>
                  <td className={`py-2.5 text-sm ${row.bold ? 'font-bold text-amber-400' : 'text-zinc-400'}`}>{row.label}</td>
                  <td className="py-2.5">
                    {'isPercent' in row && row.isPercent ? (
                      <span className="text-sm font-mono text-zinc-200">{(row.a * 100).toFixed(1)}%</span>
                    ) : 'isIndex' in row && row.isIndex ? (
                      <div>
                        <span className="text-sm font-mono text-zinc-200">{row.a.toFixed(1)}</span>
                        {row.sub && <div className="text-xs text-zinc-500">{row.sub}</div>}
                      </div>
                    ) : 'isHours' in row && row.isHours ? (
                      <span className="text-sm font-mono text-zinc-200">{Math.round(row.a)}h</span>
                    ) : (
                      <MoneyCell value={row.a} highlight={row.highlight} sub={!('isPercent' in row) && !('isIndex' in row) ? row.sub : undefined} />
                    )}
                  </td>
                  <td className="py-2.5">
                    {'isPercent' in row && row.isPercent ? (
                      <span className="text-sm font-mono text-zinc-200">{(row.b * 100).toFixed(1)}%</span>
                    ) : 'isIndex' in row && row.isIndex ? (
                      <span className="text-sm font-mono text-zinc-200">{row.b.toFixed(1)}</span>
                    ) : 'isHours' in row && row.isHours ? (
                      <span className="text-sm font-mono text-zinc-200">{Math.round(row.b)}h</span>
                    ) : (
                      <MoneyCell value={row.b} highlight={row.highlight} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* State notes */}
          <div className="mt-4 space-y-2">
            {result.offers.map((o, i) => (
              <div key={i}>
                {o.stateInfo.notes && (
                  <div className="text-xs text-zinc-500">💡 {o.stateInfo.name}: {o.stateInfo.notes}</div>
                )}
                {o.stateInfo.localTaxNote && (
                  <div className="text-xs text-zinc-500">⚠️ {o.stateInfo.name}: {o.stateInfo.localTaxNote}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'negotiation' && (
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Negotiation email for the <span className="text-amber-400">weaker offer</span> — asking them to match or beat the stronger one.
          </p>
          <div className="relative">
            <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed overflow-auto max-h-[500px]">
              {generateNegotiationEmail(result, result.winner === 0 ? 1 : 0)}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(generateNegotiationEmail(result, result.winner === 0 ? 1 : 0))}
              className="absolute top-3 right-3 px-3 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs hover:text-white transition"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {activeTab === 'counter' && (
        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Data-backed counter-offer showing your <span className="text-amber-400">true compensation analysis</span> to justify your ask.
          </p>
          <div className="relative">
            <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed overflow-auto max-h-[500px]">
              {generateCounterOfferEmail(result, result.winner === 0 ? 1 : 0)}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(generateCounterOfferEmail(result, result.winner === 0 ? 1 : 0))}
              className="absolute top-3 right-3 px-3 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs hover:text-white transition"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {/* Stripe CTA for full report */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 text-center">
        <h3 className="text-lg font-bold mb-2">📄 Get the Full Report + Negotiation Kit</h3>
        <p className="text-zinc-400 text-sm mb-4">
          Professional PDF comparison report, 3 customized negotiation email templates,
          salary research summary, and a 30-day negotiation timeline.
        </p>
        <a
          href="/api/checkout"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:brightness-110 transition"
        >
          Get Full Kit — $9.99
        </a>
        <p className="text-xs text-zinc-500 mt-2">One-time purchase. No subscription. Instant access.</p>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [offers, setOffers] = useState<[OfferInput, OfferInput]>([
    defaultOffer('Company A'),
    defaultOffer('Company B'),
  ]);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const updateOffer = (index: number, updated: OfferInput) => {
    const newOffers: [OfferInput, OfferInput] = [...offers] as [OfferInput, OfferInput];
    newOffers[index] = updated;
    setOffers(newOffers);
  };

  const handleCompare = () => {
    if (offers[0].baseSalary === 0 || offers[1].baseSalary === 0) {
      alert('Please enter a base salary for both offers.');
      return;
    }
    const comparison = compareOffers(offers, filingStatus);
    setResult(comparison);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">
          ⚔️ Compare Your Offers
        </h1>
        <p className="text-zinc-400 max-w-lg mx-auto">
          Enter both offers below. We'll calculate everything — taxes, COL, equity, benefits, commute — and tell you which one actually wins.
        </p>
      </div>

      {/* Filing status */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg bg-zinc-900 border border-zinc-800 p-1">
          {(['single', 'married'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilingStatus(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${filingStatus === status ? 'bg-amber-500/20 text-amber-400' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              {status === 'single' ? 'Single Filer' : 'Married Filing Jointly'}
            </button>
          ))}
        </div>
      </div>

      {/* Offer forms */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <OfferForm offer={offers[0]} onChange={(o) => updateOffer(0, o)} index={0} />
        <OfferForm offer={offers[1]} onChange={(o) => updateOffer(1, o)} index={1} />
      </div>

      {/* Compare button */}
      <div className="text-center mb-12">
        <button
          onClick={handleCompare}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg hover:brightness-110 transition shadow-lg shadow-orange-500/20"
        >
          ⚔️ Battle! Which Offer Wins?
        </button>
      </div>

      {/* Results */}
      {result && (
        <div id="results">
          <ResultsView result={result} />
        </div>
      )}
    </main>
  );
}
