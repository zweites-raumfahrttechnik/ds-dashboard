const useUserModel = createGlobalState(() => {
  const user = useLocalStorage<{ token?: string; role?: { system: string; role: number }[] }>(
    'user',
    {},
  );

  const token = computed(() => user.value.token);
  const role = computed(() => user.value.role);

  const setUser = (token: string, role: { system: string; role: number }[]) => {
    user.value.token = token;
    user.value.role = role;
  };

  const clearUser = () => {
    user.value = {};
  };

  return { setUser, clearUser, token, role };
});

export { useUserModel };
