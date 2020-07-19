import { handleActions } from 'redux-actions';
import { setAccessToken, setUserInfo } from '../actions/auth';

const initState = {
  accessToken: null,
  userInfo: {},
  isAuth: false
};

export const reducerAuth = handleActions(
  {
    [setAccessToken]: (state, { payload: { accessToken } }) => {
      return { ...state, accessToken };
    },
    [setUserInfo]: (state, { payload: { userInfo, isAuth } }) => {
      return { ...state, userInfo, isAuth };
    },
  },
  initState
);
