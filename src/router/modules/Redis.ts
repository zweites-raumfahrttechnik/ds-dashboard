import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const redis: RouteRecordRaw = {
  path: '/redis',
  name: 'Redis',
  component: MAIN_LAYOUT,
  children: [
    {
      path: '/redisManagement',
      name: 'redisManagement',
      component: () => import('@/pages/redis/redisManage.vue'),
      meta: {
        requireAuth: true,
        locale: 'redis元数据管理',
      },
    },
    {
      path: '/redisOp',
      name: 'redisOp',
      component: () => import('@/pages/redis/redisOp.vue'),
      meta: {
        requireAuth: true,
        locale: 'redis操作',
      },
    },
  ],
  meta: {
    requireAuth: true,
    locale: 'Redis',
    icon: 'icon-storage',
    order: 3,
  },
};

export default redis;
