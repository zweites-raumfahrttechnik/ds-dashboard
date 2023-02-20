import { RouteLocationNormalized, Router } from 'vue-router';
import { useUserModel } from '@/model';

const checkAuth = (to: RouteLocationNormalized) => {
  const { token, role } = useUserModel();

  if (
    (token.value === null || token.value === undefined || token.value === '') &&
    to.fullPath !== '/login'
  ) {
    return false;
  }

  if (to.meta.system !== null && to.meta.system !== undefined) {
    const result = role.value?.some(item => {
      return (
        to.meta.system?.includes(item.system) &&
        to.meta.roles?.includes(item.role === 1 ? 'admin' : 'user')
      );
    });

    if (!result) {
      return false;
    }
  }

  if (to.meta.roles !== null && to.meta.roles !== undefined) {
    const result = role.value?.some(item => {
      return to.meta.roles?.includes(item.role === 1 ? 'admin' : 'user');
    });

    if (!result) {
      return false;
    }
  }

  return true;
};

export function setupAuth(router: Router) {
  router.beforeEach((to, from, next) => {
    if (!checkAuth(to)) {
      next({ name: 'Login' });
      return;
    }

    next();
  });
}
