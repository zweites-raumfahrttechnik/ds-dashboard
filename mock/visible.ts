import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/visible/userlist',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        data: Array(15)
          .fill(1)
          .map(() => ({
            userUuid: Random.uuid(),
            userName: Random.name(),
          })),
      });
    },
  },
  {
    url: '/api/v1/visible',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        data: Array(15)
          .fill(1)
          .map(() => ({
            userConnectUuid: Random.uuid(),
            ip: Random.ip(),
            port: Random.integer(10, 50),
            exportIp: Random.ip(),
            exportPort: Random.integer(10, 50),
            visible: Random.pick([0]),
            deletable: Random.pick([0, 1]),
          })),
      });
    },
  },
  {
    url: '/api/v1/visible',
    method: 'post',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/visible',
    method: 'delete',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/visible',
    method: 'put',
    response: () => {
      return successResp(null);
    },
  },
];

export default requests;
