import { combineReducers } from 'redux';

import { reducerVacancies } from './reducers/vacancies';
import { reducerUtils } from './reducers/utils';
import { reducerAuth } from './reducers/auth';
import { reducerUserInfo } from './reducers/userInfo';

export const rootReducer = combineReducers({
  reducerVacancies,
  reducerUtils,
  reducerAuth,
  reducerUserInfo,
});
