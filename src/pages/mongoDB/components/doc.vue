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
import { DOC_URL } from '@/api/url';

const True = ref(true);
const False = ref(false);

const selectedKeys = ref(['1', '2']);
const size = ref('medium');
const show = ref(true);

const docvisible = ref(false);
const docform = reactive({
  name: '',
  op: '',
});

//新增文档
const newdoc = () => {
  newdocvisible.value = true;
};

const newdocvisible = ref(false);
const newdocform = reactive({
  name: ' ',
});

const handlenewdocok = () => {
  newdocvisible.value = false;
};

const handlenewdoccancel = () => {
  newdocvisible.value = false;
};

//删除文档
const handledeletedoc = () => {
  deletedocvisible.value = true;
};
const deletedocvisible = ref(false);

//文档数据
const handlestatsthree = () => {
  statsthreevisible.value = true;
};

const doccolumns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opTwo',
  },
];
const docdata = reactive([
  {
    key: '1',
    name: 'test3',
    opTwo: '删除',
  },
  {
    key: '2',
    name: 'test_coll',
    opTwo: '删除',
  },
  {
    key: '3',
    name: 'test_info',
    opTwo: '删除',
  },
]);
const statsthreevisible = ref(false);
const statsthreeform = reactive({
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
  <Button @click="newdoc()" type="primary">
    <template #icon>
      <icon-plus />
    </template>
    新建
  </Button>
  <Modal
    v-model:visible="newdocvisible"
    title="新建文档"
    @cancel="handlenewdoccancel()"
    @ok="handlenewdocok()"
  >
    <Form :model="newdocform">
      <FormItem field="name" label="文档名">
        <Input v-model="newdocform.name" />
      </FormItem>
    </Form>
  </Modal>

  <Table
    row-key="name"
    :columns="doccolumns"
    :data="docdata"
    :pagination="false"
    :bordered="false"
    v-model:selectedKeys="selectedKeys"
  >
    <template #opTwo>
      <Space :size="18">
        <Button @click="handlestatsthree()" type="text" status="success">stats</Button>
      </Space>

      <Popconfirm type="warning" content="确认删除该文档？" @ok="() => handledeletedoc()">
        <Button type="text" status="danger">删除</Button>
      </Popconfirm>
    </template>
  </Table>
  <Modal
    width="700px"
    :hide-cancel="false"
    v-model:visible="statsthreevisible"
    title="文档状态信息"
    :footer="False"
  >
    <Form :model="statsthreeform">
      <Form-item field="ns" label="ns">
        <Input v-model="statsthreeform.ns" />
      </Form-item>
      <Form-item field="avgObjSize" label="avgObjSize">
        <Input v-model="statsthreeform.avgObjSize" />
      </Form-item>
      <Form-item field="totalSize" label="totalSize">
        <Input v-model="statsthreeform.totalSize" />
      </Form-item>
      <Form-item field="nindexes" label="nindexes">
        <Input v-model="statsthreeform.nindexes" />
      </Form-item>
      <Form-item field="storageSize" label="storageSize">
        <Input v-model="statsthreeform.storageSize" />
      </Form-item>
      <Form-item field="Count" label="Count">
        <Input v-model="statsthreeform.Count" />
      </Form-item>
      <Form-item field="size" label="size">
        <Input v-model="statsthreeform.size" />
      </Form-item>
      <Form-item field="freeStorageSize" label="freeStorageSize">
        <Input v-model="statsthreeform.freeStorageSize" />
      </Form-item>
    </Form>
  </Modal>
</template>
