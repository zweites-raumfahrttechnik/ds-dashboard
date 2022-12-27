import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const visible: RouteRecordRaw = {
  path: '/visible',
  name: 'Visible',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'adduservisible',
      name: 'AddUserVisible',
      component: () => import('@/pages/visible/AddUserVisible.vue'),
      meta: {
        requireAuth: true,
        locale: '添加用户可见可删性',
      },
    },
    {
      path: 'uservisiblelist',
      name: 'UserVisiblelist',
      component: () => import('@/pages/visible/UserVisibleList.vue'),
      meta: {
        requireAuth: true,
        locale: '用户可见可删性列表',
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
