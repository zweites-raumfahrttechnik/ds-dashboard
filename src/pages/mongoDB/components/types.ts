export interface Operate {
  EQ: '=';
  GT: '>';
  GTE: '>=';
  LT: '<';
  LTE: '<=';
  NE: '!=';

  [key: string]: unknown;
}

export const opMap: Operate = {
  EQ: '=',
  GT: '>',
  GTE: '>=',
  LT: '<',
  LTE: '<=',
  NE: '!=',
};

export interface ConditionItem {
  field: string;
  op: 'EQ' | 'GT' | 'GTE' | 'LT' | 'LTE' | 'NE';
  target: string;
}
