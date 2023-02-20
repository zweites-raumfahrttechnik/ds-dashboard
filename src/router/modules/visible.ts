import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const visible: RouteRecordRaw = {
  path: '/visible',
  name: 'Visible',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'add',
      name: 'AddUserVisible',
      component: () => import('@/pages/visible/AddUserVisible.vue'),
      meta: {
        requireAuth: true,
        locale: '添加',
        roles: ['admin'],
        system: ['UserServer'],
      },
    },
    {
      path: 'list',
      name: 'UserVisibleList',
      component: () => import('@/pages/visible/UserVisibleList.vue'),
      meta: {
        requireAuth: true,
        locale: '列表',
        roles: ['admin'],
        system: ['UserServer'],
      },
    },
  ],
  meta: {
    requireAuth: true,
    locale: '用户可见可删性',
    icon: 'icon-eye',
    order: 7,
  },
};

export default visible;
