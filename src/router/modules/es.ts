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
      component: () => import('@/pages/es/ESManagement.vue'),
      meta: {
        requireAuth: true,
        locale: '元数据查看',
      },
    },
    // {
    //   path: 'customize',
    //   name: 'ESCustomize',
    //   component: () => import('@/pages/es/EsCustomize.vue'),
    //   meta: {
    //     requireAuth: true,
    //     locale: '自定义操作',
    //   },
    // },
  ],
  meta: { requireAuth: true, locale: 'ElasticSearch', icon: 'icon-search', order: 5 },
};
export default es;
