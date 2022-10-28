import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const connect: RouteRecordRaw = {
  path: '/usermanage',
  name: 'Usermanage',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'list',
      name: 'Userlist',
      component: () => import('@/pages/userManage/UserList.vue'),
      meta: {
        requireAuth: true,
        locale: '用户列表',
      },
    },
    {
      path: 'permissions',
      name: 'permissions',
      component: () => import('@/pages/userManage/PermissionPage.vue'),
      meta: {
        requireAuth: true,
        locale: '权限列表',
      },
    },
  ],
  meta: {
    requireAuth: true,
    locale: '用户管理',
    icon: 'icon-list',
    order: 3,
  },
};

export default connect;
