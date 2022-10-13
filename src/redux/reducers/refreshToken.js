// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { REFRESH_TOKEN } from '../actions/types';

// state awal untuk data user yang login
const initialState = {
  accessToken: false,
  getTokenLoading: false,
  getTokenError: false,
  username: false,
  email: false,
  image_url: '',
};

// reducer data user yang login
const refreshToken = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.data,
        getTokenLoading: action.payload.loading,
        getTokenError: action.payload.errorMessage,
        username: action.payload.username,
        email: action.payload.email,
        image_url: action.payload.image_url,
      };
    default:
      return state;
  }
};

export default refreshToken;
