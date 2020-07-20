import { handleActions } from 'redux-actions';
import {
  changeExperience,
  changeCity,
  changeSalary,
} from '../actions/userInfo';

const initState = {
  experience: 1,
  city: { title: 'Москва', areaId: 1 },
  salary: null,
};

export const reducerUserInfo = handleActions(
  {
    [changeCity]: (state, { payload: { city } }) => {
      return { ...state, city };
    },
    [changeExperience]: (state, { payload: { experience } }) => {
      return { ...state, experience };
    },
    [changeSalary]: (state, { payload: { salary } }) => {
      return { ...state, salary };
    },
  },
  initState
);
