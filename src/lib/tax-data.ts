// 2024-2025 Federal tax brackets (single filer — married filing jointly doubles the brackets)
export const FEDERAL_BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

export const FEDERAL_BRACKETS_MARRIED = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

export const STANDARD_DEDUCTION_SINGLE = 14600;
export const STANDARD_DEDUCTION_MARRIED = 29200;

export const FICA_SS_RATE = 0.062;
export const FICA_SS_CAP = 168600;
export const FICA_MEDICARE_RATE = 0.0145;
export const FICA_MEDICARE_SURTAX_RATE = 0.009;
export const FICA_MEDICARE_SURTAX_THRESHOLD_SINGLE = 200000;
export const FICA_MEDICARE_SURTAX_THRESHOLD_MARRIED = 250000;

export interface StateTaxInfo {
  name: string;
  abbr: string;
  type: 'none' | 'flat' | 'progressive';
  rate?: number; // flat rate
  brackets?: { min: number; max: number; rate: number }[];
  standardDeduction?: number;
  notes?: string;
  localTaxNote?: string;
  costOfLivingIndex: number; // national average = 100
}

// All 50 states + DC with real tax data and cost of living indices
export const STATE_DATA: Record<string, StateTaxInfo> = {
  AL: { name: 'Alabama', abbr: 'AL', type: 'progressive', brackets: [{ min: 0, max: 500, rate: 0.02 }, { min: 500, max: 3000, rate: 0.04 }, { min: 3000, max: Infinity, rate: 0.05 }], standardDeduction: 2500, costOfLivingIndex: 88.1 },
  AK: { name: 'Alaska', abbr: 'AK', type: 'none', costOfLivingIndex: 127.0, notes: 'No state income tax' },
  AZ: { name: 'Arizona', abbr: 'AZ', type: 'flat', rate: 0.025, costOfLivingIndex: 102.2 },
  AR: { name: 'Arkansas', abbr: 'AR', type: 'progressive', brackets: [{ min: 0, max: 4300, rate: 0.02 }, { min: 4300, max: 8500, rate: 0.04 }, { min: 8500, max: Infinity, rate: 0.044 }], standardDeduction: 2270, costOfLivingIndex: 86.9 },
  CA: { name: 'California', abbr: 'CA', type: 'progressive', brackets: [{ min: 0, max: 10412, rate: 0.01 }, { min: 10412, max: 24684, rate: 0.02 }, { min: 24684, max: 38959, rate: 0.04 }, { min: 38959, max: 54081, rate: 0.06 }, { min: 54081, max: 68350, rate: 0.08 }, { min: 68350, max: 349137, rate: 0.093 }, { min: 349137, max: 418961, rate: 0.103 }, { min: 418961, max: 698271, rate: 0.113 }, { min: 698271, max: 1000000, rate: 0.123 }, { min: 1000000, max: Infinity, rate: 0.133 }], standardDeduction: 5363, costOfLivingIndex: 142.2, localTaxNote: 'SDI: 1.1% on first $153,164' },
  CO: { name: 'Colorado', abbr: 'CO', type: 'flat', rate: 0.044, costOfLivingIndex: 105.0 },
  CT: { name: 'Connecticut', abbr: 'CT', type: 'progressive', brackets: [{ min: 0, max: 10000, rate: 0.03 }, { min: 10000, max: 50000, rate: 0.05 }, { min: 50000, max: 100000, rate: 0.055 }, { min: 100000, max: 200000, rate: 0.06 }, { min: 200000, max: 250000, rate: 0.065 }, { min: 250000, max: 500000, rate: 0.069 }, { min: 500000, max: Infinity, rate: 0.0699 }], costOfLivingIndex: 120.5 },
  DE: { name: 'Delaware', abbr: 'DE', type: 'progressive', brackets: [{ min: 0, max: 2000, rate: 0.0 }, { min: 2000, max: 5000, rate: 0.022 }, { min: 5000, max: 10000, rate: 0.039 }, { min: 10000, max: 20000, rate: 0.048 }, { min: 20000, max: 25000, rate: 0.052 }, { min: 25000, max: 60000, rate: 0.0555 }, { min: 60000, max: Infinity, rate: 0.066 }], standardDeduction: 3250, costOfLivingIndex: 103.0 },
  FL: { name: 'Florida', abbr: 'FL', type: 'none', costOfLivingIndex: 102.8, notes: 'No state income tax' },
  GA: { name: 'Georgia', abbr: 'GA', type: 'flat', rate: 0.0549, costOfLivingIndex: 93.4 },
  HI: { name: 'Hawaii', abbr: 'HI', type: 'progressive', brackets: [{ min: 0, max: 2400, rate: 0.014 }, { min: 2400, max: 4800, rate: 0.032 }, { min: 4800, max: 9600, rate: 0.055 }, { min: 9600, max: 14400, rate: 0.064 }, { min: 14400, max: 19200, rate: 0.068 }, { min: 19200, max: 24000, rate: 0.072 }, { min: 24000, max: 36000, rate: 0.076 }, { min: 36000, max: 48000, rate: 0.079 }, { min: 48000, max: 150000, rate: 0.0825 }, { min: 150000, max: 175000, rate: 0.09 }, { min: 175000, max: 200000, rate: 0.10 }, { min: 200000, max: Infinity, rate: 0.11 }], standardDeduction: 2200, costOfLivingIndex: 192.9 },
  ID: { name: 'Idaho', abbr: 'ID', type: 'flat', rate: 0.058, costOfLivingIndex: 98.3 },
  IL: { name: 'Illinois', abbr: 'IL', type: 'flat', rate: 0.0495, costOfLivingIndex: 93.4, localTaxNote: 'Chicago: additional ~1% city' },
  IN: { name: 'Indiana', abbr: 'IN', type: 'flat', rate: 0.0305, costOfLivingIndex: 90.5, localTaxNote: 'County taxes 0.5-2.9% additional' },
  IA: { name: 'Iowa', abbr: 'IA', type: 'flat', rate: 0.038, costOfLivingIndex: 89.2 },
  KS: { name: 'Kansas', abbr: 'KS', type: 'progressive', brackets: [{ min: 0, max: 15000, rate: 0.031 }, { min: 15000, max: 30000, rate: 0.0525 }, { min: 30000, max: Infinity, rate: 0.057 }], standardDeduction: 3500, costOfLivingIndex: 89.8 },
  KY: { name: 'Kentucky', abbr: 'KY', type: 'flat', rate: 0.04, costOfLivingIndex: 90.8 },
  LA: { name: 'Louisiana', abbr: 'LA', type: 'progressive', brackets: [{ min: 0, max: 12500, rate: 0.0185 }, { min: 12500, max: 50000, rate: 0.035 }, { min: 50000, max: Infinity, rate: 0.0425 }], costOfLivingIndex: 91.1 },
  ME: { name: 'Maine', abbr: 'ME', type: 'progressive', brackets: [{ min: 0, max: 24500, rate: 0.058 }, { min: 24500, max: 58050, rate: 0.0675 }, { min: 58050, max: Infinity, rate: 0.0715 }], standardDeduction: 14600, costOfLivingIndex: 113.0 },
  MD: { name: 'Maryland', abbr: 'MD', type: 'progressive', brackets: [{ min: 0, max: 1000, rate: 0.02 }, { min: 1000, max: 2000, rate: 0.03 }, { min: 2000, max: 3000, rate: 0.04 }, { min: 3000, max: 100000, rate: 0.0475 }, { min: 100000, max: 125000, rate: 0.05 }, { min: 125000, max: 150000, rate: 0.0525 }, { min: 150000, max: 250000, rate: 0.055 }, { min: 250000, max: Infinity, rate: 0.0575 }], standardDeduction: 2550, costOfLivingIndex: 116.2, localTaxNote: 'County taxes 2.25-3.2% additional' },
  MA: { name: 'Massachusetts', abbr: 'MA', type: 'flat', rate: 0.05, costOfLivingIndex: 135.0, notes: '4% surtax on income over $1M' },
  MI: { name: 'Michigan', abbr: 'MI', type: 'flat', rate: 0.0425, costOfLivingIndex: 90.7, localTaxNote: 'Detroit: 2.4% city tax' },
  MN: { name: 'Minnesota', abbr: 'MN', type: 'progressive', brackets: [{ min: 0, max: 30070, rate: 0.0535 }, { min: 30070, max: 98760, rate: 0.068 }, { min: 98760, max: 183340, rate: 0.0785 }, { min: 183340, max: Infinity, rate: 0.0985 }], standardDeduction: 14575, costOfLivingIndex: 98.8 },
  MS: { name: 'Mississippi', abbr: 'MS', type: 'flat', rate: 0.047, costOfLivingIndex: 84.8 },
  MO: { name: 'Missouri', abbr: 'MO', type: 'progressive', brackets: [{ min: 0, max: 1207, rate: 0.02 }, { min: 1207, max: 2414, rate: 0.025 }, { min: 2414, max: 3621, rate: 0.03 }, { min: 3621, max: 4828, rate: 0.035 }, { min: 4828, max: 6035, rate: 0.04 }, { min: 6035, max: 7242, rate: 0.045 }, { min: 7242, max: 8449, rate: 0.05 }, { min: 8449, max: Infinity, rate: 0.048 }], standardDeduction: 14600, costOfLivingIndex: 89.8 },
  MT: { name: 'Montana', abbr: 'MT', type: 'progressive', brackets: [{ min: 0, max: 20500, rate: 0.047 }, { min: 20500, max: Infinity, rate: 0.059 }], standardDeduction: 5540, costOfLivingIndex: 101.1 },
  NE: { name: 'Nebraska', abbr: 'NE', type: 'progressive', brackets: [{ min: 0, max: 3700, rate: 0.0246 }, { min: 3700, max: 22170, rate: 0.0351 }, { min: 22170, max: 35730, rate: 0.0501 }, { min: 35730, max: Infinity, rate: 0.0584 }], standardDeduction: 7900, costOfLivingIndex: 92.0 },
  NV: { name: 'Nevada', abbr: 'NV', type: 'none', costOfLivingIndex: 104.2, notes: 'No state income tax' },
  NH: { name: 'New Hampshire', abbr: 'NH', type: 'none', costOfLivingIndex: 112.5, notes: 'No income tax (interest/dividends tax repealed 2025)' },
  NJ: { name: 'New Jersey', abbr: 'NJ', type: 'progressive', brackets: [{ min: 0, max: 20000, rate: 0.014 }, { min: 20000, max: 35000, rate: 0.0175 }, { min: 35000, max: 40000, rate: 0.035 }, { min: 40000, max: 75000, rate: 0.05525 }, { min: 75000, max: 500000, rate: 0.0637 }, { min: 500000, max: 1000000, rate: 0.0897 }, { min: 1000000, max: Infinity, rate: 0.1075 }], costOfLivingIndex: 120.1 },
  NM: { name: 'New Mexico', abbr: 'NM', type: 'progressive', brackets: [{ min: 0, max: 5500, rate: 0.017 }, { min: 5500, max: 11000, rate: 0.032 }, { min: 11000, max: 16000, rate: 0.047 }, { min: 16000, max: 210000, rate: 0.049 }, { min: 210000, max: Infinity, rate: 0.059 }], standardDeduction: 14600, costOfLivingIndex: 94.5 },
  NY: { name: 'New York', abbr: 'NY', type: 'progressive', brackets: [{ min: 0, max: 8500, rate: 0.04 }, { min: 8500, max: 11700, rate: 0.045 }, { min: 11700, max: 13900, rate: 0.0525 }, { min: 13900, max: 80650, rate: 0.055 }, { min: 80650, max: 215400, rate: 0.06 }, { min: 215400, max: 1077550, rate: 0.0685 }, { min: 1077550, max: 5000000, rate: 0.0965 }, { min: 5000000, max: 25000000, rate: 0.103 }, { min: 25000000, max: Infinity, rate: 0.109 }], standardDeduction: 8000, costOfLivingIndex: 126.5, localTaxNote: 'NYC: additional 3.078-3.876%' },
  NC: { name: 'North Carolina', abbr: 'NC', type: 'flat', rate: 0.045, costOfLivingIndex: 97.7 },
  ND: { name: 'North Dakota', abbr: 'ND', type: 'flat', rate: 0.0195, costOfLivingIndex: 93.3 },
  OH: { name: 'Ohio', abbr: 'OH', type: 'progressive', brackets: [{ min: 0, max: 26050, rate: 0.0 }, { min: 26050, max: 100000, rate: 0.0275 }, { min: 100000, max: Infinity, rate: 0.035 }], costOfLivingIndex: 90.8, localTaxNote: 'Many cities levy 1-3% income tax' },
  OK: { name: 'Oklahoma', abbr: 'OK', type: 'progressive', brackets: [{ min: 0, max: 1000, rate: 0.0025 }, { min: 1000, max: 2500, rate: 0.0075 }, { min: 2500, max: 3750, rate: 0.0175 }, { min: 3750, max: 4900, rate: 0.0275 }, { min: 4900, max: 7200, rate: 0.0375 }, { min: 7200, max: Infinity, rate: 0.0475 }], standardDeduction: 6350, costOfLivingIndex: 86.6 },
  OR: { name: 'Oregon', abbr: 'OR', type: 'progressive', brackets: [{ min: 0, max: 4050, rate: 0.0475 }, { min: 4050, max: 10200, rate: 0.0675 }, { min: 10200, max: 125000, rate: 0.0875 }, { min: 125000, max: Infinity, rate: 0.099 }], standardDeduction: 2745, costOfLivingIndex: 130.1, notes: 'No sales tax but high income tax' },
  PA: { name: 'Pennsylvania', abbr: 'PA', type: 'flat', rate: 0.0307, costOfLivingIndex: 99.0, localTaxNote: 'Philadelphia: 3.75% wage tax' },
  RI: { name: 'Rhode Island', abbr: 'RI', type: 'progressive', brackets: [{ min: 0, max: 73450, rate: 0.0375 }, { min: 73450, max: 166950, rate: 0.0475 }, { min: 166950, max: Infinity, rate: 0.0599 }], standardDeduction: 10550, costOfLivingIndex: 107.7 },
  SC: { name: 'South Carolina', abbr: 'SC', type: 'progressive', brackets: [{ min: 0, max: 3460, rate: 0.0 }, { min: 3460, max: 17330, rate: 0.03 }, { min: 17330, max: Infinity, rate: 0.064 }], standardDeduction: 14600, costOfLivingIndex: 95.8 },
  SD: { name: 'South Dakota', abbr: 'SD', type: 'none', costOfLivingIndex: 95.5, notes: 'No state income tax' },
  TN: { name: 'Tennessee', abbr: 'TN', type: 'none', costOfLivingIndex: 90.0, notes: 'No state income tax' },
  TX: { name: 'Texas', abbr: 'TX', type: 'none', costOfLivingIndex: 92.1, notes: 'No state income tax' },
  UT: { name: 'Utah', abbr: 'UT', type: 'flat', rate: 0.0465, costOfLivingIndex: 101.3 },
  VT: { name: 'Vermont', abbr: 'VT', type: 'progressive', brackets: [{ min: 0, max: 45400, rate: 0.0335 }, { min: 45400, max: 110050, rate: 0.066 }, { min: 110050, max: 229550, rate: 0.076 }, { min: 229550, max: Infinity, rate: 0.0875 }], standardDeduction: 14600, costOfLivingIndex: 114.5 },
  VA: { name: 'Virginia', abbr: 'VA', type: 'progressive', brackets: [{ min: 0, max: 3000, rate: 0.02 }, { min: 3000, max: 5000, rate: 0.03 }, { min: 5000, max: 17000, rate: 0.05 }, { min: 17000, max: Infinity, rate: 0.0575 }], standardDeduction: 8000, costOfLivingIndex: 103.7 },
  WA: { name: 'Washington', abbr: 'WA', type: 'none', costOfLivingIndex: 110.7, notes: 'No state income tax (7% capital gains tax on gains > $262,000)' },
  WV: { name: 'West Virginia', abbr: 'WV', type: 'progressive', brackets: [{ min: 0, max: 10000, rate: 0.0236 }, { min: 10000, max: 25000, rate: 0.0315 }, { min: 25000, max: 40000, rate: 0.0354 }, { min: 40000, max: 60000, rate: 0.0472 }, { min: 60000, max: Infinity, rate: 0.0512 }], costOfLivingIndex: 84.1 },
  WI: { name: 'Wisconsin', abbr: 'WI', type: 'progressive', brackets: [{ min: 0, max: 14320, rate: 0.0354 }, { min: 14320, max: 28640, rate: 0.0465 }, { min: 28640, max: 315310, rate: 0.053 }, { min: 315310, max: Infinity, rate: 0.0765 }], standardDeduction: 12760, costOfLivingIndex: 96.5 },
  WY: { name: 'Wyoming', abbr: 'WY', type: 'none', costOfLivingIndex: 95.4, notes: 'No state income tax' },
  DC: { name: 'District of Columbia', abbr: 'DC', type: 'progressive', brackets: [{ min: 0, max: 10000, rate: 0.04 }, { min: 10000, max: 40000, rate: 0.06 }, { min: 40000, max: 60000, rate: 0.065 }, { min: 60000, max: 250000, rate: 0.085 }, { min: 250000, max: 500000, rate: 0.0925 }, { min: 500000, max: 1000000, rate: 0.0975 }, { min: 1000000, max: Infinity, rate: 0.1075 }], standardDeduction: 14600, costOfLivingIndex: 152.1 },
};
