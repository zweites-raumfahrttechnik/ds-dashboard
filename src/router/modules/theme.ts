import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const sql: RouteRecordRaw = {
  path: '/theme',
  name: 'Theme',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'generate',
      name: 'ThemeGenerate',
      component: () => import('@/pages/theme/ThemeGenerate.vue'),
      meta: {
        requireAuth: true,
        locale: '服务生成',
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
