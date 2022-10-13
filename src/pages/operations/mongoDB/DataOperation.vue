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
  Link,
  Statistic,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL } from '@/api/url';
import { GetConnectListParams, GetListData } from '@/api/types';
import { reactive, ref } from 'vue';
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

const Db_visible = ref(false);
const Db_form = reactive({
  name: '',
  size: '',
  null: '',
  op: '',
});

const Gather_visible = ref(false);
const Gather_form = reactive({
  name: '',
  op: '',
});

const Documents_visible = ref(false);
const Documents_form = reactive({
  name: '',
  op: '',
});

const Property_visible = ref(false);
const Property_form = reactive({
  name: '',
  op: '',
});

const Index_visible = ref(false);
const Index_form = reactive({
  name: '',
  op: '',
});

const handleDb = () => {
  Db_visible.value = true;
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

const handledeleteGather = () => {
  deleteGather_visible.value = true;
};
const deleteGather_visible = ref(false);

const handledeleteDocuments = () => {
  deleteDocuments_visible.value = true;
};
const deleteDocuments_visible = ref(false);

const handledeleteProperty = () => {
  deleteProperty_visible.value = true;
};
const deleteProperty_visible = ref(false);

const handledeleteIndex = () => {
  deleteIndex_visible.value = true;
};
const deleteIndex_visible = ref(false);

const Gather_add = () => {
  Gather_visible.value = true;
};
const handleGather = () => {
  Gather_visible.value = true;
};

const Documents_add = () => {
  Documents_visible.value = true;
};
const handleDocuments = () => {
  Documents_visible.value = true;
};

const Property_add = () => {
  Property_visible.value = true;
};
const handleProperty = () => {
  Property_visible.value = true;
};

const Index_add = () => {
  Property_visible.value = true;
};
const handleIndex = () => {
  Index_visible.value = true;
};

const newGather_visible = ref(false);
const newGather_form = reactive({
  name: ' ',
});
const newGather = () => {
  newGather_visible.value = true;
};

const newDocuments_visible = ref(false);
const newDocuments_form = reactive({
  name: ' ',
});
const newDocuments = () => {
  newDocuments_visible.value = true;
};

const newProperty_visible = ref(false);
const newProperty_form = reactive({
  name: ' ',
});
const newProperty = () => {
  newProperty_visible.value = true;
};

const newIndex_visible = ref(false);
const newIndex_form = reactive({
  name: ' ',
});
const newIndex = () => {
  newIndex_visible.value = true;
};

const handlenewGatherOk = () => {
  newGather_visible.value = false;
};
const handlenewGatherCancel = () => {
  newGather_visible.value = false;
};

const handlenewDocumentsOk = () => {
  newDocuments_visible.value = false;
};
const handlenewDocumentsCancel = () => {
  newDocuments_visible.value = false;
};


const handlenewPropertyOk = () => {
  newProperty_visible.value = false;
};
const handlenewPropertyCancel = () => {
  newProperty_visible.value = false;
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

const Db_columns = [
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
const Db_data = reactive([
  {
    key: '1',
    uuid: 'admin',
    dbName: 'asd',
    collectionName: 'qwe',
    docName:'pouy',
    optional: '集合',
  },
  {
    key: '2',
    uuid: 'config',
    dbName: 'zxc',
    collectionName: 'vbn',
    docName:'pouy',
    optional: '集合',
  },
  {
    key: '3',
    uuid: 'lacal',
    dbName: 'fgh',
    collectionName: 'defr',
    docName:'pouy',
    optional: '集合',
  },
  {
    key: '4',
    uuid: 'test1',
    dbName: 'tyui',
    collectionName: 'fsdfg',
    docName:'pouy',
    optional: '集合',
  },
  {
    key: '5',
    uuid: 'test2',
    dbName: 'ght',
    collectionName: 'frvc',
    docName:'pouy',
    optional: '集合',
  },
]);

const Gather_columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opOne',
  },
];
const Gather_data = reactive([
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

const Documents_columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opTwo',
  },
];
const Documents_data = reactive([
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

const Property_columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    slotName: 'opThree',
  },
];
const Property_data = reactive([
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
          v-model:visible="Db_visible"
          title="数据库列表"
          :footer="False"
        >
          <Table
            row-key="name"
            :columns="Db_columns"
            :data="Db_data"
            :pagination="pagination"
            :bordered="false"
            v-model:selectedKeys="selectedKeys"
          >
            <template #optional>
              <Space :size="18">
                <Button @click="handlestatsOne()" type="text" status="success">stats</Button>
                <Button @click="handleGather()" type="text">集合</Button>
                <Button @click="handleDocuments()" type="text">文档</Button>
                <Button @click="handleProperty()" type="text">属性</Button>
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
          v-model:visible="Gather_visible"
          title="集合"
          :footer="False"
        >
          <Button @click="newGather()" type="primary">
            <template #icon>
              <icon-plus />
            </template>
            添加
          </Button>
          <Modal
            v-model:visible="newGather_visible"
            title="新建集合"
            @cancel="handlenewGatherCancel()"
            @ok="handlenewGatherOk()"
          >
            <Form :model="newGather_form">
              <FormItem field="name" label="集合名">
                <Input v-model="newGather_form.name" />
              </FormItem>
            </Form>
          </Modal>
          <Table
            row-key="name"
            :columns="Gather_columns"
            :data="Gather_data"
            :pagination="false"
            :bordered="false"
            v-model:selectedKeys="selectedKeys"
          >
            <template #opOne>
              <Space :size="18">
                <Button @click="handlestatsTwo()" type="text" status="success">stats</Button>
              </Space>

              <Popconfirm content="确认删除该集合？" @ok="() => handledeleteGather()">
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
          v-model:visible="Documents_visible"
          title="文档"
          :footer="False"
        >
          <Button @click="newDocuments()" type="primary">
            <template #icon>
              <icon-plus />
            </template>
            新建
          </Button>
          <Modal
            v-model:visible="newDocuments_visible"
            title="新建文档"
            @cancel="handlenewDocumentsCancel()"
            @ok="handlenewDocumentsOk()"
          >
            <Form :model="newDocuments_form">
              <FormItem field="name" label="文档名">
                <Input v-model="newDocuments_form.name" />
              </FormItem>
            </Form>
          </Modal>

          <Table
            row-key="name"
            :columns="Documents_columns"
            :data="Documents_data"
            :pagination="false"
            :bordered="false"
            v-model:selectedKeys="selectedKeys"
          >
            <template #opTwo>
              <Space :size="18">
                <Button @click="handlestatsThree()" type="text" status="success">stats</Button>
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
              </Space>

              <Popconfirm content="确认删除该文档？" @ok="() => handledeleteDocuments()">
                <Button type="text" status="danger">删除</Button>
              </Popconfirm>
            </template>
          </Table>
        </Modal>
      </template>
      <template>
        <Modal
          width="700px"
          :hide-cancel="false"
          v-model:visible="Property_visible"
          title="属性"
          :footer="False"
        >
          <Button @click="newProperty()" type="primary">
            <template #icon>
              <icon-plus />
            </template>
            新建
          </Button>
          <Modal
            v-model:visible="newProperty_visible"
            title="新建属性"
            @cancel="handlenewPropertyCancel()"
            @ok="handlenewPropertyOk()"
          >
            <Form :model="newProperty_form">
              <FormItem field="name" label="属性名">
                <Input v-model="newProperty_form.name" />
              </FormItem>
            </Form>
          </Modal>
          <Table
            row-key="name"
            :columns="Property_columns"
            :data="Property_data"
            :pagination="false"
            :bordered="false"
            v-model:selectedKeys="selectedKeys"
          >
            <template #opThree>
              <Space :size="18">
                <Button @click="handlestatsFour()" type="text" status="success">stats</Button>
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
              </Space>
              <Popconfirm content="确认删除该属性？" @ok="() => handledeleteProperty()">
                <Button type="text" status="danger">删除</Button>
              </Popconfirm>
            </template>
          </Table>
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
              </Space>
              <Popconfirm content="确认删除该索引？" @ok="() => handledeleteIndex()">
                <Button type="text" status="danger">删除</Button>
              </Popconfirm>
            </template>
          </Table>
        </Modal>
      </tempalate>

      <template #title>查看数据库连接</template>

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
              <Button @click="handleDb()" type="text">数据库</Button>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>
