export interface ApifoxModal {
    //标识符
    uuid:string;
    //数据库类型
    type:number;
    //表名
    table:string;
    //过滤条件where
    whereList:Empty[];
    //过滤条件列表
    columnList:  string[];
    //分组条件列表
    groupByList: string[];
    orderByList: OrderByList[];
    pg:number;
    size:number;
    "01GDN72EPTEWDSKXR3KFBR2EC1": any;
}

export interface OrderByList {
    //列名
    column?:string;
    //降序还是顺序--ASC/DESC
    type?:number;
}

export interface Empty {
    //列名
    column: string;
    //列的类型是字符型还是整型
    columnType: string;
    //查询类型--< > like =
    queryType:string;
    //数值
    value:string;
    "01GDPZVTVYAA5YZRH0VC5DM1A9": any;
}
