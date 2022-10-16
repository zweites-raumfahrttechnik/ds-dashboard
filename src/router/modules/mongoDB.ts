import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const operations: RouteRecordRaw = {
  path: '/mongoDB',
  name: 'MongoDB',
  component: MAIN_LAYOUT,
  meta: {
    requireAuth: true,
    locale: 'MongoDB',
    icon: 'IconDriveFile',
  },
  children: [
    {
      path: 'operation',
      name: 'MongoDBOperation',
      component: () => import('@/pages/mongoDB/MongoDBOperation.vue'),
      meta: {
        requireAuth: true,
        locale: '数据操作',
      },
    },
    {
      path: 'edit',
      name: 'MongoDBEdit',
      component: () => import('@/pages/mongoDB/MongoDBEdit.vue'),
      meta: {
        requireAuth: true,
        locale: '管理',
      },
    },
  ],
};

export default operations;
