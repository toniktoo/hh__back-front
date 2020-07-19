import { createAction } from 'redux-actions';

export const fetchSnippetVacanciesRequest = createAction(
  'FETCH_SNIPPER_VACANCIES_REQUEST'
);
export const fetchSnippetVacanciesSuccess = createAction(
  'FETCH_SNIPPER_VACANCIES_SUCCESS'
);
export const fetchSnippetVacanciesFailure = createAction(
  'FETCH_SNIPPER_VACANCIES_FAILURE'
);

export const fetchFullVacanciesRequest = createAction(
  'FETCH_FULL_VACANCIES_REQUEST'
);
export const fetchFullVacanciesSuccess = createAction(
  'FETCH_FULL_VACANCIES_SUCCESS'
);
export const fetchFullVacanciesFailure = createAction(
  'FETCH_FULL_VACANCIES_FAILURE'
);

