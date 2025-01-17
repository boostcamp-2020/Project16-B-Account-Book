import { useState } from 'react';

import Navigation from '../components/presentational/category_tag/Navigation';
import CardList from '../components/presentational/category_tag/CardList';
import TagContainer from '../components/containers/TagContainer';
import categories from '../components/presentational/category_tag/categories';

const CategoryTagPage = () => {
  const [navMenu, setNavMenu] = useState('category');

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
