import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    //返回
    url: '/api/v1/userlist',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  {
    //获取用户列表
    url: '/api/v1/userlist',
    method: 'get',
    response: () => {
      return successResp({
        data: Array(60)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              type: Random.pick([ 1,2,3]),
              username: Random.name(),
              host: Random.ip(),
              password: Random.integer(100000, 5000000),
            };
          }),
      });
    },
  },
  {
    //删除
    url: '/api/v1/userlist',
    method: 'delete',
    response: () => {
      return successResp();
    },
  },
];

export default requests;
