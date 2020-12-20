import { axiosAPI } from '../../util/axios';
import { getCookie } from '../../util/cookie';

export async function getTags() {
  const accountBookId = getCookie('accountBookId');
  const { data } = await axiosAPI(`accountBook/${accountBookId}`, 'GET');

  return data.tags;
}

export async function createTag({ tag }) {
  const accountBookId = getCookie('accountBookId');
  const { data } = await axiosAPI('/accountBook/tag', 'POST', {
    newTag: [tag],
    accountBookId,
  });

  return data;
}

export async function updateTag({ originalTag, newTag }) {
  const accountBookId = getCookie('accountBookId');
  const { data } = await axiosAPI(`/accountBook/tag`, 'PATCH', {
    originalTag,
    newTag,
    accountBookId,
  });

  return data;
}

export async function deleteTag({ tag }) {
  const accountBookId = getCookie('accountBookId');
  const { data } = await axiosAPI(
    `/accountBook/${accountBookId}/tag/${tag}`,
    'DELETE'
  );

  return data;
}
