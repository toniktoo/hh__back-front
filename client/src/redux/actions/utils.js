import { createAction } from 'redux-actions';

export const setCountItemsOnPage = createAction('SET_COUNT_ITEMS_ON_PAGE');
export const changePage = createAction('CHANGE_PAGE');

export const setIsOpenModalSearch = createAction('SET_IS_TOGGLE_MODAL_SEARCH');
export const setIsOpenModalResume = createAction('SET_IS_TOGGLE_MODAL_RESUME');
export const toggleOpenAlertResume = createAction('SET_IS_TOGGLE_ALERT_RESUME');
export const setFirstLoaded = createAction('SET_FIRST_LOADED');
