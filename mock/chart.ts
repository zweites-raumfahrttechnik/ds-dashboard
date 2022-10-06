import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/chart/cpu',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(0, 100),
        growth: Random.integer(-100, 100),
        value: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 100)),
      });
    },
  },
  {
    url: '/api/v1/chart/memory',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(0, 100),
        growth: Random.integer(-100, 100),
        value: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 100)),
      });
    },
  },
  {
    url: '/api/v1/chart/bandwidth',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(0, 100),
        growth: Random.integer(-100, 100),
        value: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 100)),
      });
    },
  },
];

export default requests;
