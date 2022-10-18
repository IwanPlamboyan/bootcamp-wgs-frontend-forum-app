// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { GET_ALL_SUBFORUM_BY_MAIN_ID, GET_SUBFORUM_BY_ID, GET_ALL_SUBFORUM_BY_USER_ID, ADD_SUBFORUM, DELETE_SUBFORUM, RESET_ADD_SUBFORUM } from '../actions/types';

const initialState = {
  getAllSubForumByMainIdResult: false,
  getAllSubForumByMainIdLoading: false,
  getAllSubForumByMainIdError: false,

  getSubForumByIdResult: false,
  getSubForumByIdLoading: false,
  getSubForumByIdError: false,

  getAllSubForumByUserIdResult: false,
  getAllSubForumByUserIdLoading: false,
  getAllSubForumByUserIdError: false,

  addSubForumResult: false,
  addSubForumLoading: false,
  addSubForumError: false,

  deleteSubForumResult: false,
  deleteSubForumLoading: false,
  deleteSubForumError: false,
};

const mainForum = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SUBFORUM_BY_MAIN_ID:
      return {
        ...state,
        getAllSubForumByMainIdResult: action.payload.data,
        getAllSubForumByMainIdLoading: action.payload.loading,
        getAllSubForumByMainIdError: action.payload.errorMessage,
      };
    case GET_SUBFORUM_BY_ID:
      return {
        ...state,
        getSubForumByIdResult: action.payload.data,
        getSubForumByIdLoading: action.payload.loading,
        getSubForumByIdError: action.payload.errorMessage,
      };
    case GET_ALL_SUBFORUM_BY_USER_ID:
      return {
        ...state,
        getAllSubForumByUserIdResult: action.payload.data,
        getAllSubForumByUserIdLoading: action.payload.loading,
        getAllSubForumByUserIdError: action.payload.errorMessage,
      };
    case ADD_SUBFORUM:
      return {
        ...state,
        addSubForumResult: action.payload.data,
        addSubForumLoading: action.payload.loading,
        addSubForumError: action.payload.errorMessage,
      };
    case RESET_ADD_SUBFORUM:
      return {
        ...state,
        addSubForumResult: false,
        addSubForumLoading: false,
        addSubForumError: false,
      };
    case DELETE_SUBFORUM:
      return {
        ...state,
        deleteSubForumResult: action.payload.data,
        deleteSubForumLoading: action.payload.loading,
        deleteSubForumError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default mainForum;
