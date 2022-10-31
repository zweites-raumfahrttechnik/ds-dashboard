import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const connect: RouteRecordRaw = {
  path: '/connect',
  name: 'Connect',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'add',
      name: 'AddConnect',
      component: () => import('@/pages/connect/AddConnect.vue'),
      meta: {
        requireAuth: true,
        locale: '添加连接',
      },
    },
    {
      path: 'list',
      name: 'ConnectList',
      component: () => import('@/pages/connect/ConnectList.vue'),
      meta: {
        requireAuth: true,
        locale: '连接列表',
      },
    },
  ],
  meta: {
    requireAuth: true,
    locale: '数据库连接',
    icon: 'icon-bookmark',
    order: 2,
  },
};

export default connect;
