import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/dbtotalNum',
    method: 'get',
    response: ({ query }: { query: any }) => {
      const size = +query.size;
      return successResp({
        data:Random.integer(0,100)
      });
    },
  },
  {
    url: '/api/v1/dbsize',
    method: 'get',
    response: ({ query }: { query: any }) => {
      const size = +query.size;
      return successResp({
        dbsize:Random.integer(0,100)
      });
    },
  },
  {
    url: '/api/v1/redisKeys',
    method: 'get',
    response: ({ query }: { query: any }) => {
      const size = +query.size;
      const num=Random.integer(0,100);
      return successResp({
        count:num,
        dbkeys:Array(num).fill(1).map(()=>{return Random.string()})
      });
    },
  },
];

export default requests;
