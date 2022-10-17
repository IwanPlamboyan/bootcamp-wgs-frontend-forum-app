// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { GET_USER_BY_USERNAME, EDIT_PROFILE } from '../actions/types';

// state awal untuk data user yang login
const initialState = {
  getUserByUsernameResult: false,
  getUserByUsernameLoading: false,
  getUserByUsernameError: false,

  editProfileResult: false,
  editProfileLoading: false,
  editProfileError: false,
};

// reducer data user yang login
const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BY_USERNAME:
      return {
        ...state,
        getUserByUsernameResult: action.payload.data,
        getUserByUsernameLoading: action.payload.loading,
        getUserByUsernameError: action.payload.errorMessage,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        editProfileResult: action.payload.data,
        editProfileLoading: action.payload.loading,
        editProfileError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default user;
