export interface TableModal {
  collectionName: string;
  dbName:         string;
  documents?:     string[];
  isMany:         boolean;
  items:          Item[];
  uuid:           string;
}

export interface Item {
  filed:  string;
  op:     Op;
  target: string;
}

export enum Op {
  Eq = "EQ",
  Gt = "GT",
  Gte = "GTE",
  LTE = "LTE",
  Lt = "LT",
  Ne = "NE",
}