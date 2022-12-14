import { ADD_COMMENT, RESET_ADD_COMMENT, DELETE_COMMENT, RESET_DELETE_COMMENT } from '../actions/types';

const initialState = {
  addCommentResult: false,
  addCommentLoading: false,
  addCommentError: false,

  deleteCommentResult: false,
  deleteCommentLoading: false,
  deleteCommentError: false,
};

const comment = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        addCommentResult: action.payload.data,
        addCommentLoading: action.payload.loading,
        addCommentError: action.payload.errorMessage,
      };
    case RESET_ADD_COMMENT:
      return {
        ...state,
        addCommentResult: false,
        addCommentLoading: false,
        addCommentError: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        deleteCommentResult: action.payload.data,
        deleteCommentLoading: action.payload.loading,
        deleteCommentError: action.payload.errorMessage,
      };
    case RESET_DELETE_COMMENT:
      return {
        ...state,
        deleteCommentResult: false,
        deleteCommentLoading: false,
        deleteCommentError: false,
      };
    default:
      return state;
  }
};

export default comment;
