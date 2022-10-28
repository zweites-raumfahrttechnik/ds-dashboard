import axios, { AxiosResponse } from 'axios';

interface ResponseWrap<T> {
  code: number;
  msg: string;
  data?: T;
}

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.response.use(
  (resp: AxiosResponse<ResponseWrap<unknown>>) => {
    if (resp.data.code !== 0) {
      return resp;
    }
    return resp;
  },
  error => {
    return Promise.reject(error);
  },
);

export type { ResponseWrap };
export { instance };
