const v1 = '/v1';

export const CONNECT_URL = `${v1}/connect`;

export const CPU_CHART_URL = `${v1}/chart/cpu`;
export const MEMORY_CHART_URL = `${v1}/chart/memory`;
export const BANDWIDTH_CHART_URL = `${v1}/chart/bandwidth`;
export const POOL_CHART_URL = `${v1}/chart/pool`;
export const STORAGE_CHART_URL = `${v1}/chart/storage`;
export const CONCURRENT_CHART_URL = `${v1}/chart/concurrent`;

//自定义请求操作
export const REQUEST_USERLIST_URL=`${v1}/sql/user/request`;

export const Add_USERLIST_URL=`${v1}/sql/user/add`;
export const UPDATE_USER_URL=`${v1}/sql/user/update`;
export const DELETE_USER_URL=`${v1}/sql/user/delete`;
export const GRANT_USER_URL=`${v1}/sql/user/grant`;
export const REVOKE_USER_URL=`${v1}/sql/user/revoke`;

export const InQUERY_DATABASE_URL=`${v1}/table/query`;
export const EXECUTE_DATABASE_URL=`${v1}/execute/sql`;
