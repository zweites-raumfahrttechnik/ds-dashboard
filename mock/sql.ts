import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/execute/sql',
    method: 'get',
    response: () => {
      const columnName = ['name', 'age', 'email', 'phone'] as const;
      type columnType = typeof columnName[number];
      return successResp({
        columnList: columnName.map(value => {
          return {
            columnName: value,
            columnTypeName: Random.pick(['string', 'integer']),
          };
        }),
        data: Array(Random.integer(50, 100))
          .fill(1)
          .map(() => {
            const item: Record<columnType, unknown> = {
              name: '',
              age: '',
              email: '',
              phone: '',
            };
            columnName.forEach(value => {
              item[value] = Random.name();
            });
            return item;
          }),
      });
    },
  },
];

export default requests;
