const v1 = '/v1';

export const CONNECT_URL = `${v1}/connect`;
export const CPU_CHART_URL = `${v1}/chart/cpu`;
export const MEMORY_CHART_URL = `${v1}/chart/memory`;
export const BANDWIDTH_CHART_URL = `${v1}/chart/bandwidth`;
export const POOL_CHART_URL = `${v1}/chart/pool`;
export const STORAGE_CHART_URL = `${v1}/chart/storage`;
export const CONCURRENT_CHART_URL = `${v1}/chart/concurrent`;

//自定义请求操作
export const REQUEST_USERLIST_URL = `${v1}/sql/user/request`;

export const Add_USERLIST_URL = `${v1}/sql/user/add`;
export const UPDATE_USER_URL = `${v1}/sql/user/update`;
export const DELETE_USER_URL = `${v1}/sql/user/delete`;
export const GRANT_USER_URL = `${v1}/sql/user/grant`;
export const REVOKE_USER_URL = `${v1}/sql/user/revoke`;

export const QUERY_DATABASE_URL = `${v1}/table/query`;
export const EXECUTE_DATABASE_URL = `${v1}/execute/sql`;

export const SQL_META_SCHEMA = `${v1}/sql/meta/schema`;
export const SQL_META_TABLE = `${v1}/sql/meta/table`;
export const SQL_META_VIEW = `${v1}/sql/meta/view`;
export const SQL_META_COLUMN = `${v1}/sql/meta/column`;

export const MONGODB_DB_URL = `${v1}/mgdb/meta/db`;
export const MONGODB_COLLECTION_URL = `${v1}/mgdb/meta/collection`;
export const MONGODB_DOC_URL = `${v1}/mgdb/meta/doc`;
export const MONGODB_INDEX_URL = `${v1}/mgdb/meta/index`;
export const MONGODB_ATTR_URL = `${v1}/mgdb/meta/attr`;
export const MONGODB_QUERY_URL = `${v1}/mgdb/query`;
export const MONGODB_READ_URL = `${v1}/mgdb/read`;

export const BSON_URL = `${v1}/execute/bson`;

export const MONGODB_META_DB_URL = `${v1}/mgdb/meta/db`;
export const MONGODB_META_COLLECTION_URL = `${v1}/mgdb/meta/collection`;

export const REDIS_OP_URL = `${v1}/execute/redis`;
export const REDIS_OP_CUSTOM_URL = `${v1}/execute/redis/complex`;

export const REDIS_META_DB_TOTAL_URL = `${v1}/execute/redis/meta/dbnumber`;
export const REDIS_META_DB_SIZE_URL = `${v1}/execute/redis/meta/dbsize`;
export const REDIS_KEYS_URL = `${v1}/execute/redis/meta/keys`;
export const REDIS_METHODS_URL = `${v1}/execute/redis/meta/methods`;

export const ES_META_INDEX = `${v1}/es/meta/index`;
export const ES_META_MAPPING = `${v1}/es/meta/mapping`;
export const ES_META_SETTING = `${v1}/es/meta/setting`;
export const ES_META_FIELDMAPPING = `${v1}/es/meta/fildmapping`;

export const ES_CREATE_INDEX = `${v1}/es/index/create`;
export const ES_DELETE_INDEX = `${v1}/es/index/delete`;
export const ES_CREATE_DOC = `${v1}/es/document/add`;
export const ES_GET_DOC = `${v1}/es/document/get`;
export const ES_UPDATE_DOC = `${v1}/es/document/update`;
export const ES_DELETE_DOC = `${v1}/es/document/delete`;
export const ES_SEARCH_DOC = `${v1}/es/document/search`;

export const GEN_CODE = `${v1}/code/gen`;
