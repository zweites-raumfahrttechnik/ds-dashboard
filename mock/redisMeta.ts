import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/execute/redis/meta/dbnumber',
    method: 'get',
    response: () => {
      return successResp(
        "50"
      );
    },
  },
  {
    url: '/api/v1/execute/redis/meta/dbsize',
    method: 'get',
    response: ({ query }: { query: any }) => {
      return successResp(
        Random.integer(0,100)
      );
    },
  },
  {
    url: '/api/v1/execute/redis/meta/keys',
    method: 'get',
    response: ({ query }: { query: any }) => {
      const size = +query.size;
      return successResp({
        count:50,
        data:Array(size).fill(1).map(()=>{return Random.string()})
      });
    },
  },
];

export default requests;
