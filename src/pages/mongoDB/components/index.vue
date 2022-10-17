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

const indexvisible = ref(false);
const indexform = reactive({
  name: '',
  op: '',
});

//新增属性
const newindexvisible = ref(false);
const newindexform = reactive({
  name: ' ',
});

const newindex = () => {
  newindexvisible.value = true;
};

const handlenewindexok = () => {
  newindexvisible.value = false;
};

const handlenewindexcancel = () => {
  newindexvisible.value = false;
};

const handledeleteindex = () => {
  deleteindexvisible.value = true;
};
const deleteindexvisible = ref(false);

//属性数据
const handlestatsfive = () => {
  statsfivevisible.value = true;
};

const indexcolumns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opFour',
  },
];

const indexdata = reactive([
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

const statsfivevisible = ref(false);
const statsfiveform = reactive({
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
    <Button @click="newindex()" type="primary">
      <template #icon>
        <icon-plus />
      </template>
      新建
    </Button>
    <Modal
      v-model:visible="newindexvisible"
      title="新建索引"
      @cancel="handlenewindexcancel()"
      @ok="handlenewindexok()"
    >
      <Form :model="newindexform">
        <FormItem field="name" label="索引名">
          <Input v-model="newindexform.name" />
        </FormItem>
      </Form>
    </Modal>
    <Table
      row-key="name"
      :columns="indexcolumns"
      :data="indexdata"
      :pagination="false"
      :bordered="false"
      v-model:selectedKeys="selectedKeys"
    >
      <template #opFour>
        <Space :size="18">
          <Button @click="handlestatsfive()" type="text" status="success">stats</Button>
        </Space>
        <Popconfirm type="warning" content="确认删除该索引？" @ok="() => handledeleteindex()">
          <Button type="text" status="danger">删除</Button>
        </Popconfirm>
      </template>
    </Table>
    <Modal
      width="700px"
      :hide-cancel="false"
      v-model:visible="statsfivevisible"
      title="索引状态信息"
      :footer="False"
    >
      <Form :model="statsfiveform">
        <Form-item field="ns" label="ns">
          <Input v-model="statsfiveform.ns" />
        </Form-item>
        <Form-item field="avgObjSize" label="avgObjSize">
          <Input v-model="statsfiveform.avgObjSize" />
        </Form-item>
        <Form-item field="totalSize" label="totalSize">
          <Input v-model="statsfiveform.totalSize" />
        </Form-item>
        <Form-item field="nindexes" label="nindexes">
          <Input v-model="statsfiveform.nindexes" />
        </Form-item>
        <Form-item field="storageSize" label="storageSize">
          <Input v-model="statsfiveform.storageSize" />
        </Form-item>
        <Form-item field="Count" label="Count">
          <Input v-model="statsfiveform.Count" />
        </Form-item>
        <Form-item field="size" label="size">
          <Input v-model="statsfiveform.size" />
        </Form-item>
        <Form-item field="freeStorageSize" label="freeStorageSize">
          <Input v-model="statsfiveform.freeStorageSize" />
        </Form-item>
      </Form>
    </Modal>
  </tempalate>
</template>
