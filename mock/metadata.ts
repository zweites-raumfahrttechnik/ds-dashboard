import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/mgdb/meta/db',
    method: 'get',
    response: () => {
      return successResp({
        count: 500,
        data: Array(500)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              username: Random.name(),
              ip: Random.ip(),
              port: Random.integer(1000, 50000),
              export_port: Random.integer(1000, 50000),
              export_ip: Random.ip(),
            };
          }),
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/collection',
    method: 'get',
    response: () => {
      return successResp({
        count: 500,
        data: Array(12)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              dbName: Random.name(),
              collectionName: Random.name(),
              docName: Random.name(),
            };
          }),
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/doc',
    method: 'get',
    response: () => {
      return successResp({
        count: 500,
        data: Array(12)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              dbName: Random.name(),
              collectionName: Random.name(),
            };
          }),
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/index',
    method: 'get',
    response: () => {
      return successResp({
        count: 500,
        data: Array(12)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              dbName: Random.name(),
              collectionName: Random.name(),
            };
          }),
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/attr',
    method: 'get',
    response: () => {
      return successResp({
        count: 500,
        data: Array(12)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              dbName: Random.name(),
              collectionName: Random.name(),
              docName: Random.name(),
            };
          }),
      });
    },
  },
];

export default requests;
