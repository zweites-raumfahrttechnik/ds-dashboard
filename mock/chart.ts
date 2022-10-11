import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';
//生成图表的数据
const requests: MockMethod[] = [
  {
    //cpu的数据-生成模拟接口
    url: '/api/v1/chart/cpu',
    //get请求
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
  {
    url: '/api/v1/chart/pool',
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
    url: '/api/v1/chart/storage',
    method: 'get',
    response: () => {
      return successResp(Random.float(5, 10000));
    },
  },
  {
    url: '/api/v1/chart/concurrent',
    method: 'get',
    response: () => {
      return successResp({
        xAxis: Array(12)
          .fill(1)
          .map(() => Random.string(5, 5)),
        concurrent: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 1000)),
        through: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 1000)),
      });
    },
  },
];

export default requests;
