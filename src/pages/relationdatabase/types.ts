export interface ApifoxModal {
    columnList:  string[];
    groupByList: string[];
    orderByList: OrderByList[];
    pg:number;
    size:number;
    /**
     * 表名
     */
    table:string;
    type:number;
    uuid:string;
    whereList:Empty[];
    "01GDN72EPTEWDSKXR3KFBR2EC1": any;
}

export interface OrderByList {
    column?:string;
    type?:number;
}

export interface Empty {
    column: string;
    /**
     * string、int
     */
    columnType: string;
    /**
     * < > like =
     */
    queryType:string;
    value:string;
    "01GDPZVTVYAA5YZRH0VC5DM1A9": any;
}