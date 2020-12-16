export const getCurrentDateTransactions = (date, transactions) => {
  return transactions.filter((transaction) => {
    if (transaction.date) {
      const [year, month] = transaction?.date.split('-');
      return year == date.year && month == date.month;
    }
    return;
  });
};

export const getTransactionsByCard = (transactions) => {
  return transactions.reduce((acc, cur) => {
    const index = acc.findIndex(
      (item) =>
        item.paymentMethod === cur.paymentMethod && item.type === cur.type
    );
    if (acc[index]) {
      acc[index].cost += cur.cost;
      return acc;
    }
    return [
      ...acc,
      { paymentMethod: cur.paymentMethod, cost: cur.cost, type: cur.type },
    ];
  }, []);
};

export const getTransactionsByCategory = (transactions) => {
  return transactions
    .reduce((acc, cur) => {
      if (cur.type === '수입') {
        return acc;
      }
      const index = acc.findIndex((item) => item.name === cur.category);
      if (acc[index]) {
        acc[index].value += cur.cost;
        return acc;
      }
      return [...acc, { name: cur.category, value: cur.cost }];
    }, [])
    .sort((a, b) => {
      if (a.cost > b.cost) {
        return 1;
      }
      if (a.cost < b.cost) {
        return -1;
      }
      return 1;
    });
};
