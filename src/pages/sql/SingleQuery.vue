<script lang="ts" setup>
import {
  Card,
  Form,
  FormItem,
  Button,
  Row,
  Col,
  Select,
  Option,
  Input,
  Divider,
  Table,
  Spin,
} from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import ConnectTableSelect from './components/ConnectTableSelect.vue';
import {
  ConnectFormModel,
  QueryFormModel,
  QueryParams,
  defaultQueryFormValue,
  defaultQueryParams,
  defaultConnectFormValue,
  boxTabCol,
} from './types';

import { instance, ResponseWrap } from '@/api';
import { QUERY_DATABASE_URL } from '@/api/url';
import { PostTableQueryData } from '@/api/types';
import { useAxios } from '@vueuse/integrations/useAxios';

const buttonSize = 16;

const queryForm = reactive<QueryFormModel>({ ...defaultQueryFormValue });

const colFormList = reactive<Array<{ name: string; type: string }>>(Array(0));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tabCol = ref<any[]>([]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tabData = ref<any[]>([]);

const connectFormData = reactive<ConnectFormModel>({ ...defaultConnectFormValue });

const handleAddWhere = () => {
  queryForm.whereList.push({
    column: '',
    columnType: '',
    value: '',
    queryType: '=',
  });
};

const handleAddOrder = () => {
  queryForm.orderByList.push({
    type: 1,
    column: '',
  });
};

const handleDeleteWhere = (index: number) => {
  queryForm.whereList.splice(index, 1);
};

const handleDeleteOrder = (index: number) => {
  queryForm.orderByList.splice(index, 1);
};

const concatQueryParams = (connectFormData: ConnectFormModel) => {
  const params = reactive<QueryParams>({
    ...defaultQueryParams,
  });
  params.uuid = connectFormData.uuid;
  params.type = connectFormData.type;
  params.table = connectFormData.schema + '.' + connectFormData.table;

  params.columnList = queryForm.columnList.filter(item => {
    return item && item !== '';
  });
  params.whereList = queryForm.whereList.filter(item => {
    return item.column !== '' && item.value !== '';
  });
  params.orderByList = queryForm.orderByList.filter(item => {
    return item.column !== '';
  });
  params.pg = pagination.current;
  params.size = pagination.pageSize;
  return params;
};

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 10,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<PostTableQueryData>>(
  QUERY_DATABASE_URL,
  { method: 'POST' },
  instance,
  { immediate: false },
);

watch(
  () => data.value?.data?.columnList,
  newVal => {
    tabCol.value = boxTabCol(newVal);
    if (colFormList.length === 0) {
      const temp = newVal || [];
      temp.forEach(item => {
        colFormList.push({
          name: item.columnName,
          type: item.columnTypeName,
        });
      });
    }
  },
);

watch(
  () => data.value?.data?.data,
  newVal => {
    tabData.value = newVal || [];
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
    exec();
  },
);

const handleConnectFormData = (data: ConnectFormModel) => {
  connectFormData.uuid = data.uuid;
  connectFormData.type = data.type;
  connectFormData.schema = data.schema;
  connectFormData.table = data.table;
};

const handleChangeTable = (data: ConnectFormModel) => {
  handleConnectFormData(data);
  colFormList.length = 0;
  resetForm();
  resetTable();
  pagination.current = 1;
  exec();
};

const resetForm = () => {
  queryForm.whereList = [{ column: '', columnType: '', value: '', queryType: '=' }];
  queryForm.columnList = [];
  queryForm.orderByList = [{ column: '', type: 1 }];
};

const resetTable = () => {
  tabCol.value = [];
  tabData.value = [];
};

const exec = async () => {
  const params = concatQueryParams(connectFormData);
  execute({
    data: { ...params },
  });
};

const handlePageChange = (page: number) => {
  pagination.current = page;
};
</script>
<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>连接选择</template>
      <ConnectTableSelect
        @exec="exec"
        @handle-change-table="handleChangeTable"
        @reset-form="resetForm"
      />
    </Card>

    <Divider style="margin-top: 0" />

    <Card class="general-card" :bordered="false">
      <template #title>单表查询</template>
      <Form :model="queryForm">
        <FormItem label="查询列名" :content-flex="false" :merge-props="false" field="columnList">
          <Row :gutter="8">
            <Col :span="16">
              <Select
                v-model="queryForm.columnList"
                placeholder="请选择列名"
                multiple
                :max-tag-count="10"
                allow-clear
              >
                <Option
                  v-for="item in colFormList"
                  :key="item.name"
                  :value="item.name"
                  :label="item.name"
                >
                  <span>{{ item.name }}</span>
                  <span :style="{ float: 'right', color: '#909399' }">{{ item.type }}</span>
                </Option>
              </Select>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          v-for="(item, index) in queryForm.whereList"
          :key="index"
          :field="`whereList.${index}`"
          :label="index === 0 ? '过滤条件' : ''"
          :content-flex="false"
          :merge-props="false"
        >
          <Row :gutter="8">
            <FormItem no-style field="column">
              <Col :span="8">
                <Select
                  v-model="item.column"
                  placeholder="请选择相关条件列"
                  allow-clear
                  :allow-search="true"
                >
                  <Option
                    v-for="column in colFormList"
                    :key="column.name"
                    :value="column.name"
                    :label="column.name"
                  >
                    <span>{{ column.name }}</span>
                    <span :style="{ float: 'right', color: '#909399' }">{{ column.type }}</span>
                  </Option>
                </Select>
              </Col>
            </FormItem>

            <Col :span="4">
              <FormItem no-style field="queryType">
                <Select v-model="item.queryType" placeholder="请输入条件比较方式">
                  <Option>&gt;</Option>
                  <Option>&lt;</Option>
                  <Option>like</Option>
                  <Option>=</Option>
                  <Option>&le;</Option>
                  <Option>&ge;</Option>
                  <Option label="!=" value="<>" />
                </Select>
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Input v-model="item.value" placeholder="请输入过滤条件值" />
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Button
                  v-if="
                    item.column !== '' &&
                    item.value !== '' &&
                    index === queryForm.whereList.length - 1
                  "
                  type="text"
                  shape="circle"
                  @click="handleAddWhere"
                >
                  <template #icon>
                    <icon-plus :size="buttonSize" />
                  </template>
                </Button>
                <Button
                  v-if="queryForm.whereList.length !== 1"
                  type="text"
                  status="danger"
                  shape="circle"
                  @click="handleDeleteWhere(index)"
                >
                  <template #icon>
                    <icon-close :size="buttonSize" />
                  </template>
                </Button>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          v-for="(item, index) in queryForm.orderByList"
          :key="index"
          :field="`orderList.${index}`"
          :label="index === 0 ? '排序条件' : ''"
          :content-flex="false"
          :merge-props="false"
        >
          <Row :gutter="8">
            <Col :span="8">
              <FormItem no-style>
                <Select v-model="item.type" placeholder="请选择排序方式">
                  <Option label="升序" :value="1"></Option>
                  <Option label="降序" :value="0"></Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem no-style>
                <Select
                  v-model="item.column"
                  placeholder="请选择排序列"
                  allow-clear
                  :allow-search="true"
                >
                  <Option
                    v-for="column in colFormList.filter(item => {
                      return !queryForm.orderByList.some(selected => selected.column === item.name);
                    })"
                    :key="column.name"
                    :value="column.name"
                    :label="column.name"
                  ></Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Button
                  v-if="item.column !== '' && index === queryForm.orderByList.length - 1"
                  type="text"
                  shape="circle"
                  @click="handleAddOrder"
                >
                  <template #icon>
                    <icon-plus :size="buttonSize" />
                  </template>
                </Button>
                <Button
                  v-if="queryForm.orderByList.length !== 1"
                  type="text"
                  status="danger"
                  shape="circle"
                  @click="handleDeleteOrder(index)"
                >
                  <template #icon>
                    <icon-close :size="buttonSize" />
                  </template>
                </Button>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Card>

    <Divider style="margin-top: 0" />

    <Card class="general-card" :bordered="false">
      <template #title>执行结果</template>
      <Divider style="margin-top: 0" />
      <Spin :style="{ width: '100%' }" :loading="isLoading">
        <Table
          column-resizable
          :bordered="false"
          :columns="tabCol"
          :data="tabData"
          :pagination="pagination"
          @page-change="handlePageChange"
        />
      </Spin>
    </Card>
  </PageContainer>
</template>

<style lang="less">
.arco-checkbox-label {
  display: block !important;
  width: 100% !important;
}

.arco-select-option-checkbox {
  width: 100% !important;
}

.arco-select-option-content {
  display: block !important;
  width: 100% !important;
}
</style>
