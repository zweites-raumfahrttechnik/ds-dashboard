import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/execute/redis',
    method: 'post',
    response: () => {
      return successResp({
        count: 500,
        data: Array(1)
          .fill(1)
          .map(() => {
            return {
              uuid: Random.uuid(),
              dbname: Random.range(),
            };
          }),
      });
    },
  },
];

export default requests;
