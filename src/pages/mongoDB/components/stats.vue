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
const handleStatsOne = () => {
  StatsOneVisible.value = true;
};

const StatsOneVisible = ref(false);
const StatsOneForm = reactive({
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
  <Form :model="StatsOneForm">
    <Form-item field="db" label="db">
      <Input v-model="StatsOneForm.db" />
    </Form-item>
    <Form-item field="indexes" label="Indexes">
      <Input v-model="StatsOneForm.indexes" />
    </Form-item>
    <Form-item field="totalSize" label="totalSize">
      <Input v-model="StatsOneForm.totalSize" />
    </Form-item>
    <Form-item field="fsUsedSize" label="fsUsedSize">
      <Input v-model="StatsOneForm.fsUsedSize" />
    </Form-item>
    <Form-item field="collections" label="collections">
      <Input v-model="StatsOneForm.collections" />
    </Form-item>
    <Form-item field="avgObjSize" label="avgObjSize">
      <Input v-model="StatsOneForm.avgObjSize" />
    </Form-item>
    <Form-item field="storageSize" label="storageSize">
      <Input v-model="StatsOneForm.storageSize" />
    </Form-item>
    <Form-item field="objects" label="objects">
      <Input v-model="StatsOneForm.objects" />
    </Form-item>
    <Form-item field="dataSize" label="dataSize">
      <Input v-model="StatsOneForm.dataSize" />
    </Form-item>
    <Form-item field="fsTotalSize" label="fsTotalSize">
      <Input v-model="StatsOneForm.fsTotalSize" />
    </Form-item>
    <Form-item field="indexSize" label="indexSize">
      <Input v-model="StatsOneForm.indexSize" />
    </Form-item>
  </Form>
</template>
