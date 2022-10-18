import { GET_ALL_SUBFORUM_BY_MAIN_ID, GET_SUBFORUM_BY_ID, GET_ALL_SUBFORUM_BY_USER_ID, ADD_SUBFORUM, DELETE_SUBFORUM, RESET_ADD_SUBFORUM } from './types';

import axios, { axiosJWT } from '../../api/axios';
import swal from 'sweetalert';

export const getAllSubForumByMainId = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_ALL_SUBFORUM_BY_MAIN_ID,
      payload: true,
      errorMessage: false,
    });

    // get API
    axios({
      method: 'get',
      url: `/forum/tag/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_ALL_SUBFORUM_BY_MAIN_ID,
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
          type: GET_ALL_SUBFORUM_BY_MAIN_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getSubForumById = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_SUBFORUM_BY_ID,
      payload: true,
      errorMessage: false,
    });

    // get API
    axios({
      method: 'get',
      url: `/forum/sub/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_SUBFORUM_BY_ID,
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
          type: GET_SUBFORUM_BY_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getAllSubForumByUserId = (userId) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_ALL_SUBFORUM_BY_USER_ID,
      payload: true,
      errorMessage: false,
    });

    // get API
    axios({
      method: 'get',
      url: `/forum/sub/user/${userId}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_ALL_SUBFORUM_BY_USER_ID,
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
          type: GET_ALL_SUBFORUM_BY_USER_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addSubForum = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: ADD_SUBFORUM,
      payload: true,
      data: false,
      errorMessage: false,
    });

    // post token API
    axiosJWT({
      method: 'post',
      url: '/forum/sub',
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: ADD_SUBFORUM,
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
          type: ADD_SUBFORUM,
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

export const resetAddSubForum = () => ({
  type: RESET_ADD_SUBFORUM,
});

export const deleteSubForum = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: DELETE_SUBFORUM,
      payload: true,
      errorMessage: false,
    });

    // delete token API
    axiosJWT({
      method: 'delete',
      url: `/forum/sub/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: DELETE_SUBFORUM,
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
          type: DELETE_SUBFORUM,
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
