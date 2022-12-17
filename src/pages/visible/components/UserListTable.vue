<script setup lang="ts">
import { Table, TableColumn, Space, Button, Tag } from '@arco-design/web-vue';

import { useVisibleTableStore, useModalStore } from '../hooks';

import { useAxios } from '@vueuse/integrations/useAxios';
import { instance } from '@/api';
import { USER_VISIBLE_URL } from '@/api/url';

const { tableData, visibleIsLoading, pagination, refreshList } = useVisibleTableStore()!;

const { ModalVisible, modifyForm } = useModalStore()!;

// 更新分页参数, 触发请求
const handlePageChange = (page: number) => {
  pagination.current = page;
};

const handleModifyShow = (userConnectUuid: any, deletable: any) => {
  modifyForm.userConnectUuid = userConnectUuid;
  modifyForm.deletable = deletable.toString();
  ModalVisible.value = true;
};

const { execute: deleteVisible } = useAxios(USER_VISIBLE_URL, { method: 'DELETE' }, instance, {
  immediate: false,
});

const handleDelete = (userConnectUuid: any) => {
  deleteVisible({
    data: {
      userConnectUuid: userConnectUuid,
    },
  }).then(() => {
    refreshList();
  });
};
</script>

<template>
  <Table
    row-key="userConnectUuid"
    :bordered="false"
    :pagination="pagination"
    :data="tableData"
    :loading="visibleIsLoading"
    @page-change="handlePageChange"
  >
    <template #columns>
      <TableColumn title="用户连接UUID" data-index="userConnectUuid" />

      <TableColumn title="ip地址" data-index="ip" />

      <TableColumn title="ip端口" data-index="port" />
      <TableColumn title="出口地址" data-index="exportIp" />
      <TableColumn title="出口端口" data-index="exportPort" />

      <TableColumn title="是否可见">
        <template #cell="{ record }">
          <Tag v-if="record.visible === 0" color="green"><span>是</span></Tag>
          <Tag v-else-if="record.visible === 1" color="red"><span>否</span></Tag>
        </template>
      </TableColumn>
      <TableColumn title="是否可删">
        <template #cell="{ record }">
          <Tag v-if="record.deletable === 0" color="green"><span>是</span></Tag>
          <Tag v-else-if="record.deletable === 1" color="red"><span>否</span></Tag>
        </template>
      </TableColumn>
      <TableColumn title="操作">
        <template #cell="{ record }">
          <Space>
            <Button
              type="text"
              status="normal"
              @click="handleModifyShow(record.userConnectUuid, record.deletable)"
            >
              修改
            </Button>
          </Space>
          <Space>
            <Button type="text" status="danger" @click="handleDelete(record.userConnectUuid)">
              删除
            </Button>
          </Space>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
