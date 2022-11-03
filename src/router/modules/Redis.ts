import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const redis: RouteRecordRaw = {
  path: '/Redis',
  name: 'Redis',
  component: MAIN_LAYOUT,
  children: [
    {
      path: '/RedisConnect',
      name: 'RedisConnect',
      component: () => import('@/pages/redis/RedisConnect.vue'),
      meta: {
        requireAuth: true,
        locale: 'redis数据库连接列表',
      },
    },
    {
      path: '/RedisManage',
      name: 'RedisManage',
      component: () => import('@/pages/redis/RedisManage.vue'),
      meta: {
        requireAuth: true,
        hideInMenu: true,
        locale: 'redis元数据查询',
      },
    },
    {
      path: '/RedisBasicOp',
      name: 'RedisBasicOp',
      component: () => import('@/pages/redis/RedisBasicOp.vue'),
      meta: {
        requireAuth: true,
        hideInMenu: true,
        locale: 'redis基本操作',
      },
    },
    {
      path: '/RedisCustomOp',
      name: 'RedisCustomOp',
      component: () => import('@/pages/redis/RedisCustomOp.vue'),
      meta: {
        requireAuth: true,
        hideInMenu: true,
        locale: 'redis自定义操作',
      },
    },
    {
      path: '/RedismetaKeys',
      name: 'RedismetaKeys',
      component: () => import('@/pages/redis/components/RedismetaKeys.vue'),
      meta: {
        requireAuth: true,
        hideInMenu: true,
        locale: '数据库详情',
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
