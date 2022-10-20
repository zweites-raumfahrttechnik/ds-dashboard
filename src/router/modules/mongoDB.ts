import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const mongoDB: RouteRecordRaw = {
  path: '/mongoDB',
  name: 'MongoDB',
  component: MAIN_LAYOUT,
  meta: { requireAuth: true, locale: 'MongoDB', icon: 'IconDriveFile' },

  children: [
    {
      path: 'edit',
      name: 'DataEdit',
      component: () => import('@/pages/mongoDB/MongoEdit.vue'),
      meta: {
        requireAuth: true,
        locale: '数据操作',
        icon: 'IconDriveFile',
      },
    },
    {
      path: 'mongoManagement',
      name: 'MongoManagement',
      component: () => import('@/pages/mongoDB/MongoManagement.vue'),
      meta: {
        requireAuth: true,
        locale: 'Mongo管理',
        icon: 'IconApps',
      },
    },
    {
      path: 'jsonEditor',
      name: 'JsonEditor',
      component: () => import('@/pages/mongoDB/components/JsonEditor.vue'),
      meta: {
        requireAuth: true,
        locale: 'JsonEditor',
        icon: 'IconApps',
      },
    },
  ],
};
export default mongoDB;
