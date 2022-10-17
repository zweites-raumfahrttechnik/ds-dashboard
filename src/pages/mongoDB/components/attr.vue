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

const attrvisible = ref(false);
const attrform = reactive({
  name: '',
  op: '',
});

//新建属性
const newattrvisible = ref(false);
const newattrform = reactive({
  name: ' ',
});

const newattr = () => {
  newattrvisible.value = true;
};

const handlenewattrok = () => {
  newattrvisible.value = false;
};

//删除属性
const handlenewattrcancel = () => {
  newattrvisible.value = false;
};

const handledeleteattr = () => {
  deleteattrvisible.value = true;
};
const deleteattrvisible = ref(false);

//属性数据
const handlestatsfour = () => {
  statsfourvisible.value = true;
};

const attrcolumns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opThree',
  },
];
const attrdata = reactive([
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

const statsfourvisible = ref(false);
const statsfourform = reactive({
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
  <Button @click="newattr()" type="primary">
    <template #icon>
      <icon-plus />
    </template>
    新建
  </Button>

  <Table
    row-key="name"
    :columns="attrcolumns"
    :data="attrdata"
    :pagination="false"
    :bordered="false"
    v-model:selectedKeys="selectedKeys"
  >
    <template #opThree>
      <Space :size="18">
        <Button @click="handlestatsfour()" type="text" status="success">stats</Button>
      </Space>

      <Popconfirm type="warning" content="确认删除该属性？" @ok="() => handledeleteattr()">
        <Button type="text" status="danger">删除</Button>
      </Popconfirm>
    </template>
  </Table>

  <Modal
    width="700px"
    :hide-cancel="false"
    v-model:visible="statsfourvisible"
    title="属性状态信息"
    :footer="False"
  >
    <Form :model="statsfourform">
      <Form-item field="ns" label="ns">
        <Input v-model="statsfourform.ns" />
      </Form-item>
      <Form-item field="avgObjSize" label="avgObjSize">
        <Input v-model="statsfourform.avgObjSize" />
      </Form-item>
      <Form-item field="totalSize" label="totalSize">
        <Input v-model="statsfourform.totalSize" />
      </Form-item>
      <Form-item field="nindexes" label="nindexes">
        <Input v-model="statsfourform.nindexes" />
      </Form-item>
      <Form-item field="storageSize" label="storageSize">
        <Input v-model="statsfourform.storageSize" />
      </Form-item>
      <Form-item field="Count" label="Count">
        <Input v-model="statsfourform.Count" />
      </Form-item>
      <Form-item field="size" label="size">
        <Input v-model="statsfourform.size" />
      </Form-item>
      <Form-item field="freeStorageSize" label="freeStorageSize">
        <Input v-model="statsfourform.freeStorageSize" />
      </Form-item>
    </Form>
  </Modal>
  <!--新建窗口对话框-->
  <Modal
    v-model:visible="newattrvisible"
    title="新建属性"
    @cancel="handlenewattrcancel()"
    @ok="handlenewattrok()"
  >
    <Form :model="newattrform">
      <FormItem field="name" label="属性名">
        <Input v-model="newattrform.name" />
      </FormItem>
    </Form>
  </Modal>
</template>
