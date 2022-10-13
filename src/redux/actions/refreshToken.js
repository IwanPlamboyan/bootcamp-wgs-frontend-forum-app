import { REFRESH_TOKEN } from './types';
import jwt_decoded from 'jwt-decode';

import axios from '../../api/axios';

export const refreshToken = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: REFRESH_TOKEN,
      payload: true,
      data: false,
      errorMessage: false,
    });

    // get token API
    axios({
      method: 'get',
      url: '/token',
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        const decoded = jwt_decoded(response.data.accessToken);
        dispatch({
          type: REFRESH_TOKEN,
          payload: {
            loading: false,
            username: decoded.username,
            email: decoded.email,
            image_url: decoded.image_url,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // jika response error/gagal
        dispatch({
          type: REFRESH_TOKEN,
          payload: {
            loading: false,
            data: false,
            username: false,
            email: false,
            image_url: '',
            errorMessage: error.message,
          },
        });
      });
  };
};
