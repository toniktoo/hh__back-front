import { handleActions } from 'redux-actions';
import {
  changePage,
  setIsOpenModalSearch,
  setIsOpenModalResume,
  setCountItemsOnPage,
  setFirstLoaded,
  toggleOpenAlertResume,
} from '../actions/utils';

const initState = {
  currentPage: 1,
  countItemsOnPage: 10,
  isOpenModalSearch: true,
  isOpenModalResume: false,
  isOpenAlertResume: false,
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
    [setIsOpenModalResume]: (state, { payload: { isOpenModalResume } }) => {
      return { ...state, isOpenModalResume };
    },
    [setFirstLoaded]: (state, { payload: { firstLoadedApp } }) => {
      return { ...state, firstLoadedApp };
    },
    [toggleOpenAlertResume]: (state, { payload: { isOpenAlertResume } }) => {
      return { ...state, isOpenAlertResume };
    },
  },
  initState
);
