const v1 = '/v1';

export const CONNECT_URL = `${v1}/connect`;

export const CPU_CHART_URL = `${v1}/chart/cpu`;
export const MEMORY_CHART_URL = `${v1}/chart/memory`;
export const BANDWIDTH_CHART_URL = `${v1}/chart/bandwidth`;
export const POOL_CHART_URL = `${v1}/chart/pool`;
export const STORAGE_CHART_URL = `${v1}/chart/storage`;
export const CONCURRENT_CHART_URL = `${v1}/chart/concurrent`;

export const MONGODB_DB_URL = `${v1}/mgdb/meta/db`;
export const MONGODB_COLLECTION_URL = `${v1}/mgdb/meta/collection`;
export const MONGODB_DOC_URL = `${v1}/mgdb/meta/doc`;
export const MONGODB_INDEX_URL = `${v1}/mgdb/meta/index`;
export const MONGODB_ATTR_URL = `${v1}/mgdb/meta/attr`;
export const MONGODB_QUERY_URL = `${v1}/mgdb/query`;
export const MONGODB_READ_URL = `${v1}/mgdb/read`;

export const BSON_URL = `${v1}/exexute/bson`;

//自行引入为了生成树下数据，可删
export const TREE_URL = `${v1}/mgdb/meta/Tree`;
