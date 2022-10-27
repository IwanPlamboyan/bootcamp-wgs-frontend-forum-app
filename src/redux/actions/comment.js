import { ADD_COMMENT, RESET_ADD_COMMENT, DELETE_COMMENT, RESET_DELETE_COMMENT } from './types';

import { axiosJWT } from '../../api/axios';
import swal from 'sweetalert';

export const addComment = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: ADD_COMMENT,
      payload: true,
      data: false,
      errorMessage: false,
    });

    // post token API
    axiosJWT({
      method: 'post',
      url: '/forum/comment',
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: ADD_COMMENT,
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
          type: ADD_COMMENT,
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

export const resetAddComment = () => ({
  type: RESET_ADD_COMMENT,
});

export const deleteComment = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: DELETE_COMMENT,
      payload: true,
      errorMessage: false,
    });

    // delete token API
    axiosJWT({
      method: 'delete',
      url: `/forum/comment/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: DELETE_COMMENT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
        swal('Comment berhasil di hapus!', {
          icon: 'success',
        });
      })
      .catch((error) => {
        // jika response error/gagal
        dispatch({
          type: DELETE_COMMENT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        swal('Comment gagal di hapus!', {
          icon: 'error',
        });
      });
  };
};

export const resetDeleteComment = () => ({
  type: RESET_DELETE_COMMENT,
});
