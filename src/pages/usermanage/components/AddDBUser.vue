<script lang="ts" setup>
import { Form, FormItem, Input, Select, Option, Button } from '@arco-design/web-vue';
import { reactive, ref } from 'vue';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance } from '@/api';

import { Add_USERLIST_URL } from '@/api/url';
import { UserFormlist, defaultUserFormlist } from '../userData';
const formRef = ref<FormInstance>();

//设置结果框
const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

//...它用于把一个数组转化为用逗号分隔的参数序列
const userFormData = reactive<UserFormlist>({
  ...defaultUserFormlist[1],
  type: 1,
});

const { execute } = useAxios(Add_USERLIST_URL, { method: 'POST' }, instance, {
  immediate: false,
});

//添加用户数据
const handleSubmitUser = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }
  execute({
    data: {
      ...userFormData,
    },
  }).then(() => {
    formRef.value?.resetFields();
    emit('change-step', 1);
  });
};
</script>
<template>
  <!--uuid应该是自动生成，不应该有用户指定，这里留出输入框-->
  <Form ref="formRef" :model="userFormData" class="form" @submit="handleSubmitUser">
    <FormItem label="uuid" field="uuid">
      <Input v-model="userFormData.uuid" />
    </FormItem>

    <FormItem label="用户类型" field="type">
      <Select v-model="userFormData.type">
        <Option :value="1">MySQL</Option>
        <Option :value="2">达梦数据库</Option>
        <Option :value="3">金仓数据库</Option>
      </Select>
    </FormItem>

    <FormItem label="用户名" field="username">
      <Input v-model="userFormData.username" placeholder="请输入用户名" />
    </FormItem>

    <FormItem label="主机地址" field="host">
      <Input v-model="userFormData.host" placeholder="请输入用户主机地址" />
    </FormItem>

    <FormItem label="密码" field="password">
      <Input v-model="userFormData.password" placeholder="请输入用户密码" />
    </FormItem>

    <FormItem>
      <Button html-type="submit" type="primary">提交</Button>
    </FormItem>
  </Form>
</template>
