import { useState } from 'react';

import Navigation from '../components/presentational/category_tag/Navigation';
import CardContainer from '../components/presentational/category_tag/CardContainer';
import dummy from '../components/presentational/category_tag/CategoryTagDummy';

const CategoryTagPage = () => {
  const [navMenu, setNavMenu] = useState('category');

  return (
    <>
      <Navigation navMenu={navMenu} setNavMenu={setNavMenu} />
      <CardContainer dummy={navMenu === 'tag' ? dummy.tag : dummy.category} />
    </>
  );
};

export default CategoryTagPage;
