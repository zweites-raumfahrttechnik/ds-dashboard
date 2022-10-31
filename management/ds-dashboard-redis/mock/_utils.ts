export interface RespWrapper<T> {
  code: number;
  msg: string;
  data?: T;
}

export function successResp<T>(data?: T): RespWrapper<T> {
  return {
    code: 0,
    msg: 'success',
    data: data,
  };
}
