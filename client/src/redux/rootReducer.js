import { combineReducers } from 'redux';

import { reducerJobs } from './reducers/jobs';
import { reducerUtils } from './reducers/utils';
import { reducerAuth } from './reducers/auth';
import { reducerUserInfo } from './reducers/userInfo';

export const rootReducer = combineReducers({
  reducerJobs,
  reducerUtils,
  reducerAuth,
  reducerUserInfo,
});
