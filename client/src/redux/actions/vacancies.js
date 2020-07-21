import { createAction } from 'redux-actions';
import queries from '../../api/index';
import { toggleOpenAlertResume } from './utils';

export const fetchSnippetVacanciesRequest = createAction(
  'FETCH_SNIPPET_VACANCIES_REQUEST'
);
export const fetchSnippetVacanciesSuccess = createAction(
  'FETCH_SNIPPET_VACANCIES_SUCCESS'
);
export const fetchSnippetVacanciesFailure = createAction(
  'FETCH_SNIPPET_VACANCIES_FAILURE'
);

/* Опыт работы */

const validateExperience = (experience) => {
  switch (experience) {
    case 1:
      return '';
    case 2:
      return '&experience=noExperience';
    case 3:
      return '&experience=between1And3';
    case 4:
      return '&experience=between3And6';
    default:
      return '';
  }
};

const validateSalary = (salary) => {
  if (salary === null || salary === '') {
    return '';
  }
  return `&salary=${salary}&only_with_salary=true`;
};

export const fetchSnippetVacanciesApi = ({
  accessToken,
  textSearch,
  areaId,
  countItemsOnPage,
  currentPage,
  experience,
  salary,
}) => async (dispatch) => {
  dispatch(fetchSnippetVacanciesRequest({ isLoadingData: true }));
  try {
    /* Получаем краткое описание вакансий */
    const snippetVacancies = await queries.getVacancies({
      accessToken,
      textSearch,
      areaId,
      countItemsOnPage,
      currentPage,
      experience: validateExperience(experience),
      salary: validateSalary(salary),
    });
    dispatch(
      fetchSnippetVacanciesSuccess({ snippetVacancies, isLoadingData: false })
    );
  } catch (err) {
    dispatch(fetchSnippetVacanciesFailure({ isLoadingData: false }));
  }
};

export const fetchFullVacanciesRequest = createAction(
  'FETCH_FULL_VACANCIES_REQUEST'
);
export const fetchFullVacanciesSuccess = createAction(
  'FETCH_FULL_VACANCIES_SUCCESS'
);
export const fetchFullVacanciesFailure = createAction(
  'FETCH_FULL_VACANCIES_FAILURE'
);

export const fetchFullVacanciesApi = ({
  snippetVacancies,
  accessToken,
}) => async (dispatch) => {
  dispatch(fetchFullVacanciesRequest({ isLoadingData: true }));
  try {
    let arrayIds = [];
    /* Получаем все id вакансий из краткого описания вакансий (snippetVacancies) */
    await snippetVacancies.items.forEach((item) => arrayIds.push(item.id));

    const fullVacancies = [];
    /* Отправляем запрос по каждой id чтобы получить описане полной вакансии */
    await arrayIds.forEach(async (id, index) => {
      const vacancy = await queries.getVacancy({ id,accessToken });
      await fullVacancies.push(vacancy);
      await arrayIds.shift();
      if (0 === arrayIds.length) {
        dispatch(
          fetchFullVacanciesSuccess({
            fullVacancies,
            isLoadingData: false,
            accessToken,
          })
        );
      }
    });
  } catch (err) {
    dispatch(fetchFullVacanciesFailure({ isLoadingData: false }));
  }
};

export const sendUserResumeRequest = createAction('SEND_RESUME_REQUEST');
export const sendUserResumeSuccess = createAction('SEND_RESUME_SUCCESS');
export const sendUserResumeFailure = createAction('SEND_RESUME_FAILURE');

export const sendUserResumeApi = ({
  accessToken,
  vacancyId,
  resumeId,
}) => async (dispatch) => {
  dispatch(sendUserResumeRequest());
  try {
    const res = queries.sendResume({ accessToken, vacancyId, resumeId });
    console.log(res);
    dispatch(toggleOpenAlertResume({ isOpenAlertResume: true }));
    setTimeout(() => {
      dispatch(toggleOpenAlertResume({ isOpenAlertResume: false }));
    }, 1000);
  } catch (err) {
    dispatch(sendUserResumeFailure());
  }
};
