import { GET_CATEGORY, GET_ALL_CATEGORY, GET_CATEGORY_BY_ID, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY, RESET_ADD_CATEGORY, RESET_EDIT_CATEGORY, RESET_DELETE_CATEGORY } from './types';
import axios, { axiosJWT } from '../../api/axios';
import swal from 'sweetalert';

export const getCategory = (limit) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_CATEGORY,
      payload: {
        loading: true,
        errorMessage: false,
      },
    });

    // get API
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
      payload: {
        loading: true,
        errorMessage: false,
      },
    });

    // get API
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
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
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

export const addCategory = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: ADD_CATEGORY,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // post API
    axiosJWT({
      method: 'post',
      url: '/forum/category',
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: ADD_CATEGORY,
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
          type: ADD_CATEGORY,
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

export const resetAddCategory = () => ({
  type: RESET_ADD_CATEGORY,
});

// action untuk mengedit category
export const editCategory = (id, data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: EDIT_CATEGORY,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // patch API
    axiosJWT({
      method: 'patch',
      url: `/forum/category/${id}`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: EDIT_CATEGORY,
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
          type: EDIT_CATEGORY,
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

export const resetEditCategory = () => ({
  type: RESET_EDIT_CATEGORY,
});

export const deleteCategory = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: DELETE_CATEGORY,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // delete API
    axiosJWT({
      method: 'delete',
      url: `/forum/category/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        // jika response berhasil
        dispatch({
          type: DELETE_CATEGORY,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
        swal('Category berhasil di hapus!', {
          icon: 'success',
        });
      })
      .catch((error) => {
        // jika response error/gagal
        dispatch({
          type: DELETE_CATEGORY,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        swal('Gagal!', error.response.data.msg, 'error');
      });
  };
};

export const resetDeleteCategory = () => ({
  type: RESET_DELETE_CATEGORY,
});
