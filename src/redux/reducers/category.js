// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { GET_CATEGORY, GET_ALL_CATEGORY, GET_CATEGORY_BY_ID } from '../actions/types';

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
    default:
      return state;
  }
};

export default category;
