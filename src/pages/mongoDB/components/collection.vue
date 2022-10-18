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
import { COLLECTION_URL } from '@/api/url';

const True = ref(true);
const False = ref(false);

const selectedKeys = ref(['1', '2']);
const size = ref('medium');
const show = ref(true);

const CollectionVisible = ref(false);
const CollectionForm = reactive({
  name: '',
  op: '',
});

//新建集合
const NewCollection = () => {
  NewCollectionVisible.value = true;
};

const NewCollectionVisible = ref(false);
const NewCollectionForm = reactive({
  name: ' ',
});

const handleNewCollectionOk = () => {
  NewCollectionVisible.value = false;
};
const handleNewCollectionCancel = () => {
  NewCollectionVisible.value = false;
};

//删除集合
const handleDeleteCollection = () => {
  DeleteCollectionVisible.value = true;
};
const DeleteCollectionVisible = ref(false);

//集合数据
const handleStatsTwo = () => {
  StatsTwoVisible.value = true;
};

const CollectionColumns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opOne',
  },
];

const CollectionData = reactive([
  {
    key: '1',
    name: 'test3',
    opOne: 'statsTwo',
  },
  {
    key: '2',
    name: 'test_coll',
    opOne: 'statsTwo',
  },
  {
    key: '3',
    name: 'test_info',
    opOne: 'statsTwo',
  },
]);

const StatsTwoVisible = ref(false);
const StatsTwoForm = reactive({
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
  <Button @click="NewCollection()" type="primary">
    <template #icon>
      <icon-plus />
    </template>
    新建
  </Button>
  <Table
    row-key="name"
    :columns="CollectionColumns"
    :data="CollectionData"
    :pagination="false"
    :bordered="false"
    v-model:selectedKeys="selectedKeys"
  >
    <template #opOne>
      <Space :size="18">
        <Button @click="handleStatsTwo()" type="text" status="success">stats</Button>
      </Space>

      <Popconfirm type="warning" content="确认删除该集合？" @ok="() => handleDeleteCollection()">
        <Button type="text" status="danger">删除</Button>
      </Popconfirm>
    </template>
  </Table>

  <Modal
    width="700px"
    :hide-cancel="false"
    v-model:visible="StatsTwoVisible"
    title="集合状态信息"
    :footer="False"
  >
    <Form :model="StatsTwoForm">
      <Form-item field="ns" label="ns">
        <Input v-model="StatsTwoForm.ns" />
      </Form-item>
      <Form-item field="avgObjSize" label="avgObjSize">
        <Input v-model="StatsTwoForm.avgObjSize" />
      </Form-item>
      <Form-item field="totalSize" label="totalSize">
        <Input v-model="StatsTwoForm.totalSize" />
      </Form-item>
      <Form-item field="nindexes" label="nindexes">
        <Input v-model="StatsTwoForm.nindexes" />
      </Form-item>
      <Form-item field="storageSize" label="storageSize">
        <Input v-model="StatsTwoForm.storageSize" />
      </Form-item>
      <Form-item field="Count" label="Count">
        <Input v-model="StatsTwoForm.Count" />
      </Form-item>
      <Form-item field="size" label="size">
        <Input v-model="StatsTwoForm.size" />
      </Form-item>
      <Form-item field="freeStorageSize" label="freeStorageSize">
        <Input v-model="StatsTwoForm.freeStorageSize" />
      </Form-item>
    </Form>
  </Modal>

  <Modal
    v-model:visible="NewCollectionVisible"
    title="新建集合"
    @cancel="handleNewCollectionCancel()"
    @ok="handleNewCollectionOk()"
  >
    <Form :model="NewCollectionForm">
      <FormItem field="name" label="集合名">
        <Input v-model="NewCollectionForm.name" />
      </FormItem>
    </Form>
  </Modal>
</template>
