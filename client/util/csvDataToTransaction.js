const csvDataToTransaction = (datas) => {
  return datas.rows
    .map((row) => {
      if (!row[0]) {
        return;
      }
      const data = {};
      datas.header.forEach((head, i) => {
        data[head] = row[i];
      });
      return data;
    })
    .filter((e) => e);
};

export default csvDataToTransaction;
