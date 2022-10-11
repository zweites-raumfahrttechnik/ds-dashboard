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
        locale: '单表查询',
      },
    }],
  meta: {
    requireAuth: true,
    locale: '数据库管理',
    icon: 'icon-list',
    order: 4,
  },
};

export default connect;