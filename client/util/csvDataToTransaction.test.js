import csvDataToTransaction from './csvDataToTransaction';

test('csvDataToTransaction', () => {
  const data = {
    header: [
      'date',
      'type',
      'cost',
      'description',
      'category',
      'paymentMethod',
    ],
    rows: [
      ['2020-12-06', '수입', '124560', '로또 1등', '기타수입', '네이버'],
      ['2020-10-04', '지출', '20000', '파스타', '식사', 'KB 국민카드'],
      ['2020-10-02', '지출', '30000', '술', '술/유흥', '현대카드'],
      ['2020-12-01', '지출', '50000', '마트', '생활/마트', 'KB 국민카드'],
      ['2020-12-01', '지출', '12000', '교통비', '교통', '현대카드'],
      [],
    ],
  };
  expect(csvDataToTransaction(data)).toEqual([
    {
      category: '기타수입',
      cost: '124560',
      date: '2020-12-06',
      description: '로또 1등',
      paymentMethod: '네이버',
      type: '수입',
    },
    {
      category: '식사',
      cost: '20000',
      date: '2020-10-04',
      description: '파스타',
      paymentMethod: 'KB 국민카드',
      type: '지출',
    },
    {
      category: '술/유흥',
      cost: '30000',
      date: '2020-10-02',
      description: '술',
      paymentMethod: '현대카드',
      type: '지출',
    },
    {
      category: '생활/마트',
      cost: '50000',
      date: '2020-12-01',
      description: '마트',
      paymentMethod: 'KB 국민카드',
      type: '지출',
    },
    {
      category: '교통',
      cost: '12000',
      date: '2020-12-01',
      description: '교통비',
      paymentMethod: '현대카드',
      type: '지출',
    },
  ]);
});
