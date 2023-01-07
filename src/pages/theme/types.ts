export interface GenCodeFormModel {
  group: string;
  artifact: string;
  name: string;
  describe?: string;
  nacosUrl?: string;
  nacosPort?: number;
  zipkinUrl?: string;
  zipkinPort?: number;
  uuid: string;
  url?: string;
  paramsJson?: any;
}

export const defaultGenCodeFormValue: GenCodeFormModel = {
  group: 'org.buaaica',
  artifact: 'demo',
  name: 'theme_server',
  describe: 'Demo project for Theme Server',
  nacosUrl: '127.0.0.1',
  nacosPort: 8848,
  zipkinUrl: '127.0.0.1',
  zipkinPort: 9411,
  uuid: '',
  url: '',
};

export interface QueryParams {
  uuid?: string;
  type: number;
  table: string;
  columnList: Array<string>;
  whereList: Array<WhereParams>;
  orderByList: Array<OrderParams>;
  pg?: number;
  size?: number;
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

export const defaultQueryParams: QueryParams = {
  type: 1,
  table: '',
  columnList: [''],
  whereList: [{ column: '', columnType: '', value: '', queryType: '=' }],
  orderByList: [{ column: '', type: 1 }],
};

export interface ConnectFormModel {
  uuid: string;
  type: number;
  schema: string;
  table: string;
}

export const defaultConnectFormValue: ConnectFormModel = {
  uuid: '',
  type: 1,
  schema: '',
  table: '',
};

export interface QueryFormModel {
  columnList: Array<string>;
  whereList: Array<WhereParams>;
  orderByList: Array<OrderParams>;
}

export const defaultQueryFormValue: QueryFormModel = {
  columnList: [],
  whereList: [{ column: '', columnType: '', value: '', queryType: '=' }],
  orderByList: [{ column: '', type: 1 }],
};
