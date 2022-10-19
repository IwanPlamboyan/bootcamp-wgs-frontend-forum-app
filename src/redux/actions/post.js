import { GET_ALL_POST_BY_CATEGORY_ID, GET_POST_BY_ID, GET_ALL_POST_BY_USER_ID, ADD_POST, DELETE_POST, RESET_ADD_POST } from './types';

import axios, { axiosJWT } from '../../api/axios';
import swal from 'sweetalert';

// export const getPost = (data) => {
//   return (dispatch) => {
//     // loading
//     dispatch({
//       type: GET_POST,
//       posts: false,
//       tempId: false,
//       hasMore: false,
//       payload: true,
//       data: false,
//       errorMessage: false,
//     });

//     // post token API
//     axios({
//       method: 'get',
//       url: `/forum/post?search_query=${data.keyword}&lastId=${data.lastId}&limit=${data.limit}`,
//       timeout: 120000,
//       data: data,
//     })
//       .then((response) => {
//         // jika response berhasil
//         dispatch({
//           type: GET_POST,
//           payload: {
//             posts: response.data.result,
//             tempId: response.data.lastId,
//             hasMore: response.data.hasMore,
//             loading: false,
//             data: response.data,
//             errorMessage: false,
//           },
//         });
//       })
//       .catch((error) => {
//         // jika response error/gagal
//         dispatch({
//           type: GET_POST,
//           payload: {
//             posts: false,
//             tempId: false,
//             hasMore: false,
//             loading: false,
//             data: false,
//             errorMessage: error.message,
//           },
//         });
//       });
//   };
// };

export const getAllPostByCategoryId = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_ALL_POST_BY_CATEGORY_ID,
      payload: true,
      errorMessage: false,
    });

    // get API
    axios({
      method: 'get',
      url: `/forum/category/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_ALL_POST_BY_CATEGORY_ID,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // jika response error/gagal
        dispatch({
          type: GET_ALL_POST_BY_CATEGORY_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getPostById = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_POST_BY_ID,
      payload: true,
      errorMessage: false,
    });

    // get API
    axios({
      method: 'get',
      url: `/forum/post/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_POST_BY_ID,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // jika response error/gagal
        dispatch({
          type: GET_POST_BY_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getAllPostByUserId = (userId) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_ALL_POST_BY_USER_ID,
      payload: true,
      errorMessage: false,
    });

    // get API
    axios({
      method: 'get',
      url: `/forum/post/user/${userId}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_ALL_POST_BY_USER_ID,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // jika response error/gagal
        dispatch({
          type: GET_ALL_POST_BY_USER_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: ADD_POST,
      payload: true,
      data: false,
      errorMessage: false,
    });

    // post token API
    axiosJWT({
      method: 'post',
      url: '/forum/post',
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: ADD_POST,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
        // memanggil pop-up sweetalert success
        swal('Berhasil', response.data.msg, 'success');
      })
      .catch((error) => {
        // jika response error/gagal
        dispatch({
          type: ADD_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        // memanggil pop-up sweetalert error
        swal('Gagal!', error.response.data.msg, 'error');
      });
  };
};

export const resetAddPost = () => ({
  type: RESET_ADD_POST,
});

export const deletePost = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: DELETE_POST,
      payload: true,
      errorMessage: false,
    });

    // delete token API
    axiosJWT({
      method: 'delete',
      url: `/forum/post/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: DELETE_POST,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
        swal('Thread berhasil di hapus!', {
          icon: 'success',
        });
      })
      .catch((error) => {
        // jika response error/gagal
        dispatch({
          type: DELETE_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        swal('Thread gagal di hapus!', {
          icon: 'error',
        });
      });
  };
};
