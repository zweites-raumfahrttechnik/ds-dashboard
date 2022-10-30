import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/mgdb/query',
    method: 'post',
    response: () => {
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|count': [Random.string],
        },
      });
    },
  },
  {
    url: '/api/v1/mgdb/read',
    method: 'post',
    response: () => {
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|count': [Random.string],
        },
      });
    },
  },
  {
    url: '/api/v1/mgdb/query',
    method: 'put',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/mgdb/query',
    method: 'delete',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/execute/bson',
    method: 'post',
    response: () => {
      return successResp({
        document: `{"status":"success"}`,
      });
    },
  },
];

export default requests;
