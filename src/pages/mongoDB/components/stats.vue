<script lang="ts" setup>
import { Form, FormItem, Input } from '@arco-design/web-vue';
import { reactive, ref } from 'vue';

const True = ref(true);
const False = ref(false);

const selectedKeys = ref(['1', '2']);
const size = ref('medium');
const show = ref(true);

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

//数据库数据
const handlestatsone = () => {
  statsonevisible.value = true;
};

const statsonevisible = ref(false);
const statsoneform = reactive({
  db: 'test',
  indexes: '3',
  totalSize: '184.00KB',
  fsUsedSize: '13.18GB',
  collections: '3',
  avgObjSize: '74.94B',
  storageSize: '92.00KB',
  objects: '18',
  dataSize: '1.32KB',
  fsTotalSize: '39.98GB',
  indexSize: '92.00KB',
});
</script>

<template>
  <Form :model="statsoneform">
    <Form-item field="db" label="db">
      <Input v-model="statsoneform.db" />
    </Form-item>
    <Form-item field="indexes" label="Indexes">
      <Input v-model="statsoneform.indexes" />
    </Form-item>
    <Form-item field="totalSize" label="totalSize">
      <Input v-model="statsoneform.totalSize" />
    </Form-item>
    <Form-item field="fsUsedSize" label="fsUsedSize">
      <Input v-model="statsoneform.fsUsedSize" />
    </Form-item>
    <Form-item field="collections" label="collections">
      <Input v-model="statsoneform.collections" />
    </Form-item>
    <Form-item field="avgObjSize" label="avgObjSize">
      <Input v-model="statsoneform.avgObjSize" />
    </Form-item>
    <Form-item field="storageSize" label="storageSize">
      <Input v-model="statsoneform.storageSize" />
    </Form-item>
    <Form-item field="objects" label="objects">
      <Input v-model="statsoneform.objects" />
    </Form-item>
    <Form-item field="dataSize" label="dataSize">
      <Input v-model="statsoneform.dataSize" />
    </Form-item>
    <Form-item field="fsTotalSize" label="fsTotalSize">
      <Input v-model="statsoneform.fsTotalSize" />
    </Form-item>
    <Form-item field="indexSize" label="indexSize">
      <Input v-model="statsoneform.indexSize" />
    </Form-item>
  </Form>
</template>
