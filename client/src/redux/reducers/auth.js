import { handleActions } from 'redux-actions';
import {
  setAccessToken,
  setUserInfo,
  setUserResume,
  setUserActiveResume,
} from '../actions/auth';

const initState = {
  accessToken: null,
  isAuth: false,
  userInfo: {},
  resume: null,
  activeResume: null,
};

export const reducerAuth = handleActions(
  {
    [setAccessToken]: (state, { payload: { accessToken } }) => {
      return { ...state, accessToken };
    },
    [setUserInfo]: (state, { payload: { userInfo, isAuth } }) => {
      return { ...state, userInfo, isAuth };
    },
    [setUserResume]: (state, { payload: { resume } }) => {
      return { ...state, resume };
    },
    [setUserActiveResume]: (state, { payload: { activeResume } }) => {
      return { ...state, activeResume };
    },
  },
  initState
);
