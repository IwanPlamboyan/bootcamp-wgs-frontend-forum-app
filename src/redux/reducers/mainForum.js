// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { GET_MAIN_FORUM, GET_ALL_MAIN_FORUM, GET_MAIN_FORUM_BY_ID } from '../actions/types';

const initialState = {
  getMainForumResult: false,
  getMainForumLoading: false,
  getMainForumError: false,

  getAllMainForumResult: false,
  getAllMainForumLoading: false,
  getAllMainForumError: false,

  getMainForumByIdResult: false,
  getMainForumByIdLoading: false,
  getMainForumByIdError: false,
};

const mainForum = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_FORUM:
      return {
        ...state,
        getMainForumResult: action.payload.data,
        getMainForumLoading: action.payload.loading,
        getMainForumError: action.payload.errorMessage,
      };
    case GET_ALL_MAIN_FORUM:
      return {
        ...state,
        getAllMainForumResult: action.payload.data,
        getAllMainForumLoading: action.payload.loading,
        getAllMainForumError: action.payload.errorMessage,
      };
    case GET_MAIN_FORUM_BY_ID:
      return {
        ...state,
        getMainForumByIdResult: action.payload.data,
        getMainForumByIdLoading: action.payload.loading,
        getMainForumByIdError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default mainForum;
