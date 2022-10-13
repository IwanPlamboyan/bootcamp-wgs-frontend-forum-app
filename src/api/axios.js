import axios from 'axios';
import jwt_decoded from 'jwt-decode';

const baseURL = 'http://localhost:5000';

export default axios.create({
  baseURL,
  withCredentials: true,
});

export const axiosJWT = axios.create({
  baseURL,
});

let expire = 0;
axiosJWT.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(`${baseURL}/token`, { withCredentials: true });
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      const decoded = jwt_decoded(response.data.accessToken);
      expire = decoded.exp;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
