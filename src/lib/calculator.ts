import {
  FEDERAL_BRACKETS_SINGLE,
  FEDERAL_BRACKETS_MARRIED,
  STANDARD_DEDUCTION_SINGLE,
  STANDARD_DEDUCTION_MARRIED,
  FICA_SS_RATE,
  FICA_SS_CAP,
  FICA_MEDICARE_RATE,
  FICA_MEDICARE_SURTAX_RATE,
  FICA_MEDICARE_SURTAX_THRESHOLD_SINGLE,
  FICA_MEDICARE_SURTAX_THRESHOLD_MARRIED,
  STATE_DATA,
} from './tax-data';

export interface OfferInput {
  label: string;
  baseSalary: number;
  signingBonus: number;
  annualBonus: number; // as percentage of base
  equityValue: number; // total grant value
  equityVestingYears: number;
  equityType: 'rsu' | 'options';
  optionStrikePrice?: number;
  retirement401kMatch: number; // as percentage of salary (employer match)
  retirement401kMatchCap: number; // max percentage they match
  healthInsurancePremium: number; // monthly employee cost
  healthInsuranceDeductible: number;
  ptoWeeks: number;
  remotePolicy: 'remote' | 'hybrid' | 'onsite';
  commuteMinutes: number; // one-way daily
  state: string;
  city?: string;
}

export interface OfferAnalysis {
  label: string;
  input: OfferInput;
  // Compensation
  totalCashComp: number;
  annualEquityValue: number;
  totalComp: number;
  // Taxes
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  totalTax: number;
  effectiveTaxRate: number;
  afterTaxIncome: number;
  // Benefits value
  retirement401kValue: number;
  healthInsuranceAnnualCost: number;
  ptoValue: number;
  totalBenefitsValue: number;
  // Adjusted
  costOfLivingIndex: number;
  colAdjustedIncome: number;
  // Commute cost
  annualCommuteHours: number;
  commuteOpportunityCost: number;
  // Final
  trueCompensation: number;
  stateInfo: { name: string; notes?: string; localTaxNote?: string };
}

export interface ComparisonResult {
  offers: OfferAnalysis[];
  winner: number; // index
  deltaAnnual: number;
  deltaMonthly: number;
  highlights: string[];
}

function calcBracketTax(income: number, brackets: { min: number; max: number; rate: number }[]): number {
  let tax = 0;
  for (const bracket of brackets) {
    if (income <= bracket.min) break;
    const taxable = Math.min(income, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

function analyzeOffer(offer: OfferInput, filingStatus: 'single' | 'married'): OfferAnalysis {
  // Cash compensation
  const annualBonus = offer.baseSalary * (offer.annualBonus / 100);
  const totalCashComp = offer.baseSalary + annualBonus + offer.signingBonus;

  // Equity
  const vestingYears = offer.equityVestingYears || 4;
  let annualEquityValue = offer.equityValue / vestingYears;
  if (offer.equityType === 'options' && offer.optionStrikePrice) {
    // For options, value = (current value - strike) / vesting. If underwater, 0.
    const perShareGain = Math.max(0, (offer.equityValue / vestingYears) - offer.optionStrikePrice);
    annualEquityValue = perShareGain;
  }
  const totalComp = totalCashComp + annualEquityValue;

  // Federal taxes
  const fedDeduction = filingStatus === 'married' ? STANDARD_DEDUCTION_MARRIED : STANDARD_DEDUCTION_SINGLE;
  const fedBrackets = filingStatus === 'married' ? FEDERAL_BRACKETS_MARRIED : FEDERAL_BRACKETS_SINGLE;
  const federalTaxableIncome = Math.max(0, totalCashComp - fedDeduction);
  const federalTax = calcBracketTax(federalTaxableIncome, fedBrackets);

  // State taxes
  const stateInfo = STATE_DATA[offer.state] || STATE_DATA['CA'];
  let stateTax = 0;
  if (stateInfo.type === 'flat' && stateInfo.rate) {
    const stateDeduction = stateInfo.standardDeduction || 0;
    stateTax = Math.max(0, totalCashComp - stateDeduction) * stateInfo.rate;
  } else if (stateInfo.type === 'progressive' && stateInfo.brackets) {
    const stateDeduction = stateInfo.standardDeduction || 0;
    const stateTaxable = Math.max(0, totalCashComp - stateDeduction);
    stateTax = calcBracketTax(stateTaxable, stateInfo.brackets);
  }

  // FICA
  const ssTax = Math.min(totalCashComp, FICA_SS_CAP) * FICA_SS_RATE;
  const medicareTax = totalCashComp * FICA_MEDICARE_RATE;
  const surtaxThreshold = filingStatus === 'married' ? FICA_MEDICARE_SURTAX_THRESHOLD_MARRIED : FICA_MEDICARE_SURTAX_THRESHOLD_SINGLE;
  const medicareSurtax = totalCashComp > surtaxThreshold ? (totalCashComp - surtaxThreshold) * FICA_MEDICARE_SURTAX_RATE : 0;
  const ficaTax = ssTax + medicareTax + medicareSurtax;

  const totalTax = federalTax + stateTax + ficaTax;
  const effectiveTaxRate = totalTax / totalCashComp;
  const afterTaxIncome = totalCashComp - totalTax;

  // Benefits
  const maxMatchableContribution = offer.baseSalary * (offer.retirement401kMatchCap / 100);
  const retirement401kValue = maxMatchableContribution * (offer.retirement401kMatch / 100);
  const healthInsuranceAnnualCost = offer.healthInsurancePremium * 12;
  const dailyRate = offer.baseSalary / 260;
  const ptoValue = offer.ptoWeeks * 5 * dailyRate;
  const totalBenefitsValue = retirement401kValue + ptoValue - healthInsuranceAnnualCost;

  // Cost of living adjustment
  const costOfLivingIndex = stateInfo.costOfLivingIndex;
  const colAdjustedIncome = (afterTaxIncome / costOfLivingIndex) * 100;

  // Commute
  const workDaysPerYear = 260;
  const remoteDays = offer.remotePolicy === 'remote' ? 260 : offer.remotePolicy === 'hybrid' ? 130 : 0;
  const commuteDays = workDaysPerYear - remoteDays;
  const annualCommuteHours = (offer.commuteMinutes * 2 * commuteDays) / 60;
  const hourlyRate = offer.baseSalary / 2080;
  const commuteOpportunityCost = annualCommuteHours * hourlyRate * 0.5; // value time at 50% of hourly rate

  const trueCompensation = colAdjustedIncome + totalBenefitsValue + annualEquityValue - commuteOpportunityCost;

  return {
    label: offer.label,
    input: offer,
    totalCashComp,
    annualEquityValue,
    totalComp,
    federalTax,
    stateTax,
    ficaTax,
    totalTax,
    effectiveTaxRate,
    afterTaxIncome,
    retirement401kValue,
    healthInsuranceAnnualCost,
    ptoValue,
    totalBenefitsValue,
    costOfLivingIndex,
    colAdjustedIncome,
    annualCommuteHours,
    commuteOpportunityCost,
    trueCompensation,
    stateInfo: { name: stateInfo.name, notes: stateInfo.notes, localTaxNote: stateInfo.localTaxNote },
  };
}

export function compareOffers(offers: OfferInput[], filingStatus: 'single' | 'married'): ComparisonResult {
  const analyses = offers.map(o => analyzeOffer(o, filingStatus));
  const winnerIdx = analyses[0].trueCompensation >= analyses[1].trueCompensation ? 0 : 1;
  const loserIdx = winnerIdx === 0 ? 1 : 0;
  const deltaAnnual = analyses[winnerIdx].trueCompensation - analyses[loserIdx].trueCompensation;

  const highlights: string[] = [];

  // Tax comparison
  const taxDiff = analyses[0].totalTax - analyses[1].totalTax;
  if (Math.abs(taxDiff) > 2000) {
    const lower = taxDiff > 0 ? 1 : 0;
    highlights.push(`${analyses[lower].label} saves you $${Math.abs(Math.round(taxDiff)).toLocaleString()}/year in taxes`);
  }

  // COL comparison
  const colDiff = analyses[0].colAdjustedIncome - analyses[1].colAdjustedIncome;
  if (Math.abs(colDiff) > 3000) {
    const better = colDiff > 0 ? 0 : 1;
    highlights.push(`${analyses[better].label} gives $${Math.abs(Math.round(colDiff)).toLocaleString()} more purchasing power after COL adjustment`);
  }

  // Benefits
  const benefitDiff = analyses[0].totalBenefitsValue - analyses[1].totalBenefitsValue;
  if (Math.abs(benefitDiff) > 2000) {
    const better = benefitDiff > 0 ? 0 : 1;
    highlights.push(`${analyses[better].label} has $${Math.abs(Math.round(benefitDiff)).toLocaleString()} more in annual benefits value`);
  }

  // Equity
  const equityDiff = analyses[0].annualEquityValue - analyses[1].annualEquityValue;
  if (Math.abs(equityDiff) > 5000) {
    const better = equityDiff > 0 ? 0 : 1;
    highlights.push(`${analyses[better].label} offers $${Math.abs(Math.round(equityDiff)).toLocaleString()}/year more in equity`);
  }

  // Commute
  const commuteDiff = analyses[0].annualCommuteHours - analyses[1].annualCommuteHours;
  if (Math.abs(commuteDiff) > 50) {
    const better = commuteDiff > 0 ? 1 : 0;
    highlights.push(`${analyses[better].label} saves you ${Math.abs(Math.round(commuteDiff))} hours/year in commute time`);
  }

  // PTO
  const ptoDiff = analyses[0].input.ptoWeeks - analyses[1].input.ptoWeeks;
  if (ptoDiff !== 0) {
    const better = ptoDiff > 0 ? 0 : 1;
    highlights.push(`${analyses[better].label} offers ${Math.abs(ptoDiff)} more week${Math.abs(ptoDiff) > 1 ? 's' : ''} of PTO`);
  }

  return {
    offers: analyses,
    winner: winnerIdx,
    deltaAnnual,
    deltaMonthly: deltaAnnual / 12,
    highlights,
  };
}

export function generateNegotiationEmail(result: ComparisonResult, targetOffer: number): string {
  const target = result.offers[targetOffer];
  const competing = result.offers[targetOffer === 0 ? 1 : 0];
  const isWeaker = targetOffer !== result.winner;

  const salaryGap = competing.totalCashComp - target.totalCashComp;
  const equityGap = competing.annualEquityValue - target.annualEquityValue;

  let email = `Subject: Offer Discussion — ${target.label}\n\nDear [Hiring Manager],\n\nThank you for extending the offer for [Position] at ${target.label}. I'm genuinely excited about the opportunity and the team's mission.\n\n`;

  if (isWeaker && salaryGap > 0) {
    email += `After careful evaluation, including tax implications, cost of living, and total compensation, I'd like to discuss the base compensation. Based on my research and a competing offer, I believe a base salary of $${Math.round(target.input.baseSalary + salaryGap * 0.7).toLocaleString()} would better reflect the market rate and my experience.\n\n`;
  } else if (isWeaker) {
    email += `After thorough analysis of the total compensation package — including benefits, equity, and cost of living adjustments — I'd like to discuss a few areas where I see room for alignment.\n\n`;
  } else {
    email += `I've completed a thorough analysis of the offer and I'm very impressed with the overall package. I'd like to discuss a few areas to ensure we're fully aligned:\n\n`;
  }

  // Specific asks
  const asks: string[] = [];
  if (isWeaker && salaryGap > 5000) {
    asks.push(`Base salary increase to $${Math.round(target.input.baseSalary + salaryGap * 0.7).toLocaleString()} (a ${Math.round((salaryGap * 0.7 / target.input.baseSalary) * 100)}% adjustment)`);
  }
  if (equityGap > 10000) {
    asks.push(`Additional equity grant of $${Math.round(equityGap * target.input.equityVestingYears * 0.5).toLocaleString()} to close the equity gap`);
  }
  if (target.input.signingBonus === 0 && competing.input.signingBonus > 0) {
    asks.push(`Signing bonus of $${Math.round(competing.input.signingBonus * 0.8).toLocaleString()} to match market expectations`);
  }
  if (competing.input.ptoWeeks > target.input.ptoWeeks) {
    asks.push(`PTO alignment to ${competing.input.ptoWeeks} weeks annually`);
  }

  if (asks.length > 0) {
    email += `Specifically, I'd appreciate your consideration on:\n\n`;
    asks.forEach((ask, i) => {
      email += `${i + 1}. ${ask}\n`;
    });
    email += `\n`;
  }

  email += `I want to be transparent that I'm evaluating multiple opportunities, and ${target.label} remains my top choice. I'm confident we can find terms that work for both of us.\n\nI'm available to discuss this at your convenience.\n\nBest regards,\n[Your Name]`;

  return email;
}

export function generateCounterOfferEmail(result: ComparisonResult, targetOffer: number): string {
  const target = result.offers[targetOffer];
  const competing = result.offers[targetOffer === 0 ? 1 : 0];

  const totalGap = competing.trueCompensation - target.trueCompensation;
  const percentage = Math.round((totalGap / target.trueCompensation) * 100);

  let email = `Subject: Re: Offer for [Position] — Counter Proposal\n\nDear [Hiring Manager],\n\nThank you again for the offer to join ${target.label}. After a thorough analysis that accounts for total compensation, tax implications across states, cost of living differences, and long-term equity value, I'd like to share my perspective.\n\n`;

  email += `## My Analysis\n\n`;
  email += `When comparing total true compensation (after-tax income adjusted for cost of living, benefits value, equity, and commute costs):\n\n`;
  email += `- **${target.label}:** $${Math.round(target.trueCompensation).toLocaleString()}/year true compensation\n`;
  email += `- **${competing.label}:** $${Math.round(competing.trueCompensation).toLocaleString()}/year true compensation\n\n`;

  if (totalGap > 0) {
    email += `This represents a **$${Math.round(totalGap).toLocaleString()}/year gap (${percentage}%)**. To bring ${target.label}'s offer into parity, I'd suggest:\n\n`;

    const suggestedBase = Math.round(target.input.baseSalary * 1.1);
    email += `1. **Base salary:** $${suggestedBase.toLocaleString()} (currently $${target.input.baseSalary.toLocaleString()})\n`;
    
    if (competing.annualEquityValue > target.annualEquityValue) {
      const equityIncrease = Math.round((competing.annualEquityValue - target.annualEquityValue) * target.input.equityVestingYears);
      email += `2. **Additional equity:** $${equityIncrease.toLocaleString()} in ${target.input.equityType === 'rsu' ? 'RSUs' : 'options'}\n`;
    }

    if (target.input.signingBonus < competing.input.signingBonus) {
      email += `3. **Signing bonus:** $${Math.round(competing.input.signingBonus).toLocaleString()}\n`;
    }
  } else {
    email += `Your offer is already competitive! I'd love to discuss:\n\n`;
    email += `1. **Accelerated vesting schedule** for the first year\n`;
    email += `2. **Additional PTO** (${target.input.ptoWeeks + 1} weeks)\n`;
    email += `3. **Professional development budget** ($5,000/year)\n`;
  }

  email += `\nI'm excited about ${target.label} and confident we can reach terms that reflect my value. Looking forward to your thoughts.\n\nBest,\n[Your Name]`;

  return email;
}
