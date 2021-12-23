import axios, {AxiosInstance, AxiosResponse, AxiosError /*, AxiosRequestConfig*/} from 'axios';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const REQUEST_TIMEOUT = 5000;


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => Promise.reject(error),
  );

  // api.interceptors.request.use(
  //   (config: AxiosRequestConfig) => {
  //     const token = getToken();

  //     if(token) {
  //       config.headers['X-Total-Count'] = token;
  //     }

  //     return config;
  //   },
  // );

  return api;
};
