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

const collectionvisible = ref(false);
const collectionform = reactive({
  name: '',
  op: '',
});

//新建集合
const newcollection = () => {
  newcollectionvisible.value = true;
};

const newcollectionvisible = ref(false);
const newcollectionform = reactive({
  name: ' ',
});

const handlenewcollectionok = () => {
  newcollectionvisible.value = false;
};
const handlenewcollectioncancel = () => {
  newcollectionvisible.value = false;
};

//删除集合
const handledeletecollection = () => {
  deletecollectionvisible.value = true;
};
const deletecollectionvisible = ref(false);

//集合数据
const handlestatstwo = () => {
  statstwovisible.value = true;
};

const collectioncolumns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opOne',
  },
];

const collectiondata = reactive([
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

const statstwovisible = ref(false);
const statstwoform = reactive({
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
  <Button @click="newcollection()" type="primary">
    <template #icon>
      <icon-plus />
    </template>
    新建
  </Button>
  <Table
    row-key="name"
    :columns="collectioncolumns"
    :data="collectiondata"
    :pagination="false"
    :bordered="false"
    v-model:selectedKeys="selectedKeys"
  >
    <template #opOne>
      <Space :size="18">
        <Button @click="handlestatstwo()" type="text" status="success">stats</Button>
      </Space>

      <Popconfirm type="warning" content="确认删除该集合？" @ok="() => handledeletecollection()">
        <Button type="text" status="danger">删除</Button>
      </Popconfirm>
    </template>
  </Table>

  <Modal
    width="700px"
    :hide-cancel="false"
    v-model:visible="statstwovisible"
    title="集合状态信息"
    :footer="False"
  >
    <Form :model="statstwoform">
      <Form-item field="ns" label="ns">
        <Input v-model="statstwoform.ns" />
      </Form-item>
      <Form-item field="avgObjSize" label="avgObjSize">
        <Input v-model="statstwoform.avgObjSize" />
      </Form-item>
      <Form-item field="totalSize" label="totalSize">
        <Input v-model="statstwoform.totalSize" />
      </Form-item>
      <Form-item field="nindexes" label="nindexes">
        <Input v-model="statstwoform.nindexes" />
      </Form-item>
      <Form-item field="storageSize" label="storageSize">
        <Input v-model="statstwoform.storageSize" />
      </Form-item>
      <Form-item field="Count" label="Count">
        <Input v-model="statstwoform.Count" />
      </Form-item>
      <Form-item field="size" label="size">
        <Input v-model="statstwoform.size" />
      </Form-item>
      <Form-item field="freeStorageSize" label="freeStorageSize">
        <Input v-model="statstwoform.freeStorageSize" />
      </Form-item>
    </Form>
  </Modal>

  <Modal
    v-model:visible="newcollectionvisible"
    title="新建集合"
    @cancel="handlenewcollectioncancel()"
    @ok="handlenewcollectionok()"
  >
    <Form :model="newcollectionform">
      <FormItem field="name" label="集合名">
        <Input v-model="newcollectionform.name" />
      </FormItem>
    </Form>
  </Modal>
</template>
