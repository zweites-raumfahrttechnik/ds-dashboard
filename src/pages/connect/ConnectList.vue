<script lang="ts" setup>
import { Card, Table, TableColumn, Button, Popconfirm } from '@arco-design/web-vue';
import { useAxios } from '@vueuse/integrations/useAxios';

import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL } from '@/api/url';

import PageContainer from '@/components/PageContainer.vue';

interface GetListData {
  count: number;
  data: { uuid: string; username: string; ip: string; port: number; type: number }[];
}

const pagination = reactive<{ current?: number; pageSize?: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<GetListData>>(
  CONNECT_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);

const { execute: deleteExecute, isLoading: deleteIsLoading } = useAxios(
  CONNECT_URL,
  { method: 'DELETE' },
  instance,
  {
    immediate: false,
  },
);

watch(
  () => data.value?.data?.count,
  newVal => {
    pagination.total = newVal;
  },
);

watch(
  () => pagination.current,
  () => {
    execute({ params: { pg: pagination.current, size: pagination.pageSize } });
  },
);

const tableData = computed(() => {
  return data.value?.data?.data;
});

const handlePageChange = (page: number) => {
  pagination.current = page;
};

const handleDeleteConnect = (uuid: string) => {
  deleteExecute({ data: { uuid } }).then(() => {
    execute({ params: { pg: pagination.current, size: pagination.pageSize } });
  });
};
</script>

<template>
  <PageContainer>
    <Card>
      <template #title>查看数据库连接</template>

      <Table
        row-key="uuid"
        :bordered="false"
        :pagination="pagination"
        :data="tableData"
        :loading="isLoading || deleteIsLoading"
        @page-change="handlePageChange"
      >
        <template #columns>
          <TableColumn title="数据库地址" data-index="ip" />
          <TableColumn title="数据库运行端口" data-index="port" />
          <TableColumn title="root用户名" data-index="username" />
          <TableColumn title="数据库类型" data-index="type">
            <template #cell="{ record }">
              <span v-if="record.type === 1">MySQL</span>
              <span v-else-if="record.type === 2">达梦数据库</span>
              <span v-else-if="record.type === 3">金仓数据库</span>
              <span v-else-if="record.type === 4">Redis</span>
              <span v-else-if="record.type === 5">MongoDB</span>
              <span v-else>Elasticsearch</span>
            </template>
          </TableColumn>
          <TableColumn title="操作">
            <template #cell="{ record }">
              <Popconfirm
                content="请确认是否删除此数据库连接"
                @ok="() => handleDeleteConnect(record.uuid)"
              >
                <Button type="text" status="danger">删除</Button>
              </Popconfirm>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>
