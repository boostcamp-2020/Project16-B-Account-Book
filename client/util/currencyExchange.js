const currencyExchange = (cost, currency) => {
  const exchangeRate = getExchangeRate(
    currency || getCurrencyFromCostText(cost)
  );
  if (exchangeRate) {
    return Math.floor(Number(cost.replace(/[^\d]/g, '')) * exchangeRate);
  }
  return cost.replace(/[^\d]/g, '');
};

const getCurrencyFromCostText = (cost) => {
  return currencySign[cost.replace(/[0-9]/g, '')];
};

const getExchangeRate = (currency) => {
  return exchangeCurrencyToWon[currency];
};

const currencySign = {
  $: 'USD',
  '€': 'EUR',
  '₽': 'RUB',
  元: 'CNY',
  円: 'JPY',
};

const exchangeCurrencyToWon = {
  USD: 1091.4,
  EUR: 1324.8,
  RUB: 14.93,
  CNY: 167.29,
  JPY: 1048.97,
};

export default currencyExchange;
