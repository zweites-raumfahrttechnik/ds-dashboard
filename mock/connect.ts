import { MockMethod } from 'vite-plugin-mock';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/connect',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
];

export default requests;
