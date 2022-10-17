import { combineReducers } from 'redux';

// mengimport beberapa reducer
import auth from './auth';
import user from './user';
import sidebar from './sidebar';
import mainForum from './mainForum';
import subForum from './subForum';

// menggabungkan beberapa reducer
export default combineReducers({ auth, user, sidebar, mainForum, subForum });
