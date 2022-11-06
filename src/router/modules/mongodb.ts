import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const mongoDB: RouteRecordRaw = {
  path: '/mongoDB',
  name: 'MongoDB',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'management',
      name: 'MongoManagement',
      component: () => import('@/pages/mongoDB/MongoManagement.vue'),
      meta: {
        requireAuth: true,
        locale: '元数据查看',
      },
    },
    {
      path: 'customize',
      name: 'MongoCustomize',
      component: () => import('@/pages/mongoDB/MongoCustomize.vue'),
      meta: {
        requireAuth: true,
        locale: '自定义操作',
      },
    },
  ],
  meta: { requireAuth: true, locale: 'MongoDB', icon: 'icon-layers', order: 4 },
};
export default mongoDB;
