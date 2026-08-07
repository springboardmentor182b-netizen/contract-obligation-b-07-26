/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @param {string} locale - Locale code (default: en-US)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return '0';
  }

  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Format number as compact notation (e.g., 1.2K, 3.4M)
 * @param {number} num - Number to format
 * @returns {string} - Compact number string
 */
export const formatCompactNumber = (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return '0';
  }

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num);
};
