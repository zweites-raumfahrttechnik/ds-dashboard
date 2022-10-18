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

const DocVisible = ref(false);
const DocForm = reactive({
  name: '',
  op: '',
});

//新增文档
const NewDoc = () => {
  NewDocVisible.value = true;
};

const NewDocVisible = ref(false);
const NewDocForm = reactive({
  name: ' ',
});

const handleNewDocOk = () => {
  NewDocVisible.value = false;
};

const handleNewDocCancel = () => {
  NewDocVisible.value = false;
};

//删除文档
const handleDeleteDoc = () => {
  DeleteDocVisible.value = true;
};
const DeleteDocVisible = ref(false);

//文档数据
const handleStatsThree = () => {
  StatsThreeVisible.value = true;
};

const DocColumns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opTwo',
  },
];
const DocData = reactive([
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
const StatsThreeVisible = ref(false);
const StatsThreeForm = reactive({
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
  <Button @click="NewDoc()" type="primary">
    <template #icon>
      <icon-plus />
    </template>
    新建
  </Button>
  <Modal
    v-model:visible="NewDocVisible"
    title="新建文档"
    @cancel="handleNewDocCancel()"
    @ok="handleNewDocOk()"
  >
    <Form :model="NewDocForm">
      <FormItem field="name" label="文档名">
        <Input v-model="NewDocForm.name" />
      </FormItem>
    </Form>
  </Modal>

  <Table
    row-key="name"
    :columns="DocColumns"
    :data="DocData"
    :pagination="false"
    :bordered="false"
    v-model:selectedKeys="selectedKeys"
  >
    <template #opTwo>
      <Space :size="18">
        <Button @click="handleStatsThree()" type="text" status="success">stats</Button>
      </Space>

      <Popconfirm type="warning" content="确认删除该文档？" @ok="() => handleDeleteDoc()">
        <Button type="text" status="danger">删除</Button>
      </Popconfirm>
    </template>
  </Table>
  <Modal
    width="700px"
    :hide-cancel="false"
    v-model:visible="StatsThreeVisible"
    title="文档状态信息"
    :footer="False"
  >
    <Form :model="StatsThreeForm">
      <Form-item field="ns" label="ns">
        <Input v-model="StatsThreeForm.ns" />
      </Form-item>
      <Form-item field="avgObjSize" label="avgObjSize">
        <Input v-model="StatsThreeForm.avgObjSize" />
      </Form-item>
      <Form-item field="totalSize" label="totalSize">
        <Input v-model="StatsThreeForm.totalSize" />
      </Form-item>
      <Form-item field="nindexes" label="nindexes">
        <Input v-model="StatsThreeForm.nindexes" />
      </Form-item>
      <Form-item field="storageSize" label="storageSize">
        <Input v-model="StatsThreeForm.storageSize" />
      </Form-item>
      <Form-item field="Count" label="Count">
        <Input v-model="StatsThreeForm.Count" />
      </Form-item>
      <Form-item field="size" label="size">
        <Input v-model="StatsThreeForm.size" />
      </Form-item>
      <Form-item field="freeStorageSize" label="freeStorageSize">
        <Input v-model="StatsThreeForm.freeStorageSize" />
      </Form-item>
    </Form>
  </Modal>
</template>
