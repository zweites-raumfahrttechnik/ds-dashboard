import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';
//关系型数据库用户管理-post请求，响应值为code,msg,data(null
const requests: MockMethod[] = [
  //添加
  {
    url: '/api/v1/sql/user/add',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  //自定义添加
  {
    url: '/api/v1/sql/user/add',
    method: 'get',
    response: () => {
      return successResp({
        data: Array(11)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              type: Random.pick([1, 2, 3]),
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
