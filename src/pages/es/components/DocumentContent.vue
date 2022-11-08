<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';

import {
  Row,
  Col,
  Divider,
  Modal,
  Space,
  Button,
  Pagination,
  Popconfirm,
  Input,
  Form,
  FormItem,
} from '@arco-design/web-vue';
import { IconPlus, IconRefresh } from '@arco-design/web-vue/es/icon';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { instance, ResponseWrap } from '@/api';

import { ESMetaInfo } from '@/api/types';
import { ES_SEARH_DOC, ES_CREATE_DOC, ES_DELETE_DOC, ES_UPDATE_DOC } from '@/api/url';

import JsonEditor from './JsonEditor.vue';
import Condition from './QueryCondition.vue';
import DocCard from './DocCard.vue';

const props = defineProps<{ selectedKeys: string[] }>();

const { data, execute } = useAxios<ResponseWrap<ESMetaInfo>>(
  ES_SEARH_DOC,
  { method: 'POST' },
  instance,
  { immediate: false },
);

const { execute: executeCreate } = useAxios(ES_CREATE_DOC, { method: 'POST' }, instance, {
  immediate: false,
});

const { execute: executeDelete } = useAxios(ES_DELETE_DOC, { method: 'DELETE' }, instance, {
  immediate: false,
});

const { execute: excuteUpdate } = useAxios(ES_UPDATE_DOC, { method: 'PUT' }, instance, {
  immediate: false,
});

const docList = ref<string[]>([]);

const queryCondition = ref<string>('{}');
const updateCondition = ref<string>('{}');

const visibleAddModal = ref<boolean>(false);
const addDocFormRef = ref<FormInstance>();
const addDocFormData = ref<{ docid: string; json: string }>({ docid: '', json: '{}' });

const pagination = reactive<{ pageSize: number; current: number; total?: number }>({
  current: 1,
  pageSize: 8,
});

const handleRefresh = async () => {
  execute({
    data: {
      uuid: props.selectedKeys[0],
      index: props.selectedKeys[1],
      entityInfo: queryCondition.value,
      pg: pagination.current,
      size: pagination.pageSize,
    },
  });
};

onMounted(() => handleRefresh());

watch(
  () => props.selectedKeys,
  () => {
    handleRefresh();
    queryCondition.value = '';
    updateCondition.value = '';
    addDocFormData.value.docid = '';
    addDocFormData.value.json = '';
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

watch(
  () => data.value?.data?.data,
  val => {
    docList.value = [];
    JSON.parse(val || '{}')?.hits?.hits.forEach((item: { _source: Record<string, unknown> }) => {
      docList.value.push(JSON.stringify(item));
    });

    pagination.total = JSON.parse(val || '{}')?.hits?.total?.value;
  },
);

const handleSetQueryCondition = (val: string) => {
  queryCondition.value = val;
};

const handleSetUpdateCondition = (val: string) => {
  updateCondition.value = val;
};

const handleSearchButtonClick = () => {
  handleRefresh();
};

const handleDeleteButtonClick = async () => {
  await executeDelete({
    data: {
      uuid: props.selectedKeys[0],
      index: props.selectedKeys[1],
      entityInfo: queryCondition.value,
    },
  });
  handleRefresh();
};

const handleUpdateButtonClick = async () => {
  await excuteUpdate({
    data: {
      uuid: props.selectedKeys[0],
      index: props.selectedKeys[1],
      entityInfo: updateCondition.value,
    },
  });
  handleRefresh();
};

const handleAddButtonClick = () => {
  visibleAddModal.value = true;
};

const handleValidateAddDocForm = async () => {
  const res = await addDocFormRef.value?.validate();
  if (res) {
    return false;
  }
};

const handleAddDoc = async () => {
  await executeCreate({
    data: {
      uuid: props.selectedKeys[0],
      index: props.selectedKeys[1],
      docid: addDocFormData.value.docid,
      entityInfo: addDocFormData.value.json,
    },
  });
  addDocFormRef.value?.resetFields();

  handleRefresh();
};
</script>

<template>
  <div class="container">
    <div class="button-container">
      <div :style="{ overflow: 'auto' }" class="condition-container">
        <Space>
          <Condition
            link-title="设置查询/删除条件"
            @handle-set-condition="handleSetQueryCondition"
          />
          <Condition link-title="设置更新条件" @handle-set-condition="handleSetUpdateCondition" />
        </Space>
      </div>
      <Space>
        <Button type="primary" @click="handleSearchButtonClick">
          <template #icon>
            <IconSearch />
          </template>
          查询
        </Button>
        <Popconfirm content="确认删除所有信息吗？" @ok="handleDeleteButtonClick">
          <Button type="primary" status="danger">
            <template #icon>
              <IconDelete />
            </template>
            删除
          </Button>
        </Popconfirm>
        <Button type="primary" status="warning" @click="handleUpdateButtonClick">
          <template #icon>
            <IconRefresh />
          </template>
          更新
        </Button>
        <Divider direction="vertical" :style="{ height: '40px' }" />

        <Button type="primary" @click="handleAddButtonClick">
          <template #icon>
            <IconPlus />
          </template>
          添加文档
        </Button>
      </Space>
    </div>

    <Divider />

    <Row :gutter="16" :wrap="true">
      <Col v-for="item in docList" :key="item" :span="6">
        <DocCard :selected-keys="selectedKeys" :value="item" @refresh="handleRefresh" />
      </Col>
    </Row>

    <div class="pagination-container">
      <Pagination
        v-model:current="pagination.current"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total || 0"
      />
    </div>
  </div>

  <Modal
    v-model:visible="visibleAddModal"
    title="添加文档"
    width="600px"
    :on-before-ok="handleValidateAddDocForm"
    @ok="handleAddDoc"
  >
    <Form ref="addDocFormRef" :model="addDocFormData" layout="vertical">
      <FormItem field="docid" label="文档id">
        <Input v-model="addDocFormData.docid" placeholder="请输入docid" />
      </FormItem>
      <FormItem field="json" label="文档内容" :rules="[{ required: true, message: '请输入docid' }]">
        <JsonEditor v-model:value="addDocFormData.json" width="100%" />
      </FormItem>
    </Form>
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

  .condition-container {
    margin-right: 10px;
    display: flex;
    align-items: center;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #ecf0f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #bdc3c7;
    }
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
}
</style>
