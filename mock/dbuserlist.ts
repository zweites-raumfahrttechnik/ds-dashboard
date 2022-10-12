import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
    //添加
  {
    url: '/api/v1/sql/user/add',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  {
    //获取用户列表
    url: '/api/v1/sql/user/add',
    method: 'get',
    response: () => {
      return successResp({
        data: Array(11)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              type: Random.pick([1,2,3]),
              username: Random.name(),
              host: Random.ip(),
              password: Random.integer(100000, 5000000),
            };
          }),
      });
    },
  },
  //修改
  {
    //返回
    url: '/api/v1/sql/user/update',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  //删除
  {
    url: '/api/v1/sql/user/delete',
    method: 'delete',
    response: () => {
      return successResp();
    },
  },
  //授权
  {
    url: '/api/v1/sql/user/grant',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  //撤销
  {
    url: '/api/v1/sql/user/revoke',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
];

export default requests;
