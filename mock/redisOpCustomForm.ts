import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/redisOpCustomForm',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  {
    url: '/api/v1/redisOpCustomForm',
    method: 'get',
    response: () => {
      return successResp({
        data: Array(1)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              commend: Random.name(),
              args: Random.range(),
            };
          }),
      });
    },
  },
  {
    //删除
    url: '/api/v1/redisOpCustomForm',
    method: 'delete',
    response: () => {
      return successResp();
    },
  },
];

export default requests;
