module.exports = function (source) {
  const result = { header: undefined, rows: [] };
  const rows = source.split('\n');

  rows.forEach((row) => {
    const columns = row.split(',');
    if (!result.header) {
      result.header = columns;
      return;
    }
    result.rows = [...result.rows, columns];
  });

  return `export default ${JSON.stringify(result)}`;
};
