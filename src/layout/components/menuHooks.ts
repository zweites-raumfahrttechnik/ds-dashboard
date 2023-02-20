import { ComputedRef } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { appMenu } from '@/router/route';
import { useUserModel } from '@/model';

const checkAuth = (to: RouteRecordRaw) => {
  const { role } = useUserModel();

  if (to.meta?.system !== null && to.meta?.system !== undefined) {
    const result = role.value?.some(item => {
      return (
        to.meta?.system?.includes(item.system) &&
        to.meta?.roles?.includes(item.role === 1 ? 'admin' : 'user')
      );
    });

    if (!result) {
      return false;
    }
  }

  if (to.meta?.roles !== null && to.meta?.roles !== undefined) {
    const result = role.value?.some(item => {
      return to.meta?.roles?.includes(item.role === 1 ? 'admin' : 'user');
    });

    if (!result) {
      return false;
    }
  }

  return true;
};

const useMenuTree = () => {
  const travel = (_routes: RouteRecordRaw[], layer: number): RouteRecordRaw[] => {
    if (!_routes) {
      return [];
    }

    const collector = _routes
      .map(el => {
        // TODO access
        if (!checkAuth(el)) {
          return null;
        }

        // leaf node
        if (el.meta?.hideChildrenInMenu || !el.children) {
          el.children = [];
          return el;
        }

        // route filter hideInMenu
        el.children = el.children.filter(v => v.meta?.hideInMenu !== true);

        // associated child node
        const subItem = travel(el.children, layer + 1);

        if (subItem.length !== 0) {
          el.children = subItem;
          return el;
        }

        if (layer > 1) {
          el.children = subItem;
          return el;
        }

        if (el.meta?.hideInMenu === false) {
          return el;
        }

        return null;
      })
      .filter(Boolean) as RouteRecordRaw[];

    return collector;
  };

  const menuTree = computed(() => {
    const copyRouter = JSON.parse(JSON.stringify(appMenu)) as RouteRecordRaw[];
    copyRouter.sort((x, y) => {
      return (x.meta?.order || 0) - (y.meta?.order || 0);
    });

    return travel(copyRouter, 0);
  });

  return { menuTree };
};

const useMenuKeys = (menuTree: ComputedRef<RouteRecordRaw[]>) => {
  const openKeys = ref<string[]>([]);
  const selectedKey = ref<string[]>([]);
  const route = useRoute();

  const findMenuOpenKeys = (name: string) => {
    const res: string[] = [];
    const backtrack = (item: RouteRecordRaw, keys: string[], target: string) => {
      if (item.name === target) {
        res.push(...keys, item.name);
        return true;
      }

      if (item.children?.length) {
        for (const el of item.children) {
          if (backtrack(el, [...keys], target)) {
            return true;
          }
        }
      }

      return false;
    };

    for (const el of menuTree.value) {
      if (backtrack(el, [el.name as string], name)) {
        return res;
      }
    }

    return res;
  };

  watch(
    () => route.meta,
    newVal => {
      const { requireAuth, activeMenu, hideInMenu } = newVal;
      if (requireAuth && (!hideInMenu || activeMenu)) {
        const menuOpenKeys = findMenuOpenKeys((activeMenu || route.name) as string);

        const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
        openKeys.value = [...keySet];

        selectedKey.value = [activeMenu || menuOpenKeys[menuOpenKeys.length - 1]];
      }
    },
  );

  const { requireAuth, activeMenu, hideInMenu } = route.meta;
  if (requireAuth && (!hideInMenu || activeMenu)) {
    const menuOpenKeys = findMenuOpenKeys((activeMenu || route.name) as string);

    const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
    openKeys.value = [...keySet];

    selectedKey.value = [activeMenu || menuOpenKeys[menuOpenKeys.length - 1]];
  }

  return { openKeys, selectedKey };
};

export { useMenuTree, useMenuKeys };
