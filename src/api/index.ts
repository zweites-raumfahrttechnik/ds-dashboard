import axios, { AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';

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
      Message.error(resp.data.msg);
      return Promise.reject(new Error(resp.data.msg));
    }

    return resp;
  },
  error => {
    return Promise.reject(error);
  },
);

export type { ResponseWrap };

export { instance };
