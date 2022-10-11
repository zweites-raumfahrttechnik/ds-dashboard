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

export const defaultFromValue: Record<number, Omit<FormModel, 'type'>> = {
  1: {
    uuid: '',
    dbname:1,
    action: '',
    keyType: '',
    key: '',
    parameter1: '',
    parameter2: ''
  },
};
