import { REGISTER, LOGIN, LOGOUT } from './types';
import axios from '../../api/axios';
import swal from 'sweetalert';

// membuat action untuk register
export const register = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: REGISTER,
      payload: true,
      data: false,
      errorMessage: false,
    });

    // post register API
    axios({
      method: 'post',
      url: '/register',
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: REGISTER,
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
          type: REGISTER,
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

// membuat action untuk login
export const login = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: LOGIN,
      payload: true,
      data: false,
      errorMessage: false,
    });

    // post login API
    axios({
      method: 'post',
      url: '/login',
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: LOGIN,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
        // memanggil pop-up sweetalert success
        swal('Berhasil', 'Login berhasil', 'success');
      })
      .catch((error) => {
        // jika response error/gagal
        dispatch({
          type: LOGIN,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        // memanggil pop-up sweetalert error
        swal('Gagal', error.response.data.msg, 'error');
      });
  };
};

// membuat action untuk logout
export const logout = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: LOGOUT,
      payload: true,
      data: false,
      errorMessage: false,
    });

    // post logout API
    axios({
      method: 'delete',
      url: '/logout',
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: LOGOUT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
        window.location = '/';
      })
      .catch((error) => {
        // jika response error/gagal
        dispatch({
          type: LOGOUT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
