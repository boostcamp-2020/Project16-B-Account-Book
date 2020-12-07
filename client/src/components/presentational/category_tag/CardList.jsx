import { useState } from 'react';
import styled from 'styled-components';
import icon from '@public/icon';
import { v4 as uuid } from 'uuid';

import CategoryCard from './CategoryCard';
import TagCard from './TagCard';

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

  const renderCategoryList = (categories) => {
    return categories.map(({ icon, title, description }) => {
      return (
        <CategoryCard
          key={uuid()}
          iconName={icon}
          title={title}
          description={description}
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
        />
      );
    });
  };

  const onClickAddTag = () => setAddMode(!addMode);

  return (
    <>
      <CardListWrapper>
        {navMenu === 'tag' ? renderTagList(data) : renderCategoryList(data)}
        {navMenu === 'tag' && (
          <AddTagBtn onClick={onClickAddTag}>{icon.addBtn}</AddTagBtn>
        )}
      </CardListWrapper>
    </>
  );
};

export default CardList;
