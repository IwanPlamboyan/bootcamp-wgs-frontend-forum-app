import { EDIT_PROFILE, RESET_EDIT_PROFILE, GET_USER_BY_USERNAME } from './types';

import axios, { axiosJWT } from '../../api/axios';

// action untuk mendapatkan 1 username berdasarkan username
export const getUserByUsername = (username) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_USER_BY_USERNAME,
      payload: true,
      errorMessage: false,
    });

    // get token API
    axios({
      method: 'get',
      url: `/users/${username}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_USER_BY_USERNAME,
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
          type: GET_USER_BY_USERNAME,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

// action untuk mengedit profile
export const editProfile = (id, data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: EDIT_PROFILE,
      payload: true,
      data: false,
      errorMessage: false,
    });

    // get token API
    axiosJWT({
      method: 'patch',
      url: `/users/${id}`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: EDIT_PROFILE,
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
          type: EDIT_PROFILE,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

// action untuk mereset state edit profile
export const resetEditProfile = () => ({
  type: RESET_EDIT_PROFILE,
});
