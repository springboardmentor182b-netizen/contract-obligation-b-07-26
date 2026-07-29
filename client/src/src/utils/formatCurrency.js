export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${currency} ${amount}`;
  }
};

export const parseCurrency = (currencyString) => {
  const cleaned = currencyString.replace(/[^0-9.-]+/g, '');
  return parseFloat(cleaned);
};
