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
        locale: 'redis管理',
      },
    },
    {
      path: '/redisManagementexperience',
      name: 'redisManagementexperience',
      component: () => import('@/pages/redis/redisManagementexperience.vue'),
      meta: {
        requireAuth: true,
        locale: 'redis管理试验',
      },
    },
    {
      path: '/redisManage_experience',
      name: 'redisManage_experience',
      component: () => import('@/pages/redis/redisManage_experience1.vue'),
      meta: {
        requireAuth: true,
        locale: 'redis管理试验1',
      },
    },
    {
      path: '/redisManage_experience2',
      name: 'redisManage_experience2',
      component: () => import('@/pages/redis/redisManagement_experience2.vue'),
      meta: {
        requireAuth: true,
        locale: 'redis管理试验2',
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
