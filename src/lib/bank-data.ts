export type Bank = {
  name: string;
  country: "US" | "CA";
  /** 9-digit ABA for US, 3-digit institution code for Canada */
  code: string;
  aliases?: string[];
};

export const BANKS: Bank[] = [
  // --- US (top ~50 by deposits, publicly-listed ABA routing numbers) ---
  { name: "Citizens Bank", country: "US", code: "036076150", aliases: ["citizens", "citizens financial", "citizens bank na"] },
  { name: "JPMorgan Chase", country: "US", code: "021000021", aliases: ["chase", "chase bank", "jpmorgan", "jp morgan"] },
  { name: "Bank of America", country: "US", code: "026009593", aliases: ["bofa", "boa", "bank of america na"] },
  { name: "Wells Fargo", country: "US", code: "121000248", aliases: ["wells", "wells fargo bank"] },
  { name: "TD Bank USA", country: "US", code: "026013673", aliases: ["td bank", "td", "td bank na"] },
  { name: "Capital One", country: "US", code: "051405515", aliases: ["cap one", "capitalone"] },
  { name: "PNC Bank", country: "US", code: "043000096", aliases: ["pnc"] },
  { name: "U.S. Bank", country: "US", code: "123000220", aliases: ["us bank", "usbank", "us bank na"] },
  { name: "Truist", country: "US", code: "053101121", aliases: ["suntrust", "bb&t", "truist bank"] },
  { name: "Ally Bank", country: "US", code: "124003116", aliases: ["ally"] },
  { name: "Charles Schwab Bank", country: "US", code: "121202211", aliases: ["schwab"] },
  { name: "Fifth Third Bank", country: "US", code: "042000314", aliases: ["fifth third", "5/3"] },
  { name: "Regions Bank", country: "US", code: "062000019", aliases: ["regions"] },
  { name: "HSBC Bank USA", country: "US", code: "021001088", aliases: ["hsbc"] },
  { name: "Navy Federal Credit Union", country: "US", code: "256074974", aliases: ["navy federal", "nfcu"] },
  { name: "USAA Federal Savings Bank", country: "US", code: "314074269", aliases: ["usaa"] },
  { name: "Goldman Sachs Bank USA", country: "US", code: "124085066", aliases: ["goldman", "marcus"] },
  { name: "Morgan Stanley Private Bank", country: "US", code: "026015317", aliases: ["morgan stanley"] },
  { name: "BMO Harris Bank", country: "US", code: "071000288", aliases: ["bmo harris", "harris bank"] },
  { name: "KeyBank", country: "US", code: "041001039", aliases: ["key bank"] },
  { name: "Huntington National Bank", country: "US", code: "044000024", aliases: ["huntington"] },
  { name: "M&T Bank", country: "US", code: "022000046", aliases: ["mt bank", "m t bank"] },
  { name: "Discover Bank", country: "US", code: "031100649", aliases: ["discover"] },
  { name: "American Express National Bank", country: "US", code: "124071889", aliases: ["amex", "american express"] },
  { name: "Comerica Bank", country: "US", code: "072000096", aliases: ["comerica"] },
  { name: "Zions Bancorporation", country: "US", code: "124000054", aliases: ["zions"] },
  { name: "Santander Bank", country: "US", code: "011075150", aliases: ["santander"] },
  { name: "First Republic Bank", country: "US", code: "321081669", aliases: ["first republic"] },
  { name: "Silicon Valley Bank", country: "US", code: "121140399", aliases: ["svb"] },
  { name: "Flagstar Bank", country: "US", code: "272471852", aliases: ["flagstar"] },
  { name: "New York Community Bank", country: "US", code: "226070825", aliases: ["nycb"] },
  { name: "State Employees Credit Union", country: "US", code: "253177049", aliases: ["secu"] },
  { name: "PenFed Credit Union", country: "US", code: "256078446", aliases: ["penfed"] },
  { name: "Alliant Credit Union", country: "US", code: "271081528", aliases: ["alliant"] },
  { name: "Boeing Employees Credit Union", country: "US", code: "325081403", aliases: ["becu"] },
  { name: "SoFi Bank", country: "US", code: "267084131", aliases: ["sofi"] },
  { name: "Chime", country: "US", code: "103100195", aliases: ["chime financial"] },
  { name: "Varo Bank", country: "US", code: "314972853", aliases: ["varo"] },
  { name: "Green Dot Bank", country: "US", code: "124303120", aliases: ["green dot"] },
  { name: "Axos Bank", country: "US", code: "122287251", aliases: ["axos"] },
  { name: "First Citizens Bank", country: "US", code: "053100300", aliases: ["first citizens"] },
  { name: "Synovus Bank", country: "US", code: "061100606", aliases: ["synovus"] },
  { name: "BancorpSouth", country: "US", code: "084201278", aliases: ["bancorp south"] },
  { name: "Associated Bank", country: "US", code: "075900575", aliases: ["associated"] },
  { name: "Frost Bank", country: "US", code: "114000093", aliases: ["frost"] },
  { name: "Valley National Bank", country: "US", code: "021201383", aliases: ["valley national"] },

  // --- Canada (institution codes) ---
  { name: "Royal Bank of Canada", country: "CA", code: "003", aliases: ["rbc", "royal bank"] },
  { name: "TD Canada Trust", country: "CA", code: "004", aliases: ["td canada", "td ct"] },
  { name: "Scotiabank", country: "CA", code: "002", aliases: ["bns", "nova scotia", "bank of nova scotia"] },
  { name: "Bank of Montreal", country: "CA", code: "001", aliases: ["bmo"] },
  { name: "CIBC", country: "CA", code: "010", aliases: ["canadian imperial", "imperial bank", "simplii"] },
  { name: "National Bank of Canada", country: "CA", code: "006", aliases: ["national bank", "nbc"] },
  { name: "HSBC Bank Canada", country: "CA", code: "016", aliases: ["hsbc canada"] },
  { name: "Desjardins", country: "CA", code: "815", aliases: ["caisse desjardins"] },
  { name: "Tangerine", country: "CA", code: "614", aliases: ["ing direct"] },
  { name: "Laurentian Bank", country: "CA", code: "039", aliases: ["laurentian"] },
  { name: "Canadian Western Bank", country: "CA", code: "030", aliases: ["cwb"] },
  { name: "ATB Financial", country: "CA", code: "219", aliases: ["atb", "alberta treasury"] },
  { name: "EQ Bank", country: "CA", code: "623", aliases: ["eq", "equitable bank"] },
  { name: "Motus Bank", country: "CA", code: "837", aliases: ["motus"] },
];

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function findBankByName(query: string): Bank | null {
  const q = norm(query);
  if (!q) return null;
  return (
    BANKS.find((b) => {
      if (norm(b.name) === q) return true;
      if (b.aliases?.some((a) => norm(a) === q)) return true;
      return false;
    }) ??
    BANKS.find((b) => norm(b.name).includes(q) || b.aliases?.some((a) => norm(a).includes(q))) ??
    null
  );
}

export function findBankByCode(code: string): Bank | null {
  const c = code.replace(/\D/g, "");
  return BANKS.find((b) => b.code === c) ?? null;
}

/**
 * ABA routing number checksum (9-digit US routing numbers).
 * Weights: 3, 7, 1, 3, 7, 1, 3, 7, 1 — sum must be divisible by 10.
 */
export function isValidABA(routing: string): boolean {
  const digits = routing.replace(/\D/g, "");
  if (digits.length !== 9) return false;
  const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1];
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i], 10) * weights[i];
  return sum % 10 === 0 && sum > 0;
}

/**
 * Canadian transit validation: accepts "III-TTTTT" or "TTTTT-III" (institution + transit).
 * Also accepts bare 3-digit institution code when sent in its own field.
 */
export function isValidCanadianTransit(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  // Full transit number: 3 institution + 5 transit = 8 digits
  return digits.length === 8 || digits.length === 3;
}

export function isValidAccountNumber(account: string, country: "US" | "CA" = "US"): boolean {
  const digits = account.replace(/\D/g, "");
  if (country === "CA") return digits.length >= 7 && digits.length <= 12;
  // US accounts are typically 6–17 digits
  return digits.length >= 6 && digits.length <= 17;
}

export function isValidHolderName(name: string): boolean {
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 80) return false;
  // Letters, spaces, apostrophes, hyphens, periods (for Jr., III, etc.)
  return /^[A-Za-z][A-Za-z\s'.\-]+$/.test(trimmed);
}
