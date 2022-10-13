// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { GET_USER } from '../actions/types';

// state awal untuk data user yang login
const initialState = {
  getUserByUsernameResult: false,
  getUserByUsernameLoading: false,
  getUserByUsernameError: false,
};

// reducer data user yang login
const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        getUserByUsernameResult: action.payload.data,
        getUserByUsernameLoading: action.payload.loading,
        getUserByUsernameError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default user;
