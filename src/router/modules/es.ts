import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const es: RouteRecordRaw = {
  path: '/es',
  name: 'ElasticSearch',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'management',
      name: 'ESManagement',
      component: () => import('@/pages/es/EsManagement.vue'),
      meta: {
        requireAuth: true,
        locale: '操作面板',
      },
    },
  ],
  meta: { requireAuth: true, locale: 'ElasticSearch', icon: 'icon-search', order: 5 },
};
export default es;
