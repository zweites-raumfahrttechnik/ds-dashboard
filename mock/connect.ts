import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/connect',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  {
    url: '/api/v1/connect',
    method: 'get',
    response: ({ query }: { query: any }) => {
      const size = +query.size;
      return successResp({
        count: 500,
        data: Array(size)
          .fill(1)
          .map(() => {
            return {
              uuid: Random.id(),
              username: Random.name(),
              ip: Random.ip(),
              port: Random.integer(1000, 50000),
              type: Random.pick([1, 2, 3, 4, 5, 6]),
            };
          }),
      });
    },
  },
  {
    url: '/api/v1/connect',
    method: 'delete',
    response: () => {
      return successResp();
    },
  },
];

export default requests;
