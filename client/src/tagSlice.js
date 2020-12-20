import { createSlice } from '@reduxjs/toolkit';

import { getTags, createTag, updateTag, deleteTag } from './services/tagAPI';

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
  },
  reducers: {
    setTags(state, { payload: tags }) {
      return {
        ...state,
        tags,
      };
    },
  },
});

export const { setTags } = tagSlice.actions;

export const loadTag = () => {
  return async (dispatch) => {
    const tags = await getTags();

    dispatch(setTags(tags));
  };
};

export const addTag = ({ tag }) => {
  return async (dispatch) => {
    await createTag({ tag });

    dispatch(loadTag());
  };
};

export const changeTag = ({ originalTag, newTag }) => {
  return async (dispatch) => {
    await updateTag({ originalTag, newTag });

    dispatch(loadTag());
  };
};

export const removeTag = ({ tag }) => {
  return async (dispatch) => {
    await deleteTag({ tag });

    dispatch(loadTag());
  };
};

export default tagSlice;
