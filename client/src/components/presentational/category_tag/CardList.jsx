import { useState } from 'react';
import styled from 'styled-components';
import icon from '@public/icon';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import CategoryCard from './CategoryCard';
import TagCard from './TagCard';
import TransactionModal from './TransactionModal';

const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .inactive {
    display: none;
  }
`;

const AddTagBtn = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row-reverse;
  cursor: pointer;
  border: none;
  outline: none;
  position: absolute;
  top: -50px;
  right: 15px;
`;

const CardList = ({
  data,
  navMenu,
  onClickAdd,
  onClickChange,
  onClickDelete,
}) => {
  const [addMode, setAddMode] = useState(false);
  const [filterOption, setFilterOption] = useState(false);
  const transactions = useSelector((state) => state.default.transactions);

  const filterTransactions = (transactions) => {
    const copied = transactions.slice();
    const filtered = copied
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
      .filter((transaction) => {
        if (navMenu === 'tag') {
          return transaction.tag.includes(filterOption);
        }
        return transaction.category === filterOption;
      });

    return filtered;
  };

  const renderCategoryList = (categories) => {
    return categories.map(({ icon, title, description }) => {
      return (
        <CategoryCard
          key={uuid()}
          iconName={icon}
          title={title}
          description={description}
          setFilterOption={setFilterOption}
        />
      );
    });
  };

  const handleVisibility = (tag) => {
    if (addMode) return false;
    return tag.length ? false : true;
  };

  const renderTagList = (tags) => {
    return tags.concat(['']).map((tag) => {
      return (
        <TagCard
          key={uuid()}
          iconName="tagDefault"
          title={tag}
          onClickAdd={onClickAdd}
          onClickChange={onClickChange}
          onClickDelete={onClickDelete}
          hidden={handleVisibility(tag)}
          setAddMode={setAddMode}
          setFilterOption={setFilterOption}
        />
      );
    });
  };

  const onClickAddTag = () => setAddMode(!addMode);

  return (
    <>
      <CardListWrapper>
        {filterOption && (
          <TransactionModal
            filterOption={filterOption}
            setTransactionModal={setFilterOption}
            list={filterTransactions(transactions)}
          />
        )}
        {navMenu === 'tag' ? renderTagList(data) : renderCategoryList(data)}
        {navMenu === 'tag' && (
          <AddTagBtn onClick={onClickAddTag}>{icon.addBtn}</AddTagBtn>
        )}
      </CardListWrapper>
    </>
  );
};

export default CardList;
