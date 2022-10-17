import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/table/query',
    method: 'post',
    response: () => {
      return successResp({
        columnList:{
          columnName:,
          columnTypeName:,
        },
        data:{
          
        }
      });
    },
  },
];

export default requests;
