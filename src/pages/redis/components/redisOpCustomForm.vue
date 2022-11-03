<script lang="ts" setup>
import {
  Form,
  FormItem,
  Row,
  Col,
  Input,
  Button,
  Space,
  InputTag,
  InputNumber
} from '@arco-design/web-vue';
import { reactive } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ResponseWrap } from '@/api';
import { REDIS_OP_CUSTOM_URL } from '@/api/url';
import { CustomFormModel } from './types';

interface Props {
  uuid?: string,
  ip?: string,
  username?: string
}
const props = withDefaults(defineProps<Props>(), {
  uuid: '暂无数据',
  ip: '暂无数据',
  username: '暂无数据'
});

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;//页面跳转
  (e: 'getChildren', num: object): void;//响应信息传递（为了显示响应数据）
  (e: 'isright', num: boolean): void;//请求是否成功判定
}>();

const form = reactive<CustomFormModel>({
  args: [],
  command: '',
  dbnumber: 0,
  uuid: props.uuid
});

//该示例单独拿出来，是因为用户可能表单填写错误致使后端返回错误数据，
//此处需要拿到返回的错误数据，以提醒用户操作有误
const instance = axios.create({
  baseURL: '/api',
})
const { data, execute,cancel, isLoading } = useAxios<ResponseWrap<CustomFormModel>>
  (REDIS_OP_CUSTOM_URL,
    { method: 'POST' },
    instance, {
    immediate: false,
  });

const handleSubmit = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }
  cancel();
  execute({
    data: {
      ...form,
    },
  }).then(() => {
    formRef.value?.resetFields();
    if(data.value?.code!==0 || data.value?.msg!=='success'){
      emit('isright', true);
    }else{emit('isright', false);}
    emit('change-step', 1);
    emit('getChildren', Object(data.value));
  });
};
const handleFromReset = () => {
  formRef.value?.resetFields();
};
const formRef = ref<FormInstance>();
</script>

<template>
  <div>
    <Form ref="formRef" :model="form" @submit="handleSubmit">
      <Row :gutter="20">
        <Col :span="8">
          <FormItem field="uuid" label="数据库连接uuid" label-col-flex="100px" :disabled="true">
            <Input v-model="uuid" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem field="ip" label="数据库地址" label-col-flex="80px" :disabled="true">
            <Input v-model="ip" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem field="username" label="用户名" label-col-flex="85px" :disabled="true" :label-attrs="{}">
            <Input v-model="username" />
          </FormItem>
        </Col>
      </Row><br />
      <Row :gutter="16">
        <Col :span="8">
          <FormItem field="dbnumber" label="数据库编号" label-col-flex="100px" :rules="[{ required: true }]">
            <InputNumber v-model="form.dbnumber" :min="0" placeholder="请输入数据库编号" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem field="command" label="操作类型" label-col-flex="80px" :rules="[{ required: true, message: '请输入操作命令' }]">
            <Input v-model="form.command" placeholder="请输入操作命令" />
          </FormItem>
        </Col>
      </Row>
      <br />
      <Row :gutter="16">
        <Col :span="16">
          <FormItem field="args" label="参数列表" label-col-flex="100px">
            <InputTag v-model="form.args" placeholder="请输入自定义参数后，按Enter键输入下一个参数，否则默认为空" allow-clear />
          </FormItem>
        </Col>
      </Row>
      <br />
      <Row>
        <FormItem label-col-flex="100px">
          <Space>
            <Button html-type="submit" type="primary">执行</Button>
            <Button type="primary" @click="handleFromReset">重置</Button>
          </Space>
        </FormItem>
      </Row>
    </Form>
  </div>
</template>
