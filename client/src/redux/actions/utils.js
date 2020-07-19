import { createAction } from 'redux-actions';

export const setCountItemsOnPage = createAction('SET_COUNT_ITEMS_ON_PAGE');
export const changePage = createAction('CHANGE_PAGE');

export const setIsOpenModalSearch = createAction('SET_IS_OPEN_MODAL');
export const setFirstLoaded = createAction('SET_FIRST_LOADED');
