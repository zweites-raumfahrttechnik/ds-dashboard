<script lang="ts" setup>
import {
  Spin,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  InputNumber,
  InputPassword,
  Button,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';

import { instance } from '@/api';
import { CONNECT_URL } from '@/api/url';

import { FormModel, defaultFromValue } from './types';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const formRef = ref<FormInstance>();

const formdata = reactive<FormModel>({
  ...defaultFromValue[1],
  type: 1,
});

const isSQL = computed(() => {
  if (formdata.type === 1 || formdata.type === 2 || formdata.type === 3) {
    return true;
  }
  return false;
});

const { execute, isLoading } = useAxios(CONNECT_URL, { method: 'POST' }, instance, {
  immediate: false,
});

// 更新默认值
watch(
  () => formdata.type,
  newVal => {
    const defaultVal = defaultFromValue[newVal];

    Object.keys(defaultVal).forEach(k => {
      formdata[k] = defaultVal[k];
    });
  },
);

const handleSubmit = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }

  execute({
    data: {
      ...formdata,
    },
  }).then(() => {
    formRef.value?.resetFields();
    emit('change-step', 1);
  });
};
</script>

<template>
  <Spin :loading="isLoading">
    <Form ref="formRef" :model="formdata" class="form" @submit="handleSubmit">
      <FormItem field="type" label="类型" :rules="[{ required: true }]">
        <Select v-model="formdata.type">
          <Option :value="1">MySQL</Option>
          <Option :value="2">达梦数据库</Option>
          <Option :value="3">金仓数据库</Option>
          <Option :value="4">Redis</Option>
          <Option :value="5">MongoDB</Option>
          <Option :value="6">Elasticsearch</Option>
        </Select>
      </FormItem>

      <FormItem
        field="ip"
        label="运行地址"
        :rules="[
          { required: true, message: '请输入IP地址' },
          {
            match:
              /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/,
            message: 'IP地址格式不正确',
          },
        ]"
      >
        <Input v-model="formdata.ip" placeholder="请输入数据库运行地址" />
      </FormItem>

      <FormItem field="port" label="运行端口">
        <InputNumber v-model="formdata.port" placeholder="请输入数据库运行端口" />
      </FormItem>

      <FormItem field="username" label="root用户名">
        <Input v-model="formdata.username" placeholder="请输入数据库Root用户名" />
      </FormItem>

      <FormItem field="password" label="root密码">
        <InputPassword v-model="formdata.password" placeholder="请输入数据库Root用户密码" />
      </FormItem>

      <FormItem v-if="isSQL" field="name" label="数据库名称">
        <Input placeholder="请输入默认连接数据库" />
      </FormItem>

      <FormItem v-if="isSQL" field="others" label="其他连接参数">
        <Input placeholder="请输入其他连接参数" />
      </FormItem>

      <FormItem>
        <Button html-type="submit" type="primary">提交</Button>
      </FormItem>
    </Form>
  </Spin>
</template>

<style lang="less" scoped>
.form {
  width: 700px;
}
</style>
