// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { REGISTER, LOGIN, LOGOUT } from '../actions/types';

// state awal untuk authentication
const initialState = {
  registerResult: false,
  registerLoading: false,
  registerError: false,

  loginResult: false,
  loginLoading: false,
  loginError: false,

  logoutResult: false,
  logoutLoading: false,
  logoutError: false,
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
    case LOGIN:
      return {
        ...state,
        loginResult: action.payload.data,
        loginLoading: action.payload.loading,
        loginError: action.payload.errorMessage,
      };
    case LOGOUT:
      return {
        ...state,
        loginResult: false,
        logoutResult: action.payload.data,
        logoutLoading: action.payload.loading,
        logoutError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default auth;
