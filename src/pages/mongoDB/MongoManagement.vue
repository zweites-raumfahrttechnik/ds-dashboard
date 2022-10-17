<script lang="ts" setup>
import {
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Select,
  Space,
  Option,
  Divider,
  Table,
  TableColumn,
  Button,
  Modal,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL } from '@/api/url';
import { GetConnectListParams, GetListData } from '@/api/types';
import { reactive, ref } from 'vue';
import { DB_URL, COLLECTION_URL, DOC_URL, INDEX_URL, ATTR_URL } from '@/api/url';
import PageContainer from '@/components/PageContainer.vue';
import comlist from './components/metadata.vue';

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

//获取数据库信息
const handledb = () => {
  dbvisible.value = true;
};

const dbvisible = ref(false);
const dbform = reactive({
  name: '',
  size: '',
  null: '',
  op: '',
});

//数据库数据
const handlestatsone = () => {
  statsonevisible.value = true;
};

const handlecollection = () => {
  collectionvisible.value = true;
};

const handledoc = () => {
  docvisible.value = true;
};

const handleattr = () => {
  attrvisible.value = true;
};

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
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template>
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
      </template>

      <template #title>数据库操作</template>

      <Row>
        <Col :flex="1">
          <Form
            ref="searchFormRef"
            :model="searchFormdata"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <Row :gutter="16">
              <Col :span="8">
                <FormItem field="ip" label="数据库地址">
                  <Input v-model="searchFormdata.ip" placeholder="请输入数据库地址" />
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem field="username" label="Root用户名">
                  <Input v-model="searchFormdata.username" placeholder="请输入Root用户名" />
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem field="type" label="数据库类型">
                  <Select v-model="searchFormdata.type" placeholder="请选择数据库类型" allow-clear>
                    <Option :value="1">MySQL</Option>
                    <Option :value="2">达梦数据库</Option>
                    <Option :value="3">金仓数据库</Option>
                    <Option :value="4">Redis</Option>
                    <Option :value="5">MongoDB</Option>
                    <Option :value="6">Elasticsearch</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>

        <Divider style="height: 34px" direction="vertical" />

        <Col :flex="'86px'" style="text-align: right">
          <Space :size="18">
            <Button type="primary" @click="handleSearch">
              <template #icon>
                <IconSearch />
              </template>
              搜索
            </Button>
            <Button @click="handleFromReset">
              <template #icon>
                <IconRefresh />
              </template>
              重置
            </Button>
          </Space>
        </Col>
      </Row>

      <Divider style="margin-top: 0" />

      <Table
        row-key="uuid"
        :bordered="false"
        :pagination="pagination"
        :data="tableData"
        :loading="isLoading || deleteIsLoading"
        @page-change="handlePageChange"
      >
        <template #columns>
          <TableColumn title="数据库地址" data-index="ip" />
          <TableColumn title="数据库运行端口" data-index="port" />
          <TableColumn title="root用户名" data-index="username" />
          <TableColumn title="数据库类型" data-index="type">
            <template #cell="{ record }">
              <span v-if="record.type === 1">MySQL</span>
              <span v-else-if="record.type === 2">达梦数据库</span>
              <span v-else-if="record.type === 3">金仓数据库</span>
              <span v-else-if="record.type === 4">Redis</span>
              <span v-else-if="record.type === 5">MongoDB</span>
              <span v-else>Elasticsearch</span>
            </template>
          </TableColumn>

          <TableColumn title="操作" title-align="left">
            <template #cell>
              <Button @click="handledb()" type="text">数据库</Button>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
    <Modal width="900px" v-model:visible="dbvisible" :footer="False">
      <template #title>数据库列表</template>
      <comlist></comlist>
    </Modal>
  </PageContainer>
</template>
