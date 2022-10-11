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
