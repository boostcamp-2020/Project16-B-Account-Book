const date = new Date();

const SetDateList = () => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  let beforeYear = null;
  let beforeMonth = null;

  let DateList = [];

  for (let i = 0; i < 6; i++) {
    const diff = month - i;

    if (diff <= 0) {
      beforeMonth = 12 + diff;
      beforeYear = year - 1;
    } else {
      beforeMonth = diff;
      beforeYear = year;
    }

    DateList.push({
      title: `${beforeYear}년 ${beforeMonth}월`,
      year: beforeYear,
      month: beforeMonth,
    });
  }

  return DateList;
};

export default SetDateList;
