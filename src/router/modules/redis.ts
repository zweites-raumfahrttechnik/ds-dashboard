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
    {
      path: '/RedisConnect',
      name: 'RedisConnect',
      component: () => import('@/pages/redis/RedisConnect.vue'),
      meta: {
        requireAuth: true,
        locale: '数据库连接列表',
      },
    },
    {
      path: '/RedisManage',
      name: 'RedisManage',
      component: () => import('@/pages/redis/RedisManage.vue'),
      meta: {
        requireAuth: true,
        locale: '元数据查看',
      },
    },
    {
      path: '/RedisBasicOp',
      name: 'RedisBasicOp',
      component: () => import('@/pages/redis/RedisbasicOp.vue'),
      meta: {
        requireAuth: true,
        locale: '基本操作',
      },
    },
    {
      path: '/RedisCustomOp',
      name: 'RedisCustomOp',
      component: () => import('@/pages/redis/RediscustomOp.vue'),
      meta: {
        requireAuth: true,
        locale: '自定义操作',
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
    order: 5,
  },
};
export default redis;
