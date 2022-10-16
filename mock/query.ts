import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/mgdb/query',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  {
    url: '/api/v1/mgdb/read',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  {
    url: '/api/v1/mgdb/query',
    method: 'put',
    response: ({ query }: { query: any }) => {
      const size = +query.size;

      return successResp({
        items: Array(size)
          .fill(1)
          .map(() => {
      
          }),
      });
    },
  },
  {
    url: '/api/v1/mgdb/query',
    method: 'delete',
    response: () => {
      return successResp();
    },
  },
];
