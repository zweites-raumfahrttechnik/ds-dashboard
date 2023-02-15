const useUserModel = createGlobalState(() => {
  const user = useLocalStorage<{ token?: string; role?: string; uuid?: string }>('user', {});

  const token = computed(() => user.value.token);
  const role = computed(() => user.value.role);
  const uuid = computed(() => user.value.uuid);

  const setUser = (token: string, role: string, uuid: string) => {
    user.value.token = token;
    user.value.role = role;
    user.value.uuid = uuid;
  };

  const clearUser = () => {
    user.value = {};
  };

  return { setUser, clearUser, token, role };
});

export { useUserModel };
