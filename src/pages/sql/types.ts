export interface ConnectFormModel {
  uuid: string;
  type: number;
  schema: string;
  table: string;
}

export interface WhereParams {
  column: string;
  columnType: string;
  value: string;
  queryType: '<' | '>' | 'like' | '=' | '>=' | '<=';
}

export interface OrderParams {
  column: string;
  type: 1 | 0;
}

export interface ColumnParams {
  column: string;
}

export interface QueryFormModel {
  columnList: Array<string>;
  whereList: Array<WhereParams>;
  orderByList: Array<OrderParams>;
}

export interface QueryParams {
  uuid: string;
  type: number;
  table: string;
  columnList: Array<string>;
  whereList: Array<WhereParams>;
  orderByList: Array<OrderParams>;
  pg?: number;
  size?: number;
}

export const defaultConnectFormValue: ConnectFormModel = {
  uuid: '',
  type: 1,
  schema: '',
  table: '',
};

export const defaultQueryFormValue: QueryFormModel = {
  columnList: [],
  whereList: [{ column: '', columnType: '', value: '', queryType: '=' }],
  orderByList: [{ column: '', type: 1 }],
};

export const defaultQueryParams: QueryParams = {
  uuid: '',
  type: 1,
  table: '',
  columnList: [''],
  whereList: [{ column: '', columnType: '', value: '', queryType: '=' }],
  orderByList: [{ column: '', type: 1 }],
  pg: 1,
  size: 15,
};

export const boxTabCol = (arr: Array<Record<string, string> | undefined> | undefined) => {
  if (arr != undefined) {
    const res = Array(0);

    arr.forEach(obj => {
      if (obj != undefined) {
        res.push({
          title: obj.columnName,
          dataIndex: obj.columnName,
          sortable: {
            sortDirections: ['ascend', 'descend'],
          },
        });
      }
    });
    return res;
  }
  return [];
};
