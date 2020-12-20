import { categoryTitles } from '@presentational/category_tag/categories';

export const transactionValidationFormatter = (key, value) => {
  switch (key) {
    case 'date':
      if (dateRegex.test(value)) {
        return value;
      }
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      return `${year}-${month}-${day}`;
    case 'time':
      if (timeRegex.test(value)) {
        return value;
      }
      return;
    case 'category':
      if (categoryTitles.includes(value)) {
        return value;
      }
      return;
    case 'paymentMethod':
      return value;
    case 'cost':
      return value;
    case 'currency':
      return value;
    case 'type':
      if (value === '수입' || value === '지출') {
        return value;
      }
      return '지출';
    case 'description':
      return value;
  }
};

const dateRegex = /^[0-9]{4}[\/\-][0-9]{2}[\/\-][0-9]{2}$/;
const timeRegex = /^[0-9]{2}[\:][0-9]{2}[\:]?([0-9]{2})?$/;
