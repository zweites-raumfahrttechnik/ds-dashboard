import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/table/query',
    method: 'post',
    response: ({ body }: { body: { size: number } }) => {
      const size = +body.size;
      const columnName = ['name', 'age', 'email', 'phone'] as const;
      type columnType = typeof columnName[number];
      return successResp({
        columnList: columnName.map(value => {
          return {
            columnName: value,
            columnTypeName: Random.pick(['string', 'integer']),
          };
        }),
        data: Array(size)
          .fill(1)
          .map(() => {
            const item: Record<columnType, any> = {
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
        count: 500,
      });
    },
  },
];

export default requests;
