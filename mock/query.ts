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
          'array|0-10': [Random.string('lower', 1, 6)],
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
          'array|0-10': [Random.string('lower', 1, 6)],
        },
      });
    },
  },
  {
    url: '/api/v1/mgdb/query',
    method: 'put',
    response: ({ query }: { query: any }) => {
      const size = +query.size;
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|0-10': [Random.string('lower', 1, 6)],
        },
      });
    },
  },
  {
    url: '/api/v1/mgdb/query',
    method: 'delete',
    response: () => {
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|0-10': [Random.string('lower', 1, 6)],
        },
      });
    },
  },
];

export default requests;
