import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const operations: RouteRecordRaw = {
  path: '/operations',
  name: 'Operations',
  component: MAIN_LAYOUT,
  meta: { requireAuth: true, locale: '运维', icon: 'IconDesktop'},
  children:[
    {
    path:'mongoDB',
    name:'MongoDB',
    meta:{
      requireAuth:true, locale:'MongoDB', icon: 'IconDriveFile'
    },
  children: [
    {
      path: 'dataoperation',
      name: 'DataOperation',
      component: () => import('@/pages/operations/mongoDB/DataOperation.vue'),
      meta: {
        requireAuth: true,
        locale: '数据操作',
        icon: 'IconDriveFile'
      },
    },
    {
      path: 'mongoedit',
      name: 'MongoEdit',
      component: () => import('@/pages/operations/mongoDB/MongoEdit.vue'),
      meta: {
        requireAuth: true,
        locale: 'Mongo管理',
        icon: 'IconApps'
      },
    },
  ],
},
  ],
};
export default operations;
