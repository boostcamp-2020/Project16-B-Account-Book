import Category from './Category';
import beer2 from '@public/img/beer2.jpg';
import 식사 from '@public/img/식사.jpeg';
import 마트 from '@public/img/마트.jpg';
import coffee2 from '@public/img/coffee2.png';
import onlineShopping from '@public/img/online-shopping.jpg';

const categorySection = ({ transactions }) => {
  const transactionObject = {};
  transactions.forEach((transaction) => {
    transactionObject[transaction.name] = transaction.value;
  });

  return (
    <>
      {transactionObject['술/유흥'] && (
        <Category
          image={beer2}
          text={`술/유흥 ${transactionObject['술/유흥'].toLocaleString()}원`}
          redirectCategory={'술/유흥'}
        />
      )}
      {transactionObject['식사'] && (
        <Category
          image={식사}
          text={`식사 ${transactionObject['식사'].toLocaleString()}원`}
          redirectCategory={'식사'}
        />
      )}
      {transactionObject['카페/간식'] && (
        <Category
          image={coffee2}
          text={`카페/간식 ${transactionObject[
            '카페/간식'
          ].toLocaleString()}원`}
          redirectCategory={'카페/간식'}
        />
      )}
      {transactionObject['생활/마트'] && (
        <Category
          image={마트}
          text={`생활/마트 ${transactionObject[
            '생활/마트'
          ].toLocaleString()}원`}
          redirectCategory={'생활/마트'}
        />
      )}
      {transactionObject['온라인쇼핑'] && (
        <Category
          image={onlineShopping}
          text={`온라인쇼핑 ${transactionObject[
            '온라인쇼핑'
          ].toLocaleString()}원`}
          redirectCategory={'온라인쇼핑'}
        />
      )}
    </>
  );
};

export default categorySection;
