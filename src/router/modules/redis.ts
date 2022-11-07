import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const redis: RouteRecordRaw = {
  path: '/redis',
  name: 'Redis',
  component: MAIN_LAYOUT,
  children: [
    {
      path: '/redisConnect',
      name: 'redisConnect',
      component: () => import('@/pages/redis/RedisConnect.vue'),
      meta: {
        requireAuth: true,
        locale: 'redis列表',
      },
    },
    {
      path: '/redisManagement',
      name: 'redisManagement',
      component: () => import('@/pages/redis/RedisManage.vue'),
      meta: {
        requireAuth: true,
        hideInMenu: true,
        locale: 'redis元数据管理',
      },
    },
    {
      path: '/redisbasicOp',
      name: 'redisbasicOp',
      component: () => import('@/pages/redis/RedisBasicOp.vue'),
      meta: {
        requireAuth: true,
        hideInMenu: true,
        locale: 'redis基本操作',
      },
    },
    {
      path: '/rediscustomOp',
      name: 'rediscustomOp',
      component: () => import('@/pages/redis/RedisCustomOp.vue'),
      meta: {
        requireAuth: true,
        hideInMenu: true,
        locale: 'redis自定义操作',
      },
    },
    {
      path: '/redismetaKeys',
      name: 'redismetaKeys',
      component: () => import('@/pages/redis/components/RedismetaKeys.vue'),
      meta: {
        requireAuth: true,
        hideInMenu: true,
        locale: 'redis键名',
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
