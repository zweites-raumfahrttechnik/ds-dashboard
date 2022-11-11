import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const columnName = ['name', 'age', 'email', 'phone'] as const;
type columnType = typeof columnName[number];

const getSqlMetaData = () => {
  return {
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
  };
};

const requests: MockMethod[] = [
  {
    url: '/api/v1/sql/meta/schema',
    method: 'get',
    response: () => {
      return successResp({
        names: Array(Random.integer(20, 30))
          .fill(1)
          .map(() => {
            return Random.name();
          }),
        briefData: getSqlMetaData(),
        allData: getSqlMetaData(),
      });
    },
  },
  {
    url: '/api/v1/sql/meta/table',
    method: 'get',
    response: () => {
      return successResp({
        names: Array(Random.integer(20, 30))
          .fill(1)
          .map(() => {
            return Random.name();
          }),
        briefData: getSqlMetaData(),
        allData: getSqlMetaData(),
      });
    },
  },
  {
    url: '/api/v1/sql/meta/view',
    method: 'get',
    response: () => {
      return successResp({
        names: Array(Random.integer(20, 30))
          .fill(1)
          .map(() => {
            return Random.name();
          }),
        briefData: getSqlMetaData(),
        allData: getSqlMetaData(),
      });
    },
  },
  {
    url: '/api/v1/sql/meta/column',
    method: 'get',
    response: () => {
      return successResp({
        names: Array(Random.integer(20, 30))
          .fill(1)
          .map(() => {
            return Random.name();
          }),
        briefData: getSqlMetaData(),
        allData: getSqlMetaData(),
      });
    },
  },
];

export default requests;
