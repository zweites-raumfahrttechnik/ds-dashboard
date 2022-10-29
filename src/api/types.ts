export interface GetConnectListParams {
  pg: number;
  size: number;
  ip?: string;
  username?: string;
  type?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface GetListDataItem {
  uuid: string;
  username: string;
  ip: string;
  port: number;
  type: number;
}

export interface GetListData {
  count: number;
  data: GetListDataItem[];
}

export interface ChartValue {
  count: number;
  growth: number;
  value: number[];
}

export interface ConcurrentChartValue {
  xAxis: string[];
  concurrent: number[];
  through: number[];
}

export interface DBinformationParams {
  uuid?: string;
  dbName?: string;
  collectionName?: string;
  docName?: string;
}

export interface DBListData {
  count: number;
  data: DBinformationParams[];
}

export interface TreeinformationParams {
  uuid: string;
}

export interface TreeData {
  data: TreeinformationParams[];
}

export interface CollectioninformationParams {
  uuid?: string;
  dbName?: string;
}

export interface CollectionListData {
  count: number;
  data: CollectioninformationParams[];
}

export interface DocinformationParams {
  uuid?: string;
  dbName?: string;
  collectionName?: string;
}

export interface DocListData {
  count: number;
  data: DocinformationParams[];
}

export interface IndexinformationParams {
  uuid?: string;
  dbName?: string;
  collectionName?: string;
}

export interface IndexListData {
  count: number;
  data: IndexinformationParams[];
}

export interface AttrinformationParams {
  uuid?: string;
  dbName?: string;
  collectionName?: string;
  docName?: string;
}

export interface AttrListData {
  count: number;
  data: AttrinformationParams[];
}
