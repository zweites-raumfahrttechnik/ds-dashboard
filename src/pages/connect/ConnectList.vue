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
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import { useAxios } from '@vueuse/integrations/useAxios';

import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL } from '@/api/url';
import { GetConnectListParams, GetListData } from '@/api/types';

import PageContainer from '@/components/PageContainer.vue';

type SearchParams = GetConnectListParams;

// form 实例放入 ref 中
const searchFormRef = ref<FormInstance>();

const searchFormdata = reactive<Pick<SearchParams, 'ip' | 'username' | 'type'>>({
  ip: '',
  username: '',
});

// 分页参数
const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<GetListData>>(
  CONNECT_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);

const { execute: deleteExecute, isLoading: deleteIsLoading } = useAxios(
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

// 监听分页参数变化, 发起请求
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

// 搜索按钮点击事件
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

// 重置 form 表单
const handleFromReset = () => {
  searchFormRef.value?.resetFields();

  if (pagination.current === 1) {
    const params: SearchParams = { pg: pagination.current, size: pagination.pageSize };
    execute({ params });
    return;
  }

  pagination.current = 1;
};

// 更新分页参数, 触发请求
const handlePageChange = (page: number) => {
  pagination.current = page;
};

// 删除连接数据
const handleDeleteConnect = (uuid: string) => {
  deleteExecute({ data: { uuid } }).then(() => {
    execute({ params: { pg: pagination.current, size: pagination.pageSize } });
  });
};
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
          <TableColumn title="操作">
            <template #cell="{ record }">
              <Popconfirm
                content="请确认是否删除此数据库连接"
                @ok="() => handleDeleteConnect(record.uuid)"
              >
                <Button type="text" status="danger">删除</Button>
              </Popconfirm>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>
