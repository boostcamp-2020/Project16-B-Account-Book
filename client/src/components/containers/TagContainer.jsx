import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import CardList from '@presentational/category_tag/CardList';
import { loadTag, addTag, changeTag, removeTag } from '@slice';
import { successFormat, confirmFormat } from '@service/swalFormat';

const TagContainer = ({ navMenu }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTag());
  }, []);

  const tags = useSelector((state) => state.default.tags);

  const handleAddTag = (tag) => {
    dispatch(addTag({ tag }));
    Swal.fire(
      successFormat({
        position: 'center',
        title: '태그 생성이 완료되었습니다.',
      })
    );
  };

  const handleChangeTag = (originalTag, newTag) => {
    dispatch(changeTag({ originalTag, newTag }));
    Swal.fire(
      successFormat({
        position: 'center',
        title: '태그 수정이 완료되었습니다.',
      })
    );
  };

  const handleRemoveTag = (tag) => {
    Swal.fire(
      confirmFormat({
        position: 'top',
      })
    ).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeTag({ tag }));
        Swal.fire({
          text: `태그 삭제가 완료되었습니다.`,
        });
      }
    });
  };

  return (
    <>
      <CardList
        navMenu={navMenu}
        data={tags}
        onClickAdd={handleAddTag}
        onClickChange={handleChangeTag}
        onClickDelete={handleRemoveTag}
      />
    </>
  );
};

export default TagContainer;
