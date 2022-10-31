import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/mgdb/meta/db',
    method: 'get',
    response: () => {
      return successResp({
        count: 10,
        //自定义-可修改
        data: Array(10)
          .fill(1)
          .map(() => {
            return Random.name();
          }),
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/collection',
    method: 'get',
    response: () => {
      return successResp({
        count: 10,
        //自定义-可修改
        data: Array(10)
          .fill(1)
          .map(() => {
            return Random.name();
          }),
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/doc',
    method: 'get',
    response: () => {
      return successResp({
        count: 16,
        data: Array(8)
          .fill(1)
          .map(
            () => `{
    "uuid": "28",
    "dbName": "还无张八",
    "collectionName": "斗地又类造",
    "isMany": false,
    "items": [
        {
            "filed": "consectetur",
            "op": "aute proident aliqua ex dolore",
            "target": "esse Duis culpa veniam et"
        },
        {
            "filed": "Ut magna quis tempor",
            "op": "consequat Excepteur",
            "target": "velit"
        }
    ],
    "documents": [
        "aliquip ipsum ullamco qui exercitation",
        "aute",
        "elit laborum magna aute"
    ]
}`,
          ),
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/index',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|count': [Random.string],
        },
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/attr',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|count': [Random.string],
        },
      });
    },
  },
];

export default requests;
