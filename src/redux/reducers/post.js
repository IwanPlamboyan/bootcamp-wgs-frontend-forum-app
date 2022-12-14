// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { GET_POST_BY_ID, GET_ALL_POST_BY_USER_ID, ADD_POST, EDIT_POST, DELETE_POST, RESET_ADD_POST, RESET_EDIT_POST, RESET_DELETE_POST, EDIT_POST_CATEGORY, RESET_EDIT_POST_CATEGORY } from '../actions/types';

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

  editPostResult: false,
  editPostLoading: false,
  editPostError: false,

  editPostCategoryResult: false,
  editPostCategoryLoading: false,
  editPostCategoryError: false,

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
    case EDIT_POST:
      return {
        ...state,
        editPostResult: action.payload.data,
        editPostLoading: action.payload.loading,
        editPostError: action.payload.errorMessage,
      };
    case RESET_EDIT_POST:
      return {
        ...state,
        editPostResult: false,
        editPostLoading: false,
        editPostError: false,
      };
    case EDIT_POST_CATEGORY:
      return {
        ...state,
        editPostCategoryResult: action.payload.data,
        editPostCategoryLoading: action.payload.loading,
        editPostCategoryError: action.payload.errorMessage,
      };
    case RESET_EDIT_POST_CATEGORY:
      return {
        ...state,
        editPostCategoryResult: false,
        editPostCategoryLoading: false,
        editPostCategoryError: false,
      };
    case DELETE_POST:
      return {
        ...state,
        deletePostResult: action.payload.data,
        deletePostLoading: action.payload.loading,
        deletePostError: action.payload.errorMessage,
      };
    case RESET_DELETE_POST:
      return {
        ...state,
        deletePostResult: false,
        deletePostLoading: false,
        deletePostError: false,
      };
    default:
      return state;
  }
};

export default post;
