import axios from 'axios';

const baseURL = 'http://localhost:5000';

export default axios.create({
  baseURL,
  withCredentials: true,
});

export const axiosJWT = axios.create({
  baseURL,
});

axiosJWT.interceptors.request.use(
  async (config) => {
    const response = await axios.get(`${baseURL}/token`, { withCredentials: true });
    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
