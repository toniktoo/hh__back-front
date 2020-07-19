import { handleActions } from 'redux-actions';
import { changeExperience, changeCity } from '../actions/userInfo';

const initState = {
  experience: 1,
  city: { title: 'Москва', areaId: 1 },
};

export const reducerUserInfo = handleActions(
  {
    [changeCity]: (state, { payload: { city } }) => {
      return { ...state, city };
    },

    [changeExperience]: (state, { payload: { experience } }) => {
      return { ...state, experience };
    },
  },
  initState
);
