import { createAction } from 'redux-actions';
import queries from '../../api/index';

export const setAccessToken = createAction('SET_ACCESS_TOKEN');
export const setUserInfo = createAction('SET_USER_INFO');
export const setUserResume = createAction('SET_USER_RESUME');
export const setUserActiveResume = createAction('SET_USER_ACTIVE_RESUME');

/* TOOD ДОПИСАТЬ REQUEST SUCCESS FAILURE  для экшенов ниже!!!! */

export const checkAuthUserApi = () => async (dispatch) => {
  try {
    const resTokenBackend = await queries.getTokenBackend();
    if (resTokenBackend) {
      dispatch(setAccessToken({ accessToken: resTokenBackend.accessToken }));
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ accessToken: resTokenBackend.accessToken })
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserInfoApi = ({ accessToken }) => async (dispatch) => {
  try {
    const resUserInfo = await queries.getUserInfo({
      accessToken,
    });
    dispatch(setUserInfo({ userInfo: resUserInfo, isAuth: true }));
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserResumeApi = ({ accessToken }) => async (dispatch) => {
  try {
    const resResume = await queries.getUserResume({
      accessToken,
    });
    dispatch(setUserResume({ resume: resResume }));
    dispatch(setUserActiveResume({ activeResume: resResume.items[0] }));
  } catch (err) {
    console.log(err);
  }
};
