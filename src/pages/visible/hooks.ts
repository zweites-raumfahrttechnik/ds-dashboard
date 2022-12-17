import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { USER_VISIBLE_URL, NORMAL_USER_URL, CONNECT_URL } from '@/api/url';
import { UserVisiableListData, NormalUserListData, GetListData } from '@/api/types';

import { SearchParams, SearchFormData } from './types';

const [useVisibleTableProvideStore, useVisibleTableStore] = createInjectionState(() => {
  // 表单实例
  const searchFormRef = ref<FormInstance>();

  // 数据绑定
  const searchFormData = reactive<SearchFormData>({
    userUuid: '',
  });

  // 分页参数
  const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 15,
  });

  // 请求数据列表
  const {
    data: visibleData,
    isLoading: visibleIsLoading,
    execute: visibleExecute,
  } = useAxios<ResponseWrap<UserVisiableListData>>(
    USER_VISIBLE_URL,
    {
      method: 'GET',
      params: {
        pg: pagination.current,
        size: pagination.pageSize,
      },
    },
    instance,
  );

  // 表格数据计算属性
  const tableData = computed(() => visibleData.value?.data?.data);

  // 变更分页参数
  watch(
    () => visibleData.value?.data?.count,
    newVal => {
      pagination.total = newVal;
    },
  );

  // 监听分页参数变化, 发起请求
  watch(
    () => pagination.current,
    () => refreshList(),
  );

  // 刷新列表
  const refreshList = () => {
    const params: SearchParams = { pg: pagination.current, size: pagination.pageSize };

    if (searchFormData.userUuid && searchFormData.userUuid !== '') {
      params.userUuid = searchFormData.userUuid;
    }
    visibleExecute({ params });
  };

  return { searchFormRef, searchFormData, tableData, visibleIsLoading, pagination, refreshList };
});

const [useListProvideStore, useListStore] = createInjectionState(() => {
  const userPagination = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 15,
  });
  // 请求用户列表
  const {
    data: userData,
    isLoading: userIsLoading,
    execute: userExecute,
  } = useAxios<ResponseWrap<NormalUserListData>>(
    NORMAL_USER_URL,
    {
      method: 'GET',
      params: {
        pg: userPagination.current,
        size: userPagination.pageSize,
      },
    },
    instance,
  );
  const userList = computed(() => userData.value?.data?.data);

  // 变更分页参数
  watch(
    () => userData.value?.data?.count,
    newVal => {
      userPagination.total = newVal;
    },
  );

  const userSelectLoadMore = () => {
    userPagination.current++;

    userExecute({
      params: {
        pg: userPagination.current,
        size: userPagination.pageSize,
      },
    });
  };

  const connectPagination = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 15,
  });

  const {
    data: connectData,
    isLoading: connectIsLoading,
    execute: connectExecute,
  } = useAxios<ResponseWrap<GetListData>>(
    CONNECT_URL,
    { method: 'GET', params: { pg: connectPagination.current, size: connectPagination.pageSize } },
    instance,
  );
  const connectList = computed(() => connectData.value?.data?.data);

  // 变更分页参数
  watch(
    () => connectData.value?.data?.count,
    newVal => {
      connectPagination.total = newVal;
    },
  );

  const connectSelectLoadMore = () => {
    userPagination.current++;

    userExecute({
      params: {
        pg: userPagination.current,
        size: userPagination.pageSize,
      },
    });
  };

  onMounted(() => {
    userExecute();
    connectExecute();
  });

  const addForm = reactive<{
    userUuid: string;
    connectUuid: string;
    visible: string;
    deletable: string;
  }>({
    userUuid: '',
    connectUuid: '',
    visible: '0',
    deletable: '0',
  });

  return {
    userList,
    userIsLoading,
    connectList,
    connectIsLoading,
    addForm,
    connectSelectLoadMore,
    userSelectLoadMore,
  };
});

const [useModalProvideStore, useModalStore] = createInjectionState(() => {
  const ModalFormRef = ref<FormInstance>();
  const ModalVisible = ref(false);

  const modifyForm = reactive<{
    userConnectUuid: string;
    deletable: string;
  }>({
    userConnectUuid: '',
    deletable: '',
  });

  return { ModalFormRef, ModalVisible, modifyForm };
});

export {
  useVisibleTableProvideStore,
  useVisibleTableStore,
  useListProvideStore,
  useListStore,
  useModalProvideStore,
  useModalStore,
};
