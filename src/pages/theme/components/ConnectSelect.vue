<script lang="ts" setup>
import { Row, Col, Form, FormItem, Select, Option } from '@arco-design/web-vue';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL } from '@/api/url';
import { GetListData, GetListDataItem } from '@/api/types';
import { useAxios } from '@vueuse/integrations/useAxios';

const emit = defineEmits<{
  (event: 'handleConnectChange', uuid: string): void;
}>();

const connectFormRef = ref<FormInstance>();

const connectFormData = reactive<{ uuid: string; type: number }>({
  uuid: '',
  type: 1,
});

const connections = ref<GetListDataItem[]>([]);

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

const handleChange = () => {
  emit('handleConnectChange', connectFormData.uuid);
};

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
  () => {
    handleChange();
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
        <Row :gutter="16" justify="space-around">
          <Col :span="10">
            <FormItem
              field="type"
              label="数据库类型"
              :rules="[{ required: true, message: '请选择数据库类型' }]"
            >
              <Select v-model="connectFormData.type" placeholder="请选择数据库类型" allow-clear>
                <Option :value="1">MySQL</Option>
                <Option :value="2">达梦数据库</Option>
                <Option :value="3">金仓数据库</Option>
                <Option :value="4">Redis</Option>
                <Option :value="5">MongoDB</Option>
                <Option :value="6">ElasticSearch</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="10">
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
                  {{ item.ip }}:{{ item.port
                  }}{{ item.name === null || item.name === '' ? '' : '/' + item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
  </Row>
</template>
