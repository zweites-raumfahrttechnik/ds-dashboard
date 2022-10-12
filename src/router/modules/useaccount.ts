import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const connect: RouteRecordRaw = {
  path: '/usermanage',
  name: 'Usermanage',
  component: MAIN_LAYOUT,
  children: [
    {
      path: 'userlist',
      name: 'Userlist',
      component: () => import('@/pages/usermanage/Userlist.vue'),
      meta: {
        requireAuth: true,
        locale: '用户列表',
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