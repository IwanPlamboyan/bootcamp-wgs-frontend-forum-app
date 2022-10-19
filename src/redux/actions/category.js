import { GET_CATEGORY, GET_ALL_CATEGORY, GET_CATEGORY_BY_ID } from './types';

import axios from '../../api/axios';

export const getCategory = (limit) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_CATEGORY,
      payload: true,
      errorMessage: false,
    });

    // get token API
    axios({
      method: 'get',
      url: `/forum/category?limit=${limit}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_CATEGORY,
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
          type: GET_CATEGORY,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getAllCategory = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: true,
      errorMessage: false,
    });

    // get token API
    axios({
      method: 'get',
      url: `/forum/categoryAll`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_ALL_CATEGORY,
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
          type: GET_ALL_CATEGORY,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getCategoryById = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_CATEGORY_BY_ID,
      payload: true,
      errorMessage: false,
    });

    // get token API
    axios({
      method: 'get',
      url: `/forum/category/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_CATEGORY_BY_ID,
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
          type: GET_CATEGORY_BY_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
