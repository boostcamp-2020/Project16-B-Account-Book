import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import CardList from '@presentational/category_tag/CardList';
import { addTag, changeTag, removeTag } from '@slice';
import { successFormat, confirmFormat } from '@service/swalFormat';

const TagContainer = ({ navMenu }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);

  const handleAddTag = (accountBookId, tag) => {
    dispatch(addTag({ accountBookId, tag }));
    Swal.fire(
      successFormat({
        position: 'center',
        title: '태그 생성이 완료되었습니다.',
      })
    );
  };

  const handleChangeTag = (accountBookId, originalTag, newTag) => {
    dispatch(changeTag({ accountBookId, originalTag, newTag }));
    Swal.fire(
      successFormat({
        position: 'center',
        title: '태그 수정이 완료되었습니다.',
      })
    );
  };

  const handleRemoveTag = (accountBookId, tag) => {
    Swal.fire(
      confirmFormat({
        position: 'top',
      })
    ).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeTag({ accountBookId, tag }));
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
