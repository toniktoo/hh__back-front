import { handleActions } from 'redux-actions';
import {
  fetchSnippetVacanciesRequest,
  fetchSnippetVacanciesSuccess,
  fetchSnippetVacanciesFailure,
  fetchFullVacanciesRequest,
  fetchFullVacanciesSuccess,
  fetchFullVacanciesFailure,
} from '../actions/jobs';

const initState = {
  fullVacancies: [
    {
      id: 0,
      name: 'Вакансий не найдено',
      published_at: '2020-07-09T09:19:54+0300',
      experience: { name: '1' },
    },
  ],
  snippetVacancies: [],
  isLoadingData: false,
};

export const reducerJobs = handleActions(
  {
    /* SNIPPETS VACANCIES */

    [fetchSnippetVacanciesRequest]: (state, { payload: { isLoadingData } }) => {
      return { ...state, isLoadingData };
    },
    [fetchSnippetVacanciesSuccess]: (
      state,
      { payload: { snippetVacancies, isLoadingData } }
    ) => {
      return { ...state, snippetVacancies, isLoadingData };
    },
    [fetchSnippetVacanciesFailure]: (state, { payload: { isLoadingData } }) => {
      return { ...state, isLoadingData };
    },

    /* FULL VACANCIES */

    [fetchFullVacanciesRequest]: (state, { payload: { isLoadingData } }) => {
      return { ...state, isLoadingData };
    },
    [fetchFullVacanciesSuccess]: (
      state,
      { payload: { fullVacancies, isLoadingData } }
    ) => {
      return { ...state, fullVacancies, isLoadingData };
    },
    [fetchFullVacanciesFailure]: (state, { payload: { isLoadingData } }) => {
      return { ...state, isLoadingData };
    },
  },
  initState
);
