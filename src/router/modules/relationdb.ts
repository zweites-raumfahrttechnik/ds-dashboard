import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const connect: RouteRecordRaw = {
  path: '/relationdatabase',
  name: 'relationdatabase',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'tableInqueryPage',
      name: 'tableInqueryPage',
      component: () => import('@/pages/relationdatabase/TableInqueryPage.vue'),
      meta: {
        requireAuth: true,
        locale: '单表查询',
      },
    },
    {
      path: 'dboperations',
      name: 'dboperations',
      component: () => import('@/pages/relationdatabase/dboperations.vue'),
      meta: {
        requireAuth: true,
        locale: '数据库操作',
      },
    },
    
  ],
  meta: {
    requireAuth: true,
    locale: '数据库管理',
    icon: 'icon-apps',
    order: 4,
  },
};

export default connect;
