export const getCurrentDateTransactions = (date, transactions) => {
  return transactions.filter((transaction) => {
    if (transaction.date) {
      const [year, month] = transaction?.date.split('-');
      return year == date.year && month == date.month;
    }
    return;
  });
};
