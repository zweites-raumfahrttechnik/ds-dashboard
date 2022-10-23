export interface FormModel {
  /**
   * get/set/delete/exist/type/count
   */
  action?: string;
  dbname?: number;
  key?: string;
  /**
   * acition为set/get时  string/set/list/zset/hash
   * acition为delete/exist时  item/set/list/zset/hash
   */
  keyType?: string;
  parameter1?: string;
  parameter2?: string;
  uuid?: string;
}
export interface CustomFormModel {
  args:    string[] | undefined;
  command: string;
  dbnumber: number;
  uuid:    string;
}
// export const defaultFromValue: Record<number, Omit<FormModel, 'type'>> = {
//   0: {
//     uuid: '',
//     dbname:0,
//     action: '',
//     keyType: '',
//     key: '',
//     parameter1: '',
//     parameter2: ''
//   },
//   1: {
//     uuid: '',
//     dbname:1,
//     action: '',
//     keyType: '',
//     key: '',
//     parameter1: '',
//     parameter2: ''
//   },
//   2: {
//     uuid: '',
//     dbname:2,
//     action: '',
//     keyType: '',
//     key: '',
//     parameter1: '',
//     parameter2: ''
//   },
//   3: {
//     uuid: '',
//     dbname:3,
//     action: '',
//     keyType: '',
//     key: '',
//     parameter1: '',
//     parameter2: ''
//   },
//   4: {
//     uuid: '',
//     dbname:4,
//     action: '',
//     keyType: '',
//     key: '',
//     parameter1: '',
//     parameter2: ''
//   },
//   5: {
//     uuid: '',
//     dbname:5,
//     action: '',
//     keyType: '',
//     key: '',
//     parameter1: '',
//     parameter2: ''
//   },
// };



// export const defaultCustomFromValue: Record<number, CustomFormModel> = {
//   0:{
//     args:[],
//     command:'',
//     dbnumber:0,
//     uuid:''
//   }
// }