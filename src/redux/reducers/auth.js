// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { REGISTER, RESET_REGISTER, LOGIN, LOGOUT, REFRESH_TOKEN } from '../actions/types';

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
};

// reducer authentication
const auth = (state = initialState, action) => {
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
      return {
        ...state,
        accessToken: action.payload.data,
        loginLoading: action.payload.loading,
        loginError: action.payload.errorMessage,
        userId: action.payload.userId,
        username: action.payload.username,
        email: action.payload.email,
        image_url: action.payload.image_url,
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
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.data,
        getTokenLoading: action.payload.loading,
        getTokenError: action.payload.errorMessage,
        userId: action.payload.userId,
        username: action.payload.username,
        email: action.payload.email,
        image_url: action.payload.image_url,
      };
    default:
      return state;
  }
};

export default auth;
