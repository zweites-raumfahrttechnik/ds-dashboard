<script lang="ts" setup>
import {
  Row,
  Col,
  Form,
  FormItem,
  Button,
  Divider,
  Select,
  Option,
  Space,
} from '@arco-design/web-vue';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL, SQL_META_SCHEMA, SQL_META_TABLE } from '@/api/url';
import { GetListData, GetListDataItem, GetSqlSchema, GetSqlTable } from '@/api/types';
import { useAxios } from '@vueuse/integrations/useAxios';

import { ConnectFormModel, defaultConnectFormValue } from '../types';

const emit = defineEmits<{
  (event: 'exec', connectFormData: ConnectFormModel): void;
  (event: 'handleChangeTable', connectFormData: ConnectFormModel): void;
  (event: 'resetForm'): void;
}>();

const connectFormRef = ref<FormInstance>();

const connectFormData = reactive<ConnectFormModel>({ ...defaultConnectFormValue });

const connections = ref<GetListDataItem[]>([]);

const schemas = ref<string[]>([]);

const tables = ref<string[]>([]);

const pagination = reactive<{ pg: number; size: number }>({
  pg: 1,
  size: 50,
});

const {
  data: conList,
  isLoading: conListLoading,
  execute: conListExec,
} = useAxios<ResponseWrap<GetListData>>(
  CONNECT_URL,
  {
    method: 'GET',
    params: { pg: pagination.pg, size: pagination.size, type: connectFormData.type },
  },
  instance,
  {
    immediate: false,
  },
);

const {
  data: schemaList,
  isLoading: schemaListLoading,
  execute: schemaListExec,
} = useAxios<ResponseWrap<GetSqlSchema>>(SQL_META_SCHEMA, { method: 'GET' }, instance, {
  immediate: false,
});

const {
  data: tableList,
  isLoading: tableListLoading,
  execute: tableListExec,
} = useAxios<ResponseWrap<GetSqlTable>>(SQL_META_TABLE, { method: 'GET' }, instance, {
  immediate: false,
});

watch(
  () => conList.value?.data?.data,
  newVal => {
    const tmp = new Set(connections.value);
    newVal?.forEach(item => {
      tmp.add(item);
    });

    connections.value = Array.from(tmp);
    if (connectFormData.uuid === '' && connections.value.length !== 0) {
      connectFormData.uuid = connections.value[0].uuid;
    }
  },
);

watch(
  () => schemaList.value?.data?.names,
  () => {
    schemas.value = schemaList.value?.data?.names || [];
  },
);

watch(
  () => tableList.value?.data?.names,
  () => {
    tables.value = tableList.value?.data?.names || [];
  },
);

watch(
  () => connectFormData.type,
  () => {
    pagination.pg = 1;
    connectFormData.uuid = '';
    connections.value = [];

    conListExec({
      params: { pg: pagination.pg, size: pagination.size, type: connectFormData.type },
    });
  },
);

watch(
  () => connectFormData.uuid,
  newVal => {
    connectFormData.schema = '';
    schemas.value = [];
    if (newVal !== '') {
      schemaListExec({ params: { uuid: connectFormData.uuid, type: connectFormData.type } });
    }
  },
);

watch(
  () => connectFormData.schema,
  newVal => {
    connectFormData.table = '';
    tables.value = [];
    if (newVal !== '') {
      tableListExec({
        params: {
          uuid: connectFormData.uuid,
          type: connectFormData.type,
          schema: connectFormData.schema,
        },
      });
    }
  },
);

watch(
  () => connectFormData.table,
  () => {
    if (connectFormData.table && connectFormData.table !== '') {
      emit('handleChangeTable', connectFormData);
    }
  },
);

onMounted(() => {
  conListExec();
});

const selectLoadMore = () => {
  pagination.pg++;
  conListExec({
    params: {
      pg: pagination.pg,
      size: pagination.size,
      type: connectFormData.type,
    },
  });
};

const handleExec = async () => {
  const res = await connectFormRef.value?.validate();
  if (res) {
    return;
  }
  emit('exec', connectFormData);
};

const resetForm = () => {
  emit('resetForm');
};
</script>

<template>
  <Row>
    <Col :flex="1">
      <Form
        ref="connectFormRef"
        :model="connectFormData"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <Row :gutter="16">
          <Col :span="4">
            <FormItem
              field="type"
              label="类型"
              :rules="[{ required: true, message: '请选择数据库类型' }]"
            >
              <Select v-model="connectFormData.type" placeholder="请选择数据库类型" allow-clear>
                <Option :value="1">MySQL</Option>
                <Option :value="2">达梦数据库</Option>
                <Option :value="3">金仓数据库</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem
              label="数据库连接"
              field="uuid"
              :rules="[{ required: true, message: '请选择数据库连接' }]"
              :virtual-list-props="{ height: 300 }"
            >
              <Select
                v-model="connectFormData.uuid"
                placeholder="请选择数据库连接"
                :allow-search="true"
                allow-clear
                :loading="conListLoading"
                @dropdown-reach-bottom="selectLoadMore"
              >
                <Option v-for="item in connections" :key="item.uuid" :value="item.uuid">
                  {{ item.ip }}:{{ item.port }}{{ item.name === '' ? '' : '/' + item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem
              field="schema"
              label="模式名"
              :rules="[{ required: true, message: '请选择待查询模式' }]"
            >
              <Select
                v-model="connectFormData.schema"
                placeholder="请选择待查询模式"
                allow-clear
                :loading="schemaListLoading"
                :allow-search="true"
              >
                <Option v-for="item in schemas" :key="item" :value="item">{{ item }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem
              field="table"
              label="表名"
              :rules="[{ required: true, message: '请选择待查询表' }]"
            >
              <Select
                v-model="connectFormData.table"
                placeholder="请选择待查询表"
                allow-clear
                :loading="tableListLoading"
                :allow-search="true"
              >
                <Option v-for="item in tables" :key="item" :value="item">{{ item }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>

    <Divider style="height: 34px" direction="vertical" />

    <Col :flex="'86px'" style="text-align: right">
      <Space :size="8">
        <Button type="primary" @click="handleExec">
          <template #icon>
            <IconSearch />
          </template>
          查询
        </Button>
        <Button @click="resetForm">
          <template #icon>
            <IconLoop />
          </template>
          重置
        </Button>
      </Space>
    </Col>
  </Row>
</template>
