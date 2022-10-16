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
  Popconfirm,
  Modal,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL } from '@/api/url';
import { GetConnectListParams, GetListData } from '@/api/types';
import { reactive, ref } from 'vue';
import {
  DB_URL,
  COLLECTION_URL,
  DOC_URL,
  INDEX_URL,
  ATTR_URL,
  QUERY_URL,
  READ_URL,
} from '@/api/url';
import PageContainer from '@/components/PageContainer.vue';

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

const handleFromReset = () => {
  searchFormRef.value?.resetFields();
};

const handlePageChange = (page: number) => {
  pagination.current = page;
};

const DB_visible = ref(false);
const DB_form = reactive({
  name: '',
  size: '',
  null: '',
  op: '',
});

const Collection_visible = ref(false);
const Collection_form = reactive({
  name: '',
  op: '',
});

const Doc_visible = ref(false);
const Doc_form = reactive({
  name: '',
  op: '',
});

const Attr_visible = ref(false);
const Attr_form = reactive({
  name: '',
  op: '',
});

const Index_visible = ref(false);
const Index_form = reactive({
  name: '',
  op: '',
});

const handleDB = () => {
  DB_visible.value = true;
};

const handlestatsOne = () => {
  statsOne_visible.value = true;
};

const handlestatsTwo = () => {
  statsTwo_visible.value = true;
};

const handlestatsThree = () => {
  statsThree_visible.value = true;
};

const handlestatsFour = () => {
  statsFour_visible.value = true;
};

const handlestatsFive = () => {
  statsFive_visible.value = true;
};

const handledeleteCollection = () => {
  deleteCollection_visible.value = true;
};
const deleteCollection_visible = ref(false);

const handledeleteDoc = () => {
  deleteDoc_visible.value = true;
};
const deleteDoc_visible = ref(false);

const handledeleteAttr = () => {
  deleteAttr_visible.value = true;
};
const deleteAttr_visible = ref(false);

const handledeleteIndex = () => {
  deleteIndex_visible.value = true;
};
const deleteIndex_visible = ref(false);

const Collection_add = () => {
  Collection_visible.value = true;
};
const handleCollection = () => {
  Collection_visible.value = true;
};

const Doc_add = () => {
  Doc_visible.value = true;
};
const handleDoc = () => {
  Doc_visible.value = true;
};

const Attr_add = () => {
  Attr_visible.value = true;
};
const handleAttr = () => {
  Attr_visible.value = true;
};

const Index_add = () => {
  Index_visible.value = true;
};
const handleIndex = () => {
  Index_visible.value = true;
};

const newCollection_visible = ref(false);
const newCollection_form = reactive({
  name: ' ',
});
const newCollection = () => {
  newCollection_visible.value = true;
};

const newDoc_visible = ref(false);
const newDoc_form = reactive({
  name: ' ',
});
const newDoc = () => {
  newDoc_visible.value = true;
};

const newAttr_visible = ref(false);
const newAttr_form = reactive({
  name: ' ',
});
const newAttr = () => {
  newAttr_visible.value = true;
};

const newIndex_visible = ref(false);
const newIndex_form = reactive({
  name: ' ',
});
const newIndex = () => {
  newIndex_visible.value = true;
};

const handlenewCollectionOk = () => {
  newCollection_visible.value = false;
};
const handlenewCollectioncancel = () => {
  newCollection_visible.value = false;
};

const handlenewDocOk = () => {
  newDoc_visible.value = false;
};
const handlenewDocCancel = () => {
  newDoc_visible.value = false;
};

const handlenewAttrOk = () => {
  newAttr_visible.value = false;
};
const handlenewAttrCancel = () => {
  newAttr_visible.value = false;
};

const handlenewIndexOk = () => {
  newIndex_visible.value = false;
};
const handlenewIndexCancel = () => {
  newIndex_visible.value = false;
};

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

const DB_columns = [
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
const DB_data = reactive([
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

const Collection_columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opOne',
  },
];
const Collection_data = reactive([
  {
    key: '1',
    name: 'test3',
    opOne: 'statsTwo',
  },
  {
    key: '2',
    name: 'test_coll',
    opOne: 'statsTwo',
  },
  {
    key: '3',
    name: 'test_info',
    opOne: 'statsTwo',
  },
]);

const Doc_columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opTwo',
  },
];
const Doc_data = reactive([
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

const Attr_columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opThree',
  },
];
const Attr_data = reactive([
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

const Index_columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opFour',
  },
];
const Index_data = reactive([
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

const statsOne_visible = ref(false);
const statsOne_form = reactive({
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

const statsTwo_visible = ref(false);
const statsTwo_form = reactive({
  ns: 'test_coll',
  avgObjSize: '81.00KB',
  totalSize: '72.00KB',
  nindexes: '1',
  storageSize: '36.00KB',
  Count: '13',
  size: '1.04KB',
  freeStorageSize: '16.00KB',
});

const statsThree_visible = ref(false);
const statsThree_form = reactive({
  ns: 'test_coll',
  avgObjSize: '81.00KB',
  totalSize: '72.00KB',
  nindexes: '1',
  storageSize: '36.00KB',
  Count: '13',
  size: '1.04KB',
  freeStorageSize: '16.00KB',
});

const statsFour_visible = ref(false);
const statsFour_form = reactive({
  ns: 'test_coll',
  avgObjSize: '81.00KB',
  totalSize: '72.00KB',
  nindexes: '1',
  storageSize: '36.00KB',
  Count: '13',
  size: '1.04KB',
  freeStorageSize: '16.00KB',
});

const statsFive_visible = ref(false);
const statsFive_form = reactive({
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
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template>
        <Modal
          width="900px"
          :hide-cancel="false"
          v-model:visible="DB_visible"
          title="数据库列表"
          :footer="False"
        >
          <Table
            row-key="name"
            :columns="DB_columns"
            :data="DB_data"
            :pagination="pagination"
            :bordered="false"
            v-model:selectedKeys="selectedKeys"
          >
            <template #optional>
              <Space :size="18">
                <Button @click="handlestatsOne()" type="text" status="success">stats</Button>
                <Button @click="handleCollection()" type="text">集合</Button>
                <Button @click="handleDoc()" type="text">文档</Button>
                <Button @click="handleAttr()" type="text">属性</Button>
                <Button @click="handleIndex()" type="text">索引</Button>
              </Space>
            </template>
          </Table>
        </Modal>
      </template>
      <template>
        <Modal
          width="700px"
          :hide-cancel="false"
          v-model:visible="statsOne_visible"
          title="数据库状态信息"
          :footer="False"
        >
          <Form :model="statsOne_form">
            <Form-item field="db" label="db">
              <Input v-model="statsOne_form.db" />
            </Form-item>
            <Form-item field="indexes" label="Indexes">
              <Input v-model="statsOne_form.indexes" />
            </Form-item>
            <Form-item field="totalSize" label="totalSize">
              <Input v-model="statsOne_form.totalSize" />
            </Form-item>
            <Form-item field="fsUsedSize" label="fsUsedSize">
              <Input v-model="statsOne_form.fsUsedSize" />
            </Form-item>
            <Form-item field="collections" label="collections">
              <Input v-model="statsOne_form.collections" />
            </Form-item>
            <Form-item field="avgObjSize" label="avgObjSize">
              <Input v-model="statsOne_form.avgObjSize" />
            </Form-item>
            <Form-item field="storageSize" label="storageSize">
              <Input v-model="statsOne_form.storageSize" />
            </Form-item>
            <Form-item field="objects" label="objects">
              <Input v-model="statsOne_form.objects" />
            </Form-item>
            <Form-item field="dataSize" label="dataSize">
              <Input v-model="statsOne_form.dataSize" />
            </Form-item>
            <Form-item field="fsTotalSize" label="fsTotalSize">
              <Input v-model="statsOne_form.fsTotalSize" />
            </Form-item>
            <Form-item field="indexSize" label="indexSize">
              <Input v-model="statsOne_form.indexSize" />
            </Form-item>
          </Form>
        </Modal>
      </template>

      <template>
        <Modal
          width="700px"
          :hide-cancel="false"
          v-model:visible="Collection_visible"
          title="集合"
          :footer="False"
        >
          <Button @click="newCollection()" type="primary">
            <template #icon>
              <icon-plus />
            </template>
            添加
          </Button>
          <Modal
            v-model:visible="newCollection_visible"
            title="新建集合"
            @cancel="handlenewCollectioncancel()"
            @ok="handlenewCollectionOk()"
          >
            <Form :model="newCollection_form">
              <FormItem field="name" label="集合名">
                <Input v-model="newCollection_form.name" />
              </FormItem>
            </Form>
          </Modal>
          <Table
            row-key="name"
            :columns="Collection_columns"
            :data="Collection_data"
            :pagination="false"
            :bordered="false"
            v-model:selectedKeys="selectedKeys"
          >
            <template #opOne>
              <Space :size="18">
                <Button @click="handlestatsTwo()" type="text" status="success">stats</Button>
              </Space>

              <Popconfirm
                type="warning"
                content="确认删除该集合？"
                @ok="() => handledeleteCollection()"
              >
                <Button type="text" status="danger">删除</Button>
              </Popconfirm>
            </template>
          </Table>
        </Modal>
        <Modal
          width="700px"
          :hide-cancel="false"
          v-model:visible="statsTwo_visible"
          title="集合状态信息"
          :footer="False"
        >
          <Form :model="statsTwo_form">
            <Form-item field="ns" label="ns">
              <Input v-model="statsTwo_form.ns" />
            </Form-item>
            <Form-item field="avgObjSize" label="avgObjSize">
              <Input v-model="statsTwo_form.avgObjSize" />
            </Form-item>
            <Form-item field="totalSize" label="totalSize">
              <Input v-model="statsTwo_form.totalSize" />
            </Form-item>
            <Form-item field="nindexes" label="nindexes">
              <Input v-model="statsTwo_form.nindexes" />
            </Form-item>
            <Form-item field="storageSize" label="storageSize">
              <Input v-model="statsTwo_form.storageSize" />
            </Form-item>
            <Form-item field="Count" label="Count">
              <Input v-model="statsTwo_form.Count" />
            </Form-item>
            <Form-item field="size" label="size">
              <Input v-model="statsTwo_form.size" />
            </Form-item>
            <Form-item field="freeStorageSize" label="freeStorageSize">
              <Input v-model="statsTwo_form.freeStorageSize" />
            </Form-item>
          </Form>
        </Modal>
      </template>

      <template>
        <Modal
          width="700px"
          :hide-cancel="false"
          v-model:visible="Doc_visible"
          title="文档"
          :footer="False"
        >
          <Button @click="newDoc()" type="primary">
            <template #icon>
              <icon-plus />
            </template>
            新建
          </Button>
          <Modal
            v-model:visible="newDoc_visible"
            title="新建文档"
            @cancel="handlenewDocCancel()"
            @ok="handlenewDocOk()"
          >
            <Form :model="newDoc_form">
              <FormItem field="name" label="文档名">
                <Input v-model="newDoc_form.name" />
              </FormItem>
            </Form>
          </Modal>

          <Table
            row-key="name"
            :columns="Doc_columns"
            :data="Doc_data"
            :pagination="false"
            :bordered="false"
            v-model:selectedKeys="selectedKeys"
          >
            <template #opTwo>
              <Space :size="18">
                <Button @click="handlestatsThree()" type="text" status="success">stats</Button>
              </Space>

              <Popconfirm type="warning" content="确认删除该文档？" @ok="() => handledeleteDoc()">
                <Button type="text" status="danger">删除</Button>
              </Popconfirm>
            </template>
          </Table>
        </Modal>
        <Modal
          width="700px"
          :hide-cancel="false"
          v-model:visible="statsThree_visible"
          title="文档状态信息"
          :footer="False"
        >
          <Form :model="statsThree_form">
            <Form-item field="ns" label="ns">
              <Input v-model="statsThree_form.ns" />
            </Form-item>
            <Form-item field="avgObjSize" label="avgObjSize">
              <Input v-model="statsThree_form.avgObjSize" />
            </Form-item>
            <Form-item field="totalSize" label="totalSize">
              <Input v-model="statsThree_form.totalSize" />
            </Form-item>
            <Form-item field="nindexes" label="nindexes">
              <Input v-model="statsThree_form.nindexes" />
            </Form-item>
            <Form-item field="storageSize" label="storageSize">
              <Input v-model="statsThree_form.storageSize" />
            </Form-item>
            <Form-item field="Count" label="Count">
              <Input v-model="statsThree_form.Count" />
            </Form-item>
            <Form-item field="size" label="size">
              <Input v-model="statsThree_form.size" />
            </Form-item>
            <Form-item field="freeStorageSize" label="freeStorageSize">
              <Input v-model="statsThree_form.freeStorageSize" />
            </Form-item>
          </Form>
        </Modal>
      </template>
      <template>
        <Modal
          width="700px"
          :hide-cancel="false"
          v-model:visible="Attr_visible"
          title="属性"
          :footer="False"
        >
          <Button @click="newAttr()" type="primary">
            <template #icon>
              <icon-plus />
            </template>
            新建
          </Button>
          <Modal
            v-model:visible="newAttr_visible"
            title="新建属性"
            @cancel="handlenewAttrCancel()"
            @ok="handlenewAttrOk()"
          >
            <Form :model="newAttr_form">
              <FormItem field="name" label="属性名">
                <Input v-model="newAttr_form.name" />
              </FormItem>
            </Form>
          </Modal>
          <Table
            row-key="name"
            :columns="Attr_columns"
            :data="Attr_data"
            :pagination="false"
            :bordered="false"
            v-model:selectedKeys="selectedKeys"
          >
            <template #opThree>
              <Space :size="18">
                <Button @click="handlestatsFour()" type="text" status="success">stats</Button>
              </Space>
              <Popconfirm type="warning" content="确认删除该属性？" @ok="() => handledeleteAttr()">
                <Button type="text" status="danger">删除</Button>
              </Popconfirm>
            </template>
          </Table>
        </Modal>
        <Modal
          width="700px"
          :hide-cancel="false"
          v-model:visible="statsFour_visible"
          title="属性状态信息"
          :footer="False"
        >
          <Form :model="statsFour_form">
            <Form-item field="ns" label="ns">
              <Input v-model="statsFour_form.ns" />
            </Form-item>
            <Form-item field="avgObjSize" label="avgObjSize">
              <Input v-model="statsFour_form.avgObjSize" />
            </Form-item>
            <Form-item field="totalSize" label="totalSize">
              <Input v-model="statsFour_form.totalSize" />
            </Form-item>
            <Form-item field="nindexes" label="nindexes">
              <Input v-model="statsFour_form.nindexes" />
            </Form-item>
            <Form-item field="storageSize" label="storageSize">
              <Input v-model="statsFour_form.storageSize" />
            </Form-item>
            <Form-item field="Count" label="Count">
              <Input v-model="statsFour_form.Count" />
            </Form-item>
            <Form-item field="size" label="size">
              <Input v-model="statsFour_form.size" />
            </Form-item>
            <Form-item field="freeStorageSize" label="freeStorageSize">
              <Input v-model="statsFour_form.freeStorageSize" />
            </Form-item>
          </Form>
        </Modal>
      </template>

      <tempalate>
        <Modal
          width="700px"
          :hide-cancel="false"
          v-model:visible="Index_visible"
          title="索引"
          :footer="False"
        >
          <Button @click="newIndex()" type="primary">
            <template #icon>
              <icon-plus />
            </template>
            新建
          </Button>
          <Modal
            v-model:visible="newIndex_visible"
            title="新建索引"
            @cancel="handlenewIndexCancel()"
            @ok="handlenewIndexOk()"
          >
            <Form :model="newIndex_form">
              <FormItem field="name" label="索引名">
                <Input v-model="newIndex_form.name" />
              </FormItem>
            </Form>
          </Modal>
          <Table
            row-key="name"
            :columns="Index_columns"
            :data="Index_data"
            :pagination="false"
            :bordered="false"
            v-model:selectedKeys="selectedKeys"
          >
            <template #opFour>
              <Space :size="18">
                <Button @click="handlestatsFive()" type="text" status="success">stats</Button>
              </Space>
              <Popconfirm type="warning" content="确认删除该索引？" @ok="() => handledeleteIndex()">
                <Button type="text" status="danger">删除</Button>
              </Popconfirm>
            </template>
          </Table>
        </Modal>
        <Modal
          width="700px"
          :hide-cancel="false"
          v-model:visible="statsFive_visible"
          title="索引状态信息"
          :footer="False"
        >
          <Form :model="statsFive_form">
            <Form-item field="ns" label="ns">
              <Input v-model="statsFive_form.ns" />
            </Form-item>
            <Form-item field="avgObjSize" label="avgObjSize">
              <Input v-model="statsFive_form.avgObjSize" />
            </Form-item>
            <Form-item field="totalSize" label="totalSize">
              <Input v-model="statsFive_form.totalSize" />
            </Form-item>
            <Form-item field="nindexes" label="nindexes">
              <Input v-model="statsFive_form.nindexes" />
            </Form-item>
            <Form-item field="storageSize" label="storageSize">
              <Input v-model="statsFive_form.storageSize" />
            </Form-item>
            <Form-item field="Count" label="Count">
              <Input v-model="statsFive_form.Count" />
            </Form-item>
            <Form-item field="size" label="size">
              <Input v-model="statsFive_form.size" />
            </Form-item>
            <Form-item field="freeStorageSize" label="freeStorageSize">
              <Input v-model="statsFive_form.freeStorageSize" />
            </Form-item>
          </Form>
        </Modal>
      </tempalate>

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
              <Button @click="handleDB()" type="text">数据库</Button>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>
