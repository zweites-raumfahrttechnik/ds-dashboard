export interface FormModel {
  uuid: string;
  index: string;
  indexOpType: 'NONE' | 'DELETE' | 'CREATE';
  docid: string;
  docOpType: 'NONE' | 'DELETE' | 'CREATE' | 'UPDATE' | 'SEARCH';
  entityInfo: string;
}
