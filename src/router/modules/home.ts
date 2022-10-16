import { RouteRecordRaw } from 'vue-router';
import { MAIN_LAYOUT } from '@/router/constant';

const home: RouteRecordRaw = {
  path: '/home',
  name: 'Home',
  component: MAIN_LAYOUT,
  meta: { requireAuth: true, locale: '首页', icon: 'IconHome'},
};
export default home;
