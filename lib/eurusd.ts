// Static EUR to USD conversion rate
// Note: This is a fixed rate and should be updated regularly for accuracy
export const EUR_USD_RATE = 1.09;

/**
 * Converts EUR to USD
 * @param eur Amount in EUR
 * @returns Equivalent amount in USD
 */
export function eurToUsd(eur: number): number {
  return eur * EUR_USD_RATE;
}

/**
 * Converts USD to EUR
 * @param usd Amount in USD
 * @returns Equivalent amount in EUR
 */
export function usdToEur(usd: number): number {
  return usd / EUR_USD_RATE;
}
