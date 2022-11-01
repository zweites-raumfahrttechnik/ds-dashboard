import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/sql/meta/schema',
    method: 'get',
    response: () => {
      return successResp({
        names: Array(Random.integer(20, 30))
          .fill(1)
          .map(() => {
            return Random.name();
          }),
      });
    },
  },
  {
    url: '/api/v1/sql/meta/table',
    method: 'get',
    response: () => {
      return successResp({
        names: Array(Random.integer(20, 30))
          .fill(1)
          .map(() => {
            return Random.name();
          }),
      });
    },
  },
];

export default requests;
