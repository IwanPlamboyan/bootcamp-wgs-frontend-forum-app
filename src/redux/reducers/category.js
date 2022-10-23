// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { GET_CATEGORY, GET_ALL_CATEGORY, GET_CATEGORY_BY_ID, ADD_CATEGORY, RESET_ADD_CATEGORY, EDIT_CATEGORY, RESET_EDIT_CATEGORY, DELETE_CATEGORY, RESET_DELETE_CATEGORY } from '../actions/types';

const initialState = {
  getCategoryResult: false,
  getCategoryLoading: false,
  getCategoryError: false,

  getAllCategoryResult: false,
  getAllCategoryLoading: false,
  getAllCategoryError: false,

  getCategoryByIdResult: false,
  getCategoryByIdLoading: false,
  getCategoryByIdError: false,

  addCategoryResult: false,
  addCategoryLoading: false,
  addCategoryError: false,

  editCategoryResult: false,
  editCategoryLoading: false,
  editCategoryError: false,

  deleteCategoryResult: false,
  deleteCategoryLoading: false,
  deleteCategoryError: false,
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        getCategoryResult: action.payload.data,
        getCategoryLoading: action.payload.loading,
        getCategoryError: action.payload.errorMessage,
      };
    case GET_ALL_CATEGORY:
      return {
        ...state,
        getAllCategoryResult: action.payload.data,
        getAllCategoryLoading: action.payload.loading,
        getAllCategoryError: action.payload.errorMessage,
      };
    case GET_CATEGORY_BY_ID:
      return {
        ...state,
        getCategoryByIdResult: action.payload.data,
        getCategoryByIdLoading: action.payload.loading,
        getCategoryByIdError: action.payload.errorMessage,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        addCategoryResult: action.payload.data,
        addCategoryLoading: action.payload.loading,
        addCategoryError: action.payload.errorMessage,
      };
    case RESET_ADD_CATEGORY:
      return {
        ...state,
        addCategoryResult: false,
        addCategoryLoading: false,
        addCategoryError: false,
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        editCategoryResult: action.payload.data,
        editCategoryLoading: action.payload.loading,
        editCategoryError: action.payload.errorMessage,
      };
    case RESET_EDIT_CATEGORY:
      return {
        ...state,
        editCategoryResult: false,
        editCategoryLoading: false,
        editCategoryError: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        deleteCategoryResult: action.payload.data,
        deleteCategoryLoading: action.payload.loading,
        deleteCategoryError: action.payload.errorMessage,
      };
    case RESET_DELETE_CATEGORY:
      return {
        ...state,
        deleteCategoryResult: false,
        deleteCategoryLoading: false,
        deleteCategoryError: false,
      };
    default:
      return state;
  }
};

export default category;
