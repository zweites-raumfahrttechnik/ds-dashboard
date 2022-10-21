import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/redisOp',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  {
    url: '/api/v1/redisOp',
    method: 'get',
    response: ({ query }: { query: any }) => {
      return successResp({
        count: 500,
        data: Array(3)
          .fill(1)
          .map(() => {
            return {
              uuid: Random.uuid(),
              dbname: Random.range(),
              action: Random.pick(['set','get','count']),
              KeyType: Random.pick(['hash','list','set']),
              key:Random.string(),
              parameter1: Random.string(),
              parameter2: Random.string()
            };
          }),
      });
    },
  },
  {
    url: '/api/v1/redisOp',
    method: 'delete',
    response: () => {
      return successResp();
    },
  },
];

export default requests;

