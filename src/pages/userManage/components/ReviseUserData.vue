<script lang="ts" setup>
import { Form, FormItem, Input, Select, Option, Button } from '@arco-design/web-vue';
import { reactive, ref } from 'vue';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance } from '@/api';
import { UPDATE_USER_URL } from '@/api/url';

import { UserFormlist } from '../userData';

const formRef = ref<FormInstance>();

//...它用于把一个数组转化为用逗号分隔的参数序列
const ReFormData = reactive<UserFormlist>({
  type: 1,
});

const { execute } = useAxios(UPDATE_USER_URL, { method: 'POST' }, instance, {
  immediate: false,
});

//添加用户数据
const handleSubmitRevise = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }
  execute({
    data: {
      ...ReFormData,
    },
  }).then(() => {
    formRef.value?.resetFields();
  });
};
</script>
<template>
  <!--uuid应该是自动生成，不应该有用户指定，这里留出输入框-->
  <Form ref="formRef" :model="ReFormData" class="form" @submit="handleSubmitRevise">
    <FormItem label="uuid" field="uuid">
      <Input v-model="ReFormData.uuid" />
    </FormItem>

    <FormItem label="用户类型" field="type">
      <Select v-model="ReFormData.type">
        <Option :value="1">MySQL</Option>
        <Option :value="2">达梦数据库</Option>
        <Option :value="3">金仓数据库</Option>
      </Select>
    </FormItem>

    <FormItem label="用户名" field="username">
      <Input v-model="ReFormData.username" placeholder="请输入用户名" />
    </FormItem>

    <FormItem label="主机地址" field="host">
      <Input v-model="ReFormData.host" placeholder="请输入用户主机地址" />
    </FormItem>

    <FormItem label="密码" field="password">
      <Input v-model="ReFormData.password" placeholder="请输入用户密码" />
    </FormItem>

    <FormItem>
      <Button html-type="submit" type="primary">提交</Button>
    </FormItem>
  </Form>
</template>
