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

export interface FormModel {
  /**
   * get/set/delete/exist/type/count
   */
  action: string;
  dbname: number;
  key: string;
  /**
   * acition为set/get时  string/set/list/zset/hash
   * acition为delete/exist时  item/set/list/zset/hash
   */
  keyType: string;
  parameter1: string;
  parameter2: string;
  uuid: string;
}

//用户列表的参数的接口
export interface UserlistParams{
  uuid:string,
  type:1|2|3,
  username:string,
  host:string,
  password:string
}
//响应的数组
export interface UserlistData{
  data:UserlistParams[]
}
