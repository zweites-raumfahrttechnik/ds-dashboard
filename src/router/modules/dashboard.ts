import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const dashboard: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: MAIN_LAYOUT,
  children: [
    // {
    //   path: 'overview',
    //   name: 'Overview',
    //   component: () => import('@/pages/dashboard/OverviewPage.vue'),
    //   meta: {
    //     requireAuth: true,
    //     locale: '系统概览',
    //   },
    // },
    {
      path: 'state',
      name: 'State',
      component: () => import('@/pages/dashboard/StatePage.vue'),
      meta: {
        requireAuth: true,
        locale: '运行状态',
      },
    },
  ],
  meta: { requireAuth: true, locale: '仪表盘', icon: 'icon-dashboard', order: 1 },
};

export default dashboard;
