import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/execute/sql',
    method: 'get',
    response: () => {
      return successResp({
        data: Array(10)
          .fill(1)
          .map(() => {
            return {
              columnList: {
                columnName: Random.name(),
                columnTypeName: Random.pick(['int', 'string']),
              }, //长度为2的数组
              data: {
                'data|2': [],
              },
            };
          }),
      });
    },
  },
];

export default requests;
