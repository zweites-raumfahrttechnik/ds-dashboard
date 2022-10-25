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
  Cascader,
  Tabs,
  TabPane,
  Tree,
  InputSearch
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { DBinformationParams, DBListData } from '@/api/types';
import { reactive, ref, watch } from 'vue';
import { DB_URL } from '@/api/url';
import PageContainer from '@/components/PageContainer.vue';
import comlist from './components/metadata.vue';

const form = ref();

type SearchParams = DBinformationParams;

const searchFormRef = ref<FormInstance>();

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data } = useAxios<ResponseWrap<DBListData>>(
  DB_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);

//树的搜索框
const searchKey = ref()

//搜索按钮
const handleSearch = () => {};

//表格数据
const tableData = computed(() => {
  return data.value?.data?.data;
});

//自动生成数据
watch(
  () => data.value?.data?.count,
  newVal => {
    pagination.total = newVal;
  },
);

const handleFromReset = () => {
  searchFormRef.value?.resetFields();
};

const handlePageChange = (page: number) => {
  pagination.current = page;
};

//树选择列表
const treeData = [
  {
    title: '实例',
    key: '0-0',
    children: [
      {
        title: 'db1',
        key: '0-0-0',
        children: [
          {
            title: 'collection1',
            key: '0-0-0-0',
            children: [
              {
                title: 'doc1',
                key: '0-0-0-0',
              },
            ],
          },
          {
            title: 'collection2',
            key: '0-0-0-1',
            children: [
              {
                title: 'doc1',
                key: '0-0-0-0',
              },
            ],
          },
        ],
      },
      {
        title: 'db2',
        key: '0-0-1',
        children: [
          {
            title: 'collection1',
            key: '0-0-1-0',
            children: [
              {
                title: 'doc1',
                key: '0-0-0-0',
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>MongoDB数据库管理</template>
      <Row class="grid-demo">
        <Col :span="5">
          <div class="wrap">
            <Form :model="form">
              <InputSearch style="margin-bottom: 8px; max-width: 240px" v-model="searchKey" />
              <Tree blockNode :data="treeData" />
            </Form>
          </div>
        </Col>
        <Divider style="height: 700px" direction="vertical" />
        <Col :span="18">
          <div class="pack">
            <Table
              row-key="uuid"
              :bordered="false"
              :pagination="pagination"
              :data="tableData"
              @page-change="handlePageChange"
            >
              <template #columns>
                <TableColumn title="实例" data-index="uuid" />
                <TableColumn title="数据库地址" data-index="ip" />
                <TableColumn title="数据库运行端口" data-index="port" />
                <TableColumn title="root用户名" data-index="username" />
                <TableColumn title="导出器port" data-index="export_port" />
                <TableColumn title="导出器ip" data-index="export_ip" />
              </template>
            </Table>
          </div>
        </Col>
      </Row>
    </Card>
  </PageContainer>
</template>
