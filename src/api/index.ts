import axios, { AxiosResponse } from 'axios';
import { stringify } from 'qs';
import { Message } from '@arco-design/web-vue';
import { useUserModel } from '@/model';

interface ResponseWrap<T> {
  code: number;
  msg: string;
  data?: T;
}

const instance = axios.create({
  baseURL: '/api',
  paramsSerializer: {
    serialize: params => {
      return stringify(params, { indices: false });
    },
  },
});

instance.interceptors.request.use(req => {
  const { token } = useUserModel();

  req.headers.Authorization = `ASI ${token.value}` || 'ASI ';

  return req;
});

instance.interceptors.response.use(
  (resp: AxiosResponse<ResponseWrap<unknown>>) => {
    if (resp.status >= 300 || resp.status < 200) {
      Message.error(resp.statusText);
      return Promise.reject(new Error(resp.statusText));
    }

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
