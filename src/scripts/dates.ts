const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Format an absolute month index (year * 12 + month0) as "Mar 2026". */
export const fmtIndex = (i: number): string => `${MONTHS[i % 12]} ${Math.floor(i / 12)}`;
