import { GET_USER } from './types';

import axios from '../../api/axios';

export const getUserByUsername = (username) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_USER,
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
          type: GET_USER,
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
          type: GET_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
