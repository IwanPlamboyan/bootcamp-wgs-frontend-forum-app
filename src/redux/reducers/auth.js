// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { REGISTER, RESET_REGISTER, LOGIN, LOGOUT, RESET_LOGOUT, REFRESH_TOKEN } from '../actions/types';
import jwt_decoded from 'jwt-decode';

// state awal untuk authentication
const initialState = {
  accessToken: false,

  registerResult: false,
  registerLoading: false,
  registerError: false,

  loginLoading: false,
  loginError: false,

  logoutResult: false,
  logoutLoading: false,
  logoutError: false,

  getTokenLoading: false,
  getTokenError: false,
  userId: false,
  username: false,
  email: false,
  image_url: '',
  roles: false,
};

// reducer authentication
const auth = (state = initialState, action) => {
  const user = [state.userId, state.username, state.email, state.image_url, state.roles];
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registerResult: action.payload.data,
        registerLoading: action.payload.loading,
        registerError: action.payload.errorMessage,
      };
    case RESET_REGISTER:
      return {
        ...state,
        registerResult: false,
        registerLoading: false,
        registerError: false,
      };
    case LOGIN:
      if (action.payload.data) {
        const decoded = jwt_decoded(action.payload.data.accessToken);
        user[0] = decoded.userId;
        user[1] = decoded.username;
        user[2] = decoded.email;
        user[3] = decoded.image_url;
        user[4] = decoded.roles;
      }
      return {
        ...state,
        accessToken: action.payload.data,
        loginLoading: action.payload.loading,
        loginError: action.payload.errorMessage,
        userId: user[0],
        username: user[1],
        email: user[2],
        image_url: user[3],
        roles: user[4],
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: false,
        logoutResult: action.payload.data,
        logoutLoading: action.payload.loading,
        logoutError: action.payload.errorMessage,
        userId: false,
        username: false,
        email: false,
        image_url: false,
        roles: false,
      };
    case RESET_LOGOUT:
      return {
        ...state,
        logoutResult: false,
        logoutLoading: false,
        logoutError: false,
      };
    case REFRESH_TOKEN:
      if (action.payload.data) {
        const decoded = jwt_decoded(action.payload.data.accessToken);
        user[0] = decoded.userId;
        user[1] = decoded.username;
        user[2] = decoded.email;
        user[3] = decoded.image_url;
        user[4] = decoded.roles;
      }
      return {
        ...state,
        accessToken: action.payload.data,
        getTokenLoading: action.payload.loading,
        getTokenError: action.payload.errorMessage,
        userId: user[0],
        username: user[1],
        email: user[2],
        image_url: user[3],
        roles: user[4],
      };
    default:
      return state;
  }
};

export default auth;
