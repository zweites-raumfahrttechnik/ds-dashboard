import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const sql: RouteRecordRaw = {
  path: '/sql',
  name: 'SQL',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'user',
      name: 'UserManage',
      component: () => import('@/pages/sql/UserManage.vue'),
      meta: {
        requireAuth: true,
        locale: '用户管理',
      },
    },
    {
      path: 'single',
      name: 'SingleQuery',
      component: () => import('@/pages/sql/SingleQuery.vue'),
      meta: {
        requireAuth: true,
        locale: '单表查询',
      },
    },
    {
      path: 'customize',
      name: 'CustomizeQuery',
      component: () => import('@/pages/sql/CustomizeQuery.vue'),
      meta: {
        requireAuth: true,
        locale: '自定义操作',
      },
    },
  ],
  meta: {
    requireAuth: true,
    locale: '关系型数据库操作',
    icon: 'icon-plus-circle',
    order: 4,
  },
};

export default sql;
