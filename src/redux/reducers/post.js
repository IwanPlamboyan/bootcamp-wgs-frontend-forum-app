// mengimport contansta atau varibel dengan key dan value yang sama di file types dalam folder actions
import { GET_ALL_POST_BY_CATEGORY_ID, GET_POST_BY_ID, GET_ALL_POST_BY_USER_ID, ADD_POST, DELETE_POST, RESET_ADD_POST } from '../actions/types';

const initialState = {
  // posts: [],
  // tempId: false,
  // hasMore: false,
  // getPostResult: false,
  // getPostLoading: false,
  // getPostError: false,

  getAllPostByCategoryIdResult: false,
  getAllPostByCategoryIdLoading: false,
  getAllPostByCategoryIdError: false,

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
    // case GET_POST:
    //   let newPosts = [];
    //   console.log(action.payload.posts);
    //   if (action.payload.posts !== undefined && action.payload.posts !== false) {
    //     console.log('29', action.payload.posts);
    //     newPosts.push(...action.payload.posts);
    //   }

    //   // const newPosts = [...state.posts, action.payload.posts];
    //   return {
    //     ...state,
    //     posts: [...state.posts, ...newPosts],
    //     tempId: action.payload.tempId,
    //     hasMore: action.payload.hasMore,
    //     getPostResult: action.payload.data,
    //     getPostLoading: action.payload.loading,
    //     getPostError: action.payload.errorMessage,
    //   };
    case GET_ALL_POST_BY_CATEGORY_ID:
      return {
        ...state,
        getAllPostByCategoryIdResult: action.payload.data,
        getAllPostByCategoryIdLoading: action.payload.loading,
        getAllPostByCategoryIdError: action.payload.errorMessage,
      };
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
