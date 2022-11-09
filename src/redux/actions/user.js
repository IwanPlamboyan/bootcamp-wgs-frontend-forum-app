import { EDIT_PROFILE, RESET_EDIT_PROFILE, GET_USER_BY_USERNAME, CHANGE_PASSWORD, RESET_CHANGE_PASSWORD } from './types';

import axios, { axiosJWT } from '../../api/axios';

// action untuk mendapatkan 1 username berdasarkan username
export const getUserByUsername = (username) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_USER_BY_USERNAME,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
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
            errorMessage: error.response.data.msg,
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
      payload: {
        loading: false,
        data: false,
        errorMessage: false,
      },
    });

    // pacth API
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
            errorMessage: error.response.data.msg,
          },
        });
      });
  };
};

// action untuk mereset state edit profile
export const resetEditProfile = () => ({
  type: RESET_EDIT_PROFILE,
});

// action untuk mengubah password
export const changePassword = (id, data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: CHANGE_PASSWORD,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // pacth API
    axiosJWT({
      method: 'patch',
      url: `/users/password/${id}`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: CHANGE_PASSWORD,
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
          type: CHANGE_PASSWORD,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.msg,
          },
        });
      });
  };
};

// action untuk mereset state changePassword
export const resetChangePassword = () => ({
  type: RESET_CHANGE_PASSWORD,
});
