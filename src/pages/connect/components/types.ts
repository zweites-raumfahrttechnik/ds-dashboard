export interface FormModel {
  ip?: string;
  port?: number;
  username?: string;
  password?: string;
  name?: string;
  exportIp?: string;
  exportPort?: number;
  others?: string;
  type: 1 | 2 | 3 | 4 | 5 | 6;

  [key: string]: unknown;
}

export const defaultFromValue: Record<number, Omit<FormModel, 'type'>> = {
  1: {
    ip: '',
    port: 3306,
    username: '',
    password: '',
    name: '',
    exportIp: '',
    others: '',
  },
  2: {
    ip: '',
    port: 5236,
    username: '',
    password: '',
    name: '',
    exportIp: '',
    others: '',
  },
  3: {
    ip: '',
    port: 54321,
    username: '',
    password: '',
    name: '',
    exportIp: '',
    others: '',
  },
  4: {
    ip: '',
    port: 6379,
    username: '',
    password: '',
    exportIp: '',
    name: '',
    others: '',
  },
  5: {
    ip: '',
    port: 27017,
    username: '',
    password: '',
    name: '',
    exportIp: '',
    others: '',
  },
  6: {
    ip: '',
    port: 9200,
    username: '',
    password: '',
    name: '',
    exportIp: '',
    others: '',
  },
};
