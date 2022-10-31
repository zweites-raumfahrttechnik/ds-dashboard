<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';

import { Row, Col, Divider, Modal, Space, Button, Pagination } from '@arco-design/web-vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

import { instance, ResponseWrap } from '@/api';
import { MongdbDocInfo } from '@/api/types';
import { MONGODB_QUERY_URL, MONGODB_READ_URL } from '@/api/url';

import { ConditionItem } from './types';

import QueryCondition from './QueryCondition.vue';
import JsonEditor from './JsonEditor.vue';
import DocCard from './DocCard.vue';

const props = defineProps<{ selectedKeys: string[] }>();

const { data, execute } = useAxios<ResponseWrap<MongdbDocInfo>>(
  MONGODB_READ_URL,
  { method: 'POST' },
  instance,
);

const { execute: executePut } = useAxios(MONGODB_QUERY_URL, { method: 'PUT' }, instance, {
  immediate: false,
});

const visibleAddModal = ref<boolean>(false);
const addJson = ref<string>('{}');

const condition = ref<ConditionItem[]>([]);

const pagination = reactive<{ pageSize: number; current: number }>({ current: 1, pageSize: 8 });

const handleRefresh = () => {
  execute({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
      page: pagination.current,
      size: pagination.pageSize,
      isMany: true,
      items: condition.value,
    },
  });
};

watch(
  () => props.selectedKeys,
  () => {
    handleRefresh();
  },
);

watch(
  () => pagination.current,
  () => {
    nextTick(() => {
      handleRefresh();
    });
  },
);

const handleAddButtonClick = () => {
  visibleAddModal.value = true;
};

const handleAddDoc = async () => {
  await executePut({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
      isMany: true,
      documents: [addJson.value],
    },
  });

  handleRefresh();
};
</script>

<template>
  <div class="container">
    <div class="button-container">
      <QueryCondition v-model:value="condition" />

      <Space>
        <Button type="primary" @click="handleAddButtonClick">
          <template #icon>
            <IconPlus />
          </template>
          添加记录
        </Button>
        <Button type="primary" status="danger">删除所有</Button>
      </Space>
    </div>

    <Divider />

    <Row :gutter="16" :wrap="true">
      <Col v-for="item in data?.data?.data" :key="item" :span="6">
        <DocCard :selected-keys="selectedKeys" :value="item" @refresh="handleRefresh" />
      </Col>
    </Row>

    <div class="pagination-container">
      <Pagination
        v-model:current="pagination.current"
        v-model:page-size="pagination.pageSize"
        :total="data?.data?.count || 0"
      />
    </div>
  </div>

  <Modal v-model:visible="visibleAddModal" title="添加" @ok="handleAddDoc">
    <JsonEditor v-model:value="addJson" />
  </Modal>
</template>

<style lang="less" scoped>
.container {
  :deep(.arco-card) {
    margin-bottom: 10px;
  }

  .button-container {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
}
</style>
