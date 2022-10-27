// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { GET_POST_BY_ID, GET_ALL_POST_BY_USER_ID, ADD_POST, DELETE_POST, RESET_ADD_POST } from '../actions/types';

const initialState = {
  getPostByIdResult: false,
  getPostByIdLoading: false,
  getPostByIdError: false,

  getAllPostByUserIdResult: false,
  getAllPostByUserIdLoading: false,
  getAllPostByUserIdError: false,

  addPostResult: false,
  addPostLoading: false,
  addPostError: false,

  deletePostResult: false,
  deletePostLoading: false,
  deletePostError: false,
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_BY_ID:
      return {
        ...state,
        getPostByIdResult: action.payload.data,
        getPostByIdLoading: action.payload.loading,
        getPostByIdError: action.payload.errorMessage,
      };
    case GET_ALL_POST_BY_USER_ID:
      return {
        ...state,
        getAllPostByUserIdResult: action.payload.data,
        getAllPostByUserIdLoading: action.payload.loading,
        getAllPostByUserIdError: action.payload.errorMessage,
      };
    case ADD_POST:
      return {
        ...state,
        addPostResult: action.payload.data,
        addPostLoading: action.payload.loading,
        addPostError: action.payload.errorMessage,
      };
    case RESET_ADD_POST:
      return {
        ...state,
        addPostResult: false,
        addPostLoading: false,
        addPostError: false,
      };
    case DELETE_POST:
      return {
        ...state,
        deletePostResult: action.payload.data,
        deletePostLoading: action.payload.loading,
        deletePostError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default post;
