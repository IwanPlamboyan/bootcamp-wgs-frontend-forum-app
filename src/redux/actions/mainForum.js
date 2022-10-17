import { GET_MAIN_FORUM, GET_ALL_MAIN_FORUM, GET_MAIN_FORUM_BY_ID } from './types';

import axios from '../../api/axios';

export const getMainForum = (limit) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_MAIN_FORUM,
      payload: true,
      errorMessage: false,
    });

    // get token API
    axios({
      method: 'get',
      url: `/forum/main?limit=${limit}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_MAIN_FORUM,
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
          type: GET_MAIN_FORUM,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getAllMainForum = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_ALL_MAIN_FORUM,
      payload: true,
      errorMessage: false,
    });

    // get token API
    axios({
      method: 'get',
      url: `/forum/mainAll`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_ALL_MAIN_FORUM,
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
          type: GET_ALL_MAIN_FORUM,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getMainForumById = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_MAIN_FORUM_BY_ID,
      payload: true,
      errorMessage: false,
    });

    // get token API
    axios({
      method: 'get',
      url: `/forum/main/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: GET_MAIN_FORUM_BY_ID,
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
          type: GET_MAIN_FORUM_BY_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
