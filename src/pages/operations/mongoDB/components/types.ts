export interface FormModel {
    uuid?: string;
    dbName?: number;
    collectionName?: string;
    filed?: string;
    op?: string;
    target?: string;
  
    [key: string]: unknown;
  }
  
  export const defaultFromValue: Record<number, Omit<FormModel, 'type'>> = {
    1: {
      uuid: '',
      dbName: '',
      collectionName: '',
      filed: '',
      op: '',
      target: '',
    },
    2: {
      uuid: '',
      dbName: '',
      collectionName: '',
      filed: '',
      op: '',
      target: '',
    },
    3: {
      uuid: '',
      dbName: '',
      collectionName: '',
      filed: '',
      op: '',
      target: '',
    },
    4: {
      uuid: '',
      dbName: '',
      collectionName: '',
      filed: '',
      op: '',
      target: '',
    },
    5: {
      uuid: '',
      dbName: '',
      collectionName: '',
      filed: '',
      op: '',
      target: '',
    },
    6: {
      uuid: '',
      dbName: '',
      collectionName: '',
      filed: '',
      op: '',
      target: '',
    },
  };
  