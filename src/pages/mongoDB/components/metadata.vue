<script lang="ts" setup>
import { Card, Space, Table, TableColumn, Button, Modal } from '@arco-design/web-vue';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';

import { DBinformationParams, DBListData } from '@/api/types';
import { reactive, ref } from 'vue';
import { DB_URL } from '@/api/url';

import Attrlist from './attr.vue';
import Collectionlist from './collection.vue';
import Doclist from './doc.vue';
import Indexlist from './index.vue';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const router = useRouter();

const handlePre = () => {
  emit('change-step', 0);
};

const handleDB = () => {
  router.push({ name: 'DBList' });
};

const searchFormRef = ref<FormInstance>();

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<DBListData>>(
  DB_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);

const handlePageChange = (page: number) => {
  pagination.current = page;
};

const DBData = computed(() => {
  return data.value?.data?.data;
});

//元数据集合信息获取
const handleCollection = () => {
  CollectionVisible.value = true;
};

//元数据文档信息获取
const handleDoc = () => {
  DocVisible.value = true;
};

////元数据属性信息获取
const handleAttr = () => {
  AttrVisible.value = true;
};

//元数据索引信息获取
const handleIndex = () => {
  IndexVisible.value = true;
};

const CollectionVisible = ref(false);

const DocVisible = ref(false);
const DocForm = reactive({
  name: '',
  op: '',
});

const AttrVisible = ref(false);
const AttrForm = reactive({
  name: '',
  op: '',
});

const IndexVisible = ref(false);
const IndexForm = reactive({
  name: '',
  op: '',
});
</script>

<template>
  <Card class="general-card" :bordered="false">
    <Table row-key="uuid" :data="DBData" :bordered="false">
      <template #columns>
        <TableColumn title="uuid" data-index="uuid" />
        <TableColumn title="数据库名" data-index="dbName" />
        <TableColumn title="集合名称" data-index="collectionName" />
        <TableColumn title="文档名称" data-index="docName" />

        <TableColumn title="操作">
          <template #cell>
            <Button @click="handleCollection()" type="text" status="success">集合</Button>
            <Button @click="handleDoc()" type="text" status="success">文档</Button>
            <Button @click="handleAttr()" type="text" status="success">属性</Button>
            <Button @click="handleIndex()" type="text" status="success">索引</Button>
          </template>
        </TableColumn>
      </template>
    </Table>
  </Card>

  <Modal v-model:visible="AttrVisible" :draggable="true">
    <template #title>属性</template>
    <Attrlist></Attrlist>
  </Modal>
  <Modal v-model:visible="CollectionVisible" :draggable="true">
    <template #title>集合</template>
    <Collectionlist></Collectionlist>
  </Modal>
  <Modal v-model:visible="DocVisible" :draggable="true">
    <template #title>文档</template>
    <Doclist></Doclist>
  </Modal>
  <Modal v-model:visible="IndexVisible" :draggable="true">
    <template #title>索引</template>
    <Indexlist></Indexlist>
  </Modal>
</template>
