import { handleActions } from 'redux-actions';
import {
  changePage,
  setIsOpenModalSearch,
  setCountItemsOnPage,
  setFirstLoaded,
} from '../actions/utils';

const initState = {
  currentPage: 1,
  countItemsOnPage: 10,
  isOpenModalSearch: true,
  firstLoaded: false,
};

export const reducerUtils = handleActions(
  {
    [changePage]: (state, { payload: { currentPage } }) => {
      return { ...state, currentPage };
    },
    [setCountItemsOnPage]: (state, { payload: { count } }) => {
      return { ...state, countItemsOnPage: count };
    },
    [setIsOpenModalSearch]: (state, { payload: { isOpenModalSearch } }) => {
      return { ...state, isOpenModalSearch };
    },
    [setFirstLoaded]: (state, { payload: { firstLoadedApp } }) => {
      return { ...state, firstLoadedApp };
    },
  },
  initState
);
