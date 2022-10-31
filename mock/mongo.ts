import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/mgdb/query',
    method: 'post',
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
    url: '/api/v1/mgdb/read',
    method: 'post',
    response: () => {
      return successResp({
        count: 4,
        data: Array(4)
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
    url: '/api/v1/mgdb/query',
    method: 'put',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/mgdb/query',
    method: 'delete',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/execute/bson',
    method: 'post',
    response: () => {
      return successResp({
        document: `{"status":"success"}`,
      });
    },
  },
];

export default requests;
