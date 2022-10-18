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
import { ATTR_URL } from '@/api/url';

const True = ref(true);
const False = ref(false);

const selectedKeys = ref(['1', '2']);
const size = ref('medium');
const show = ref(true);

const AttrVisible = ref(false);
const AttrForm = reactive({
  name: '',
  op: '',
});

//新建属性
const NewAttrVisible = ref(false);
const NewAttrForm = reactive({
  name: ' ',
});

const NewAttr = () => {
  NewAttrVisible.value = true;
};

const handleNewAttrOk = () => {
  NewAttrVisible.value = false;
};

//删除属性
const handleNewAttrCancel = () => {
  NewAttrVisible.value = false;
};

const handleDeleteAttr = () => {
  DeleteAttrVisible.value = true;
};
const DeleteAttrVisible = ref(false);

//属性数据
const handleStatsFour = () => {
  StatsFourVisible.value = true;
};

const AttrColumns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opThree',
  },
];
const AttrData = reactive([
  {
    key: '1',
    name: 'test3',
    opThree: '删除',
  },
  {
    key: '2',
    name: 'test_coll',
    opThree: '删除',
  },
  {
    key: '3',
    name: 'test_info',
    opThree: '删除',
  },
]);

const StatsFourVisible = ref(false);
const StatsFourForm = reactive({
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

<!--属性-->

<template>
  <Button @click="NewAttr()" type="primary">
    <template #icon>
      <icon-plus />
    </template>
    新建
  </Button>

  <Table
    row-key="name"
    :columns="AttrColumns"
    :data="AttrData"
    :pagination="false"
    :bordered="false"
    v-model:selectedKeys="selectedKeys"
  >
    <template #opThree>
      <Space :size="18">
        <Button @click="handleStatsFour()" type="text" status="success">stats</Button>
      </Space>

      <Popconfirm type="warning" content="确认删除该属性？" @ok="() => handleDeleteAttr()">
        <Button type="text" status="danger">删除</Button>
      </Popconfirm>
    </template>
  </Table>

  <Modal
    width="700px"
    :hide-cancel="false"
    v-model:visible="StatsFourVisible"
    title="属性状态信息"
    :footer="False"
  >
    <Form :model="StatsFourForm">
      <Form-item field="ns" label="ns">
        <Input v-model="StatsFourForm.ns" />
      </Form-item>
      <Form-item field="avgObjSize" label="avgObjSize">
        <Input v-model="StatsFourForm.avgObjSize" />
      </Form-item>
      <Form-item field="totalSize" label="totalSize">
        <Input v-model="StatsFourForm.totalSize" />
      </Form-item>
      <Form-item field="nindexes" label="nindexes">
        <Input v-model="StatsFourForm.nindexes" />
      </Form-item>
      <Form-item field="storageSize" label="storageSize">
        <Input v-model="StatsFourForm.storageSize" />
      </Form-item>
      <Form-item field="Count" label="Count">
        <Input v-model="StatsFourForm.Count" />
      </Form-item>
      <Form-item field="size" label="size">
        <Input v-model="StatsFourForm.size" />
      </Form-item>
      <Form-item field="freeStorageSize" label="freeStorageSize">
        <Input v-model="StatsFourForm.freeStorageSize" />
      </Form-item>
    </Form>
  </Modal>
  <!--新建窗口对话框-->
  <Modal
    v-model:visible="NewAttrVisible"
    title="新建属性"
    @cancel="handleNewAttrCancel()"
    @ok="handleNewAttrOk()"
  >
    <Form :model="NewAttrForm">
      <FormItem field="name" label="属性名">
        <Input v-model="NewAttrForm.name" />
      </FormItem>
    </Form>
  </Modal>
</template>
