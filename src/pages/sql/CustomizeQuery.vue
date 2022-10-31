<script lang="ts" setup>
import { Card, Divider, Spin, Table } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';
import CodemirrorEditor from './components/CodeMirror.vue';

import { instance, ResponseWrap } from '@/api';
import { EXECUTE_DATABASE_URL } from '@/api/url';
import { GetExecuteSql } from '@/api/types';
import { useAxios } from '@vueuse/integrations/useAxios';

import { boxTabCol } from './types';
import ConnectSelect from './components/ConnectSelect.vue';

const connect = reactive<{ uuid: string; type: number }>({
  uuid: '',
  type: 1,
});

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<GetExecuteSql>>(
  EXECUTE_DATABASE_URL,
  { method: 'GET' },
  instance,
  { immediate: false },
);

const tabCol = computed(() => {
  return boxTabCol(data.value?.data?.columnList);
});

const tabData = computed(() => {
  return data.value?.data?.data;
});

const handleConnectChange = (uuid: string, type: number) => {
  connect.uuid = uuid;
  connect.type = type;
};

const exec = async (code: string) => {
  if (code === '') {
    return;
  }
  execute({
    params: { uuid: connect.uuid, type: connect.type, sql: code },
  });
};

const handlePageChange = (page: number) => {
  pagination.current = page;
};
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>自定义操作</template>

      <ConnectSelect @handle-connect-change="handleConnectChange" />
    </Card>

    <Divider style="margin-top: 0" />

    <Card class="general-card" :bordered="false">
      <template #title>编辑器</template>

      <CodemirrorEditor @exec="exec" />
    </Card>

    <Divider style="margin-top: 0" />

    <Card class="general-card" :bordered="false">
      <template #title>执行结果</template>
      <Divider style="margin-top: 0" />
      <Spin :style="{ width: '100%' }" :loading="isLoading">
        <Table
          :scroll="{ minWidth: 1500 }"
          :bordered="false"
          :columns="tabCol"
          :data="tabData"
          :pagination="pagination"
          @page-change="handlePageChange"
        />
      </Spin>
    </Card>
  </PageContainer>
</template>
