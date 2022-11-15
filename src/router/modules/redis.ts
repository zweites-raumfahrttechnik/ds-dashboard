import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const redis: RouteRecordRaw = {
  path: '/redis',
  name: 'Redis',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'management',
      name: 'RedisManegement',
      component: () => import('@/pages/redis/RedisManagement.vue'),
      meta: {
        requireAuth: true,
        locale: '操作面板',
      },
    },
  ],
  meta: {
    requireAuth: true,
    locale: 'Redis',
    icon: 'icon-storage',
    order: 5,
  },
};
export default redis;
