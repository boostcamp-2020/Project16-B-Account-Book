import { useEffect, useState } from 'react';
import styled from 'styled-components';

import AnalysisDate from './AnalysisDate';
import CumulativeExpenditure from './CumulativeExpenditure';
import CumulativeAnalysis from './CumulativeAnalysis';
import TopCard from './TopCard';
import Checkboxes from './Checkboxes';
import MonthlyExpenditure from './MonthlyExpenditure';
import MonthlyAnalysis from './MonthlyAnalysis';
import { getCurrentDateTransactions } from '@util/transaction';

const TopCardWrapper = styled.div`
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const CumulativeContentWrapper = styled.div`
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const MonthlyAnalysisWrapper = styled.div`
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const parseDate = (transaction) => {
  const dateObj = new Date(transaction.date);

  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
    date: dateObj.getDate(),
  };
};

const copyTransactions = (transactions) =>
  transactions
    .filter((transaction) => transaction.type === '지출')
    .map((transaction) => {
      return Object.assign({}, transaction, {
        parsedDate: parseDate(transaction),
      });
    });

const findTop3BySortOption = (transactions, sortOption) => {
  const map = new Map();

  transactions.forEach((transaction) => {
    let name = transaction.description;
    let cost = transaction.cost;

    if (map.has(name)) {
      map.set(name, {
        cost: map.get(name).cost + cost,
        count: map.get(name).count + 1,
      });
    } else {
      map.set(name, {
        cost,
        count: 1,
      });
    }
  });

  return [...map.entries()]
    .sort((a, b) => {
      if (b[1][sortOption] === a[1][sortOption]) {
        if (sortOption === 'cost') {
          return a[1].count - b[1].count;
        }
        if (sortOption === 'count') {
          return b[1].cost - a[1].cost;
        }
      }

      return b[1][sortOption] - a[1][sortOption];
    })
    .slice(0, 3)
    .map((transaction) => {
      return {
        description: transaction[0],
        cost: transaction[1].cost,
        count: transaction[1].count,
      };
    });
};

const getCategoriesAndTags = (transactions) => {
  const categorySet = new Set();
  const tagSet = new Set();
  transactions.forEach(({ category, tag }) => {
    if (category) {
      categorySet.add(category);
    }
    if (tag.length) {
      for (let i = 0; i < tag.length; i++) {
        if (tag[i] === '') continue;
        tagSet.add(tag[i]);
      }
    }
  });

  return [[...categorySet], [...tagSet]];
};

const filterByCheckbox = (copied, categoryCheckbox, tagCheckbox, mode) => {
  if (mode === '카테고리') {
    return copied.filter(
      (transaction) => categoryCheckbox[transaction.category]
    );
  }

  return copied.filter((transaction) => {
    if (!transaction.tag.length) return true;
    return transaction.tag.some((t) => {
      return t in tagCheckbox && tagCheckbox[t];
    });
  });
};

const modeConfig = {
  tag: '태그',
  category: '카테고리',
};

const initCheckbox = (items, itemType, location, mode) => {
  if (!location?.state) {
    return items.reduce((acc, cur) => {
      acc[cur] = modeConfig[itemType] === mode;
      return acc;
    }, {});
  }

  const { type, name } = location.state;
  const initState = flipToFalse(items);

  if (itemType !== type) {
    return initState;
  }

  if (name && Object.hasOwnProperty.call(initState, name)) {
    return { ...initState, [name]: true };
  }

  return initState;
};

const flipToFalse = (checkbox) => {
  const newCheckbox = { ...checkbox };
  Object.keys(newCheckbox).forEach((key) => (newCheckbox[key] = false));
  return newCheckbox;
};

const getAnnualTransactions = (transactions, year, month) => {
  const copied = copyTransactions(transactions);
  return copied.filter((transaction) => {
    const date = transaction.parsedDate;
    if (date.year === year) {
      return date.month <= month;
    }
    if (date.year === year - 1) {
      return date.month >= month;
    }
    return false;
  });
};

const parseAnnualTransactions = (transactions, year, month) => {
  const data = [];
  for (let i = month; i >= 1; i--) {
    data.unshift({
      year,
      month: i,
      월별: 0,
    });
  }
  for (let i = 12; i >= month; i--) {
    data.unshift({
      year: year - 1,
      month: i,
      월별: 0,
    });
  }

  data.forEach((d) => {
    d['월별'] = transactions.reduce((acc, cur) => {
      const { year, month } = cur.parsedDate;
      if (d.year === year && d.month === month) {
        return acc + cur.cost;
      }
      return acc;
    }, 0);
  });

  return data;
};

const AnalysisForm = ({
  date,
  setDate,
  transactions,
  location,
  setLocState,
}) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const filteredTransactions = getCurrentDateTransactions(
    { year, month },
    transactions
  );

  const copied = copyTransactions(filteredTransactions);
  const [categories, tags] = getCategoriesAndTags(copied);
  const [categoryCheckbox, setCategoryCheckbox] = useState({});
  const [tagCheckbox, setTagCheckbox] = useState({});
  const initialMode = location?.state?.type === 'tag' ? '태그' : '카테고리';
  const [mode, setMode] = useState(initialMode);

  const filtered = filterByCheckbox(
    copied,
    categoryCheckbox,
    tagCheckbox,
    mode
  );

  const top3CostTransactions = findTop3BySortOption(filtered, 'cost');
  const top3CaseTransactions = findTop3BySortOption(filtered, 'count');

  const annualTransactions = getAnnualTransactions(transactions, year, month);
  const parsedAnnualTransactions = parseAnnualTransactions(
    annualTransactions,
    year,
    month
  );

  useEffect(() => {
    setCategoryCheckbox(initCheckbox(categories, 'category', location, mode));
    setTagCheckbox(initCheckbox(tags, 'tag', location, mode));
  }, [transactions, date]);

  useEffect(() => {
    if (mode === '카테고리') {
      return setTagCheckbox(flipToFalse(tagCheckbox));
    }
    if (mode === '태그') {
      return setCategoryCheckbox(flipToFalse(categoryCheckbox));
    }
  }, [mode]);

  return (
    <>
      <AnalysisDate date={date} setDate={setDate} setLocState={setLocState} />
      <Checkboxes
        checkboxes={categoryCheckbox}
        setCheckbox={setCategoryCheckbox}
        title="카테고리"
        mode={mode}
        setMode={setMode}
      />
      <Checkboxes
        checkboxes={tagCheckbox}
        setCheckbox={setTagCheckbox}
        title="태그"
        mode={mode}
        setMode={setMode}
      />
      <CumulativeContentWrapper>
        <CumulativeExpenditure title="일별 누적 지출" transactions={filtered} />
        <CumulativeAnalysis
          title="일별 누적 분석"
          date={date}
          transactions={filtered}
        />
      </CumulativeContentWrapper>
      <TopCardWrapper>
        <TopCard title="지출 금액 Top3" transactions={top3CostTransactions} />
        <TopCard title="지출 건수 Top3" transactions={top3CaseTransactions} />
      </TopCardWrapper>
      <MonthlyAnalysisWrapper>
        <MonthlyExpenditure
          title="월별 지출"
          transactions={parsedAnnualTransactions.map((t) => ({
            ...t,
            월별: t['월별'] / 10000,
          }))}
        />
        <MonthlyAnalysis
          title="월별 분석"
          transactions={parsedAnnualTransactions}
        />
      </MonthlyAnalysisWrapper>
    </>
  );
};

export default AnalysisForm;
