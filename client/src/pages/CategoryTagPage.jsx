import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Navigation from '../components/presentational/category_tag/Navigation';
import CardList from '../components/presentational/category_tag/CardList';
import TagContainer from '../components/containers/TagContainer';
import { loadTag } from '@slice';
import categories from '../components/presentational/category_tag/categories';

const CategoryTagPage = () => {
  const [navMenu, setNavMenu] = useState('category');
  const dispatch = useDispatch();

  dispatch(loadTag({ accountBookId: '5fc713abd120a78e5c18216d' }));

  return (
    <>
      <Navigation navMenu={navMenu} setNavMenu={setNavMenu} />
      {navMenu === 'category' ? (
        <CardList data={categories} navMenu={navMenu} />
      ) : (
        <TagContainer navMenu={navMenu} />
      )}
    </>
  );
};

export default CategoryTagPage;
