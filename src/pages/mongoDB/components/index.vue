<script lang="ts" setup>
import {
  Form,
  FormItem,
  Input,
  Space,
  Table,
  Button,
  Popconfirm,
  Modal,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import { INDEX_URL } from '@/api/url';

const True = ref(true);
const False = ref(false);

const selectedKeys = ref(['1', '2']);
const size = ref('medium');
const show = ref(true);

const IndexVisible = ref(false);
const IndexForm = reactive({
  name: '',
  op: '',
});

//新增属性
const NewIndexVisible = ref(false);
const NewIndexForm = reactive({
  name: ' ',
});

const NewIndex = () => {
  NewIndexVisible.value = true;
};

const handleNewIndexOk = () => {
  NewIndexVisible.value = false;
};

const handleNewIndexCancel = () => {
  NewIndexVisible.value = false;
};

const handleDeleteIndex = () => {
  DeleteIndexVisible.value = true;
};
const DeleteIndexVisible = ref(false);

//属性数据
const handleStatsFive = () => {
  StatsFiveVisible.value = true;
};

const IndexColumns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opFour',
  },
];

const IndexData = reactive([
  {
    key: '1',
    name: 'test3',
    opFour: '删除',
  },
  {
    key: '2',
    name: 'test_coll',
    opFour: '删除',
  },
  {
    key: '3',
    name: 'test_info',
    opFour: '删除',
  },
]);

const StatsFiveVisible = ref(false);
const StatsFiveForm = reactive({
  ns: 'test_coll',
  avgObjSize: '81.00KB',
  totalSize: '72.00KB',
  nindexes: '1',
  storageSize: '36.00KB',
  Count: '13',
  size: '1.04KB',
  freeStorageSize: '16.00KB',
});
</script>

<template>
  <tempalate>
    <Button @click="NewIndex()" type="primary">
      <template #icon>
        <icon-plus />
      </template>
      新建
    </Button>
    <Modal
      v-model:visible="NewIndexVisible"
      title="新建索引"
      @cancel="handleNewIndexCancel()"
      @ok="handleNewIndexOk()"
    >
      <Form :model="NewIndexForm">
        <FormItem field="name" label="索引名">
          <Input v-model="NewIndexForm.name" />
        </FormItem>
      </Form>
    </Modal>
    <Table
      row-key="name"
      :columns="IndexColumns"
      :data="IndexData"
      :pagination="false"
      :bordered="false"
      v-model:selectedKeys="selectedKeys"
    >
      <template #opFour>
        <Space :size="18">
          <Button @click="handleStatsFive()" type="text" status="success">stats</Button>
        </Space>
        <Popconfirm type="warning" content="确认删除该索引？" @ok="() => handleDeleteIndex()">
          <Button type="text" status="danger">删除</Button>
        </Popconfirm>
      </template>
    </Table>
    <Modal
      width="700px"
      :hide-cancel="false"
      v-model:visible="StatsFiveVisible"
      title="索引状态信息"
      :footer="False"
    >
      <Form :model="StatsFiveForm">
        <Form-item field="ns" label="ns">
          <Input v-model="StatsFiveForm.ns" />
        </Form-item>
        <Form-item field="avgObjSize" label="avgObjSize">
          <Input v-model="StatsFiveForm.avgObjSize" />
        </Form-item>
        <Form-item field="totalSize" label="totalSize">
          <Input v-model="StatsFiveForm.totalSize" />
        </Form-item>
        <Form-item field="nindexes" label="nindexes">
          <Input v-model="StatsFiveForm.nindexes" />
        </Form-item>
        <Form-item field="storageSize" label="storageSize">
          <Input v-model="StatsFiveForm.storageSize" />
        </Form-item>
        <Form-item field="Count" label="Count">
          <Input v-model="StatsFiveForm.Count" />
        </Form-item>
        <Form-item field="size" label="size">
          <Input v-model="StatsFiveForm.size" />
        </Form-item>
        <Form-item field="freeStorageSize" label="freeStorageSize">
          <Input v-model="StatsFiveForm.freeStorageSize" />
        </Form-item>
      </Form>
    </Modal>
  </tempalate>
</template>
