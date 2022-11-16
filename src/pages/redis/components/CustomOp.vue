<script lang="ts" setup>
import {
  Card,
  Divider,
  Form,
  FormItem,
  Row,
  Col,
  Input,
  Button,
  Space,
  Spin,
  InputTag,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { GetListDataItem } from '@/api/types';
import { REDIS_OP_CUSTOM_URL } from '@/api/url';
import { instance, ResponseWrap } from '@/api';

import { useAxios } from '@vueuse/integrations/useAxios';
import JsonEditor from '@/components/JsonEditor.vue';

import { CustomFormModel } from './types';

const props = defineProps<{
  selectedKeys: string;
  conMap: Record<string, GetListDataItem>;
}>();

const {
  data: data,
  isLoading: customLoading,
  execute: customExecute,
} = useAxios<ResponseWrap<{ data: undefined }>>(
  REDIS_OP_CUSTOM_URL,
  {
    method: 'POST',
  },
  instance,
  {
    immediate: false,
  },
);

watch(
  () => props.selectedKeys,
  val => {
    const keys = val.split('@*@');
    customOpForm.uuid = keys[0];
    customOpForm.dbnumber = +keys[1];
  },
);

const customOpFormRef = ref<FormInstance>();
const customOpForm = reactive<CustomFormModel>({
  uuid: props.selectedKeys.split('@*@')[0],
  dbnumber: +props.selectedKeys.split('@*@')[1],
  command: '',
  args: [],
});

const json = computed(() => {
  return data.value?.data;
});

const concatRedisAddress = computed(() => {
  return props.conMap[customOpForm.uuid].ip + ':' + props.conMap[customOpForm.uuid].port;
});

const concatRedisDbName = computed(() => {
  const index = customOpForm.dbnumber;
  return `db${index < 10 ? '0' + index : index}`;
});

const handleExecuteButtonClick = async () => {
  const res = customOpFormRef.value?.validate();
  if (!res) {
    return;
  }
  customExecute({ data: { ...customOpForm } });
};

const handleResetButtonClick = () => {
  customOpForm.command = '';
  customOpForm.args = [];
};
</script>

<template>
  <Form ref="customOpFormRef" :model="customOpForm" label-align="left" layout="vertical">
    <Card class="general-card" :bordered="false">
      <template #title>自定义操作</template>
      <template #extra>
        <Space>
          <Button type="primary" @click="handleExecuteButtonClick">
            <template #icon> <IconPlayArrow /> </template>
            执行
          </Button>
          <Button @click="handleResetButtonClick">
            <template #icon>
              <IconLoop />
            </template>
            重置
          </Button>
        </Space>
      </template>

      <Row :gutter="16">
        <Col :span="8">
          <FormItem label="实例地址">
            <Input v-model="concatRedisAddress" readonly></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="数据库">
            <Input v-model="concatRedisDbName" readonly></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem
            label="操作命令"
            :rules="{ required: true, message: '请输入操作命令' }"
            field="command"
          >
            <Input v-model="customOpForm.command"> </Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col :span="24">
          <FormItem label="自定义参数" field="args">
            <InputTag v-model="customOpForm.args" allow-clear />
          </FormItem>
        </Col>
      </Row>
    </Card>
  </Form>

  <Card class="general-card" :bordered="false">
    <Divider style="margin-top: 0" />
    <Spin :loading="customLoading" :style="{ width: '100%' }">
      <JsonEditor :value="json" current-mode="view" height="440px"></JsonEditor>
    </Spin>
  </Card>
</template>
