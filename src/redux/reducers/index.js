import { combineReducers } from 'redux';

// mengimport beberapa reducer
import auth from './auth';
import user from './user';
import sidebar from './sidebar';
import category from './category';
import post from './post';

// menggabungkan beberapa reducer
export default combineReducers({ auth, user, sidebar, category, post });
