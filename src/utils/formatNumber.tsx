export const formatNumber = (n: number): string => {
  // 'worklet';
  let result: string = '';
  if (n === null || n === undefined || isNaN(n)) {
    return 'N/A';
  }
  if (n < 0) {
    result = '-';
    n = Math.abs(n);
  }
  if (n < 1e3) {
    result += n?.toFixed(3);
  } else if (n >= 1e3 && n < 1e6) {
    result += (n / 1e3).toFixed(1) + 'K';
  } else if (n >= 1e6 && n < 1e9) {
    result += (n / 1e6).toFixed(1) + 'M';
  } else if (n >= 1e9 && n < 1e12) {
    result += (n / 1e9).toFixed(1) + 'B';
  } else if (n >= 1e12) {
    result += (n / 1e12).toFixed(1) + 'T';
  }
  return result;
};
