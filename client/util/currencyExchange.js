const currencyExchange = (amount, currency) => {
  if (exchangeCurrencyToWon[currency]) {
    return amount * exchangeCurrencyToWon[currency];
  }
  return amount;
};

const exchangeCurrencyToWon = {
  USD: 1091.4,
  EUR: 1324.8,
  RUB: 14.93,
  CNY: 167.29,
  JPY: 1048.97,
};

export default currencyExchange;
