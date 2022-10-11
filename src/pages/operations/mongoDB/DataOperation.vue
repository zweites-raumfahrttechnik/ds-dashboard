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

const { execute: dbExecute, isLoading: deleteIsLoading } = useAxios(
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

const handleDb = () => {
  Db_visible.value = true;
};

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
  Property_visible.value = true;
};

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

const Db_columns = [
  {
    title: '库名',
    dataIndex: 'name',
  },
  {
    title: 'Size',
    dataIndex: 'size',
  },
  {
    title: '是否为空',
    dataIndex: 'null',
  },
  {
    title: '操作',
    slotName: 'optional',
  },
];
const Db_data = reactive([
  {
    key: '1',
    name: 'admin',
    size: '123',
    null: 'false',
    optional: '集合',
  },
  {
    key: '2',
    name: 'config',
    size: '456',
    null: 'null',
    optional: '集合',
  },
  {
    key: '3',
    name: 'lacal',
    size: '789',
    null: 'false',
    optional: '集合',
  },
  {
    key: '4',
    name: 'test1',
    size: '963',
    null: 'false',
    optional: '集合',
  },
  {
    key: '5',
    name: 'test2',
    size: '852',
    null: 'false',
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
    dataIndex: 'op',
  },
];

const Gather_data = reactive([
  {
    key: '1',
    name: 'test3',
    op: '删除',
  },
  {
    key: '2',
    name: 'test_coll',
    op: '删除',
  },
  {
    key: '3',
    name: 'test_info',
    op: '删除',
  },
]);
const Documents_columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    dataIndex: 'op',
  },
];
const Documents_data = reactive([
  {
    key: '1',
    name: 'test3',
    op: '删除',
  },
  {
    key: '2',
    name: 'test_coll',
    op: '删除',
  },
  {
    key: '3',
    name: 'test_info',
    op: '删除',
  },
]);
const Property_columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    dataIndex: 'op',
  },
];
const Property_data = reactive([
  {
    key: '1',
    name: 'test3',
    op: '删除',
  },
  {
    key: '2',
    name: 'test_coll',
    op: '删除',
  },
  {
    key: '3',
    name: 'test_info',
    op: '删除',
  },
]);
const Index_columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    dataIndex: 'op',
  },
];
const Index_data = reactive([
  {
    key: '1',
    name: 'test3',
    op: '删除',
  },
  {
    key: '2',
    name: 'test_coll',
    op: '删除',
  },
  {
    key: '3',
    name: 'test_info',
    op: '删除',
  },
]);
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
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
            <template #cell="{ record }">
              <Button @click="handleDb()" type="primary">数据库</Button>

              <Modal width="700px" v-model:visible="Db_visible" title="数据库列表">
                <Table
                  row-key="name"
                  :columns="Db_columns"
                  :data="Db_data"
                  :pagination="false"
                  :bordered="false"
                  v-model:selectedKeys="selectedKeys"
                >
                  <template #optional="{ record }">
                    <Space :size="18">
                      <Button @click="handleGather()" type="primary">集合</Button>
                      <Modal width="700px" v-model:visible="Gather_visible" title="集合">
                        <Button @click="Gather_add" type="primary">
                          <template #icon>
                            <icon-plus />
                          </template>
                          新建
                        </Button>
                        <Table
                          row-key="name"
                          :columns="Gather_columns"
                          :data="Gather_data"
                          :pagination="false"
                          :bordered="false"
                          v-model:selectedKeys="selectedKeys"
                        >
                        </Table>
                      </Modal>
                      <Button @click="handleDocuments()" type="primary">文档</Button>
                      <Modal width="700px" v-model:visible="Documents_visible" title="文档">
                        <Button @click="Documents_add" type="primary">
                          <template #icon>
                            <icon-plus />
                          </template>
                          新建
                        </Button>
                        <Table
                          row-key="name"
                          :columns="Documents_columns"
                          :data="Documents_data"
                          :pagination="false"
                          :bordered="false"
                          v-model:selectedKeys="selectedKeys"
                        >
                        </Table>
                      </Modal>

                      <Button @click="handleProperty()" type="primary">属性</Button>
                      <Modal width="700px" v-model:visible="Property_visible" title="属性">
                        <Button @click="Property_add" type="primary">
                          <template #icon>
                            <icon-plus />
                          </template>
                          新建
                        </Button>
                        <Table
                          row-key="name"
                          :columns="Property_columns"
                          :data="Property_data"
                          :pagination="false"
                          :bordered="false"
                          v-model:selectedKeys="selectedKeys"
                        >
                        </Table>
                      </Modal>

                      <Button @click="handleIndex()" type="primary">索引</Button>
                      <Modal width="700px" v-model:visible="Index_visible" title="属性">
                        <Button @click="Index_add" type="primary">
                          <template #icon>
                            <icon-plus />
                          </template>
                          新建
                        </Button>
                        <Table
                          row-key="name"
                          :columns="Index_columns"
                          :data="Index_data"
                          :pagination="false"
                          :bordered="false"
                          v-model:selectedKeys="selectedKeys"
                        >
                        </Table>
                      </Modal>
                    </Space>
                  </template>
                </Table>
              </Modal>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>
