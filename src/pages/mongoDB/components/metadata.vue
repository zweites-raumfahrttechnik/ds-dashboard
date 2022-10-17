<script lang="ts" setup>
import { Card, Space, Table, Button, Modal } from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL } from '@/api/url';
import { GetConnectListParams, GetListData } from '@/api/types';
import { reactive, ref } from 'vue';
import { DB_URL, COLLECTION_URL, DOC_URL, INDEX_URL, ATTR_URL } from '@/api/url';
import Attrlist from './attr.vue';
import Collectionlist from './collection.vue';
import Doclist from './doc.vue';
import Indexlist from './index.vue';
import statsOnelist from './stats.vue';

type SearchParams = GetConnectListParams;

const searchFormRef = ref<FormInstance>();

const searchFormdata = reactive<Pick<SearchParams, 'ip' | 'username' | 'type'>>({
  ip: '',
  username: '',
});

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<GetListData>>(
  CONNECT_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);

const { execute: DeleteExecute, isLoading: deleteIsLoading } = useAxios(
  CONNECT_URL,
  { method: 'DELETE' },
  instance,
  {
    immediate: false,
  },
);

watch(
  () => data.value?.data?.count,
  newVal => {
    pagination.total = newVal;
  },
);

watch(
  () => pagination.current,
  () => {
    const params: SearchParams = { pg: pagination.current, size: pagination.pageSize };
    if (searchFormdata.ip && searchFormdata.ip !== '') {
      params.ip = searchFormdata.ip;
    }
    if (searchFormdata.username && searchFormdata.username !== '') {
      params.username = searchFormdata.username;
    }
    if (searchFormdata.type) {
      params.type = searchFormdata.type;
    }

    execute({ params });
  },
);

const tableData = computed(() => {
  return data.value?.data?.data;
});

const handleSearch = () => {
  const params: SearchParams = { pg: pagination.current, size: pagination.pageSize };
  if (searchFormdata.ip && searchFormdata.ip !== '') {
    params.ip = searchFormdata.ip;
  }
  if (searchFormdata.username && searchFormdata.username !== '') {
    params.username = searchFormdata.username;
  }
  if (searchFormdata.type) {
    params.type = searchFormdata.type;
  }

  execute({ params });
};

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

const handleFromReset = () => {
  searchFormRef.value?.resetFields();
};

const handlePageChange = (page: number) => {
  pagination.current = page;
};

const dbvisible = ref(false);
const dbform = reactive({
  name: '',
  size: '',
  null: '',
  op: '',
});

//元数据
const handlestatsone = () => {
  statsonevisible.value = true;
};

//元数据集合信息获取
const handlecollection = () => {
  collectionvisible.value = true;
};

//元数据文档信息获取
const handledoc = () => {
  docvisible.value = true;
};

////元数据属性信息获取
const handleattr = () => {
  attrvisible.value = true;
};

//元数据索引信息获取
const handleindex = () => {
  indexvisible.value = true;
};

const collectionvisible = ref(false);
const collectionform = reactive({
  name: '',
  op: '',
});

const docvisible = ref(false);
const docform = reactive({
  name: '',
  op: '',
});

const attrvisible = ref(false);
const attrform = reactive({
  name: '',
  op: '',
});

const indexvisible = ref(false);
const indexform = reactive({
  name: '',
  op: '',
});

const dbcolumns = [
  {
    title: 'uuid',
    dataIndex: 'uuid',
  },
  {
    title: 'dbName',
    dataIndex: 'dbName',
  },
  {
    title: 'collectionName',
    dataIndex: 'collectionName',
  },
  {
    title: 'docName',
    dataIndex: 'docName',
  },
  {
    title: '操作',
    slotName: 'optional',
  },
];

const dbdata = reactive([
  {
    key: '1',
    uuid: 'admin',
    dbName: 'asd',
    collectionName: 'qwe',
    docName: 'pouy',
    optional: '集合',
  },
  {
    key: '2',
    uuid: 'config',
    dbName: 'zxc',
    collectionName: 'vbn',
    docName: 'pouy',
    optional: '集合',
  },
  {
    key: '3',
    uuid: 'lacal',
    dbName: 'fgh',
    collectionName: 'defr',
    docName: 'pouy',
    optional: '集合',
  },
  {
    key: '4',
    uuid: 'test1',
    dbName: 'tyui',
    collectionName: 'fsdfg',
    docName: 'pouy',
    optional: '集合',
  },
  {
    key: '5',
    uuid: 'test2',
    dbName: 'ght',
    collectionName: 'frvc',
    docName: 'pouy',
    optional: '集合',
  },
]);

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
  <Card class="general-card" :bordered="false">
    <Table
      row-key="name"
      :columns="dbcolumns"
      :data="dbdata"
      :pagination="pagination"
      :bordered="false"
      v-model:selectedKeys="selectedKeys"
    >
      <template #optional>
        <Space :size="18">
          <Button @click="handlestatsone()" type="text" status="success">stats</Button>
          <Button @click="handlecollection()" type="text">集合</Button>
          <Button @click="handledoc()" type="text">文档</Button>
          <Button @click="handleattr()" type="text">属性</Button>
          <Button @click="handleindex()" type="text">索引</Button>
        </Space>
      </template>
    </Table>
  </Card>
  <Modal v-model:visible="attrvisible" :footer="False">
    <template #title>属性</template>
    <Attrlist></Attrlist>
  </Modal>
  <Modal v-model:visible="collectionvisible" :footer="False">
    <template #title>集合</template>
    <Collectionlist></Collectionlist>
  </Modal>
  <Modal v-model:visible="docvisible" :footer="False">
    <template #title>文档</template>
    <Doclist></Doclist>
  </Modal>
  <Modal v-model:visible="indexvisible" :footer="False">
    <template #title>索引</template>
    <Indexlist></Indexlist>
  </Modal>
  <Modal v-model:visible="statsonevisible" :footer="False">
    <template #title>数据库状态信息</template>
    <statsOnelist></statsOnelist>
  </Modal>
</template>
