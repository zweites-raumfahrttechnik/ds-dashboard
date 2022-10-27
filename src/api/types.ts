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

export interface redisDBtotal{
  data:number
}

//redis元数据-数据库大小获取接口
export interface redisDbsize{
  dbsize:number
}

//redis元数据-keys获取接口
export interface redisKeys{
  count:number,
  data:string[]
}

//redis元数据-keys获取参数
export interface redisgetkeysParams{
  uuid:string,
  dbnumber:number,
  pg:number,
  size:number
}
