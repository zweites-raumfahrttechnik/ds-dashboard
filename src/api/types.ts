// 获取链接数据
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

// 图表数据
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

// Mongdb 数据
export interface MongodbDBInfo {
  count: number;
  data: string[];
}

export interface MongodbCollectionInfo {
  count: number;
  data: string[];
}

export interface MongdbDocInfo {
  count: number;
  data: string[];
}

export interface MongodbCustom {
  document: string;
}

export interface MongdbIndexInfo {
  count: number;
  data: string[];
}
