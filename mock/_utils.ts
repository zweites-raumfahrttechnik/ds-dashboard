//定义返回值接口
export interface RespWrapper<T> {
  code: number;
  msg: string;
  data?: T;
}
//返回函数
export function successResp<T>(data?: T): RespWrapper<T> {
  return {
    code: 0,
    msg: 'success',
    data: data,
  };
}
