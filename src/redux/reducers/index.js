import { combineReducers } from 'redux';

// mengimport beberapa reducer
import auth from './auth';
import user from './user';
import sidebar from './sidebar';
import category from './category';
import post from './post';
import comment from './comment';
import theme from './theme';

// menggabungkan beberapa reducer
export default combineReducers({ auth, user, sidebar, category, post, comment, theme });
