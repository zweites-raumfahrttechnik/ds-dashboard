import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const sql: RouteRecordRaw = {
  path: '/theme',
  name: 'Theme',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'create',
      name: 'ThemeCreate',
      component: () => import('@/pages/theme/OverviewPage.vue'),
      meta: {
        requireAuth: true,
        locale: '服务生成',
      },
    },
    {
      path: 'list',
      name: 'ThemeList',
      component: () => import('@/pages/theme/OverviewPage.vue'),
      meta: {
        requireAuth: true,
        locale: '服务列表',
      },
    },
  ],
  meta: {
    requireAuth: true,
    locale: '主题服务',
    icon: 'icon-cloud',
    order: 7,
  },
};

export default sql;
