import { combineReducers } from 'redux';

// mengimport beberapa reducer
import auth from './auth';
import refreshToken from './refreshToken';
import user from './user';
import sidebar from './sidebar';

// menggabungkan beberapa reducer
export default combineReducers({ auth, refreshToken, user, sidebar });
