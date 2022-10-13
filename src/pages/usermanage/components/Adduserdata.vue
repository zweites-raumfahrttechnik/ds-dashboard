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
  Modal,
} from '@arco-design/web-vue';
import { reactive, ref} from 'vue';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';

import { instance } from '@/api';
import { Add_Userlist } from '@/api/url';

import { UserFormlist, defaultUserFormlist } from '../type';
//const visible1 = ref(false);
const formRef = ref<FormInstance>();

const formdata = reactive<UserFormlist>({
  ...defaultUserFormlist[1],
  type: 1,
});

const { execute, isLoading } = useAxios(Add_Userlist, { method: 'POST' }, instance, {
  immediate: false,
});

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
  });
};
</script>
<template>
  <Spin :loading="isLoading">
    <Form ref="formRef" :model="formdata" class="form" @submit="handleSubmit">
      <FormItem label="uuid" field="uuid">
        <Input v-model="formdata.uuid" />
      </FormItem>

      <FormItem label="用户类型" field="type">
        <Select v-model="formdata.type">
          <Option :value="1">MySQL</Option>
          <Option :value="2">达梦数据库</Option>
          <Option :value="3">金仓数据库</Option>
        </Select>
      </FormItem>

      <FormItem label="用户名" field="username">
        <Input v-model="formdata.username" placeholder="请输入用户名" />
      </FormItem>

      <FormItem label="主机地址" field="host">
        <Input v-model="formdata.host" placeholder="请输入用户主机地址" />
      </FormItem>

      <FormItem label="密码" field="password">
        <Input v-model="formdata.password" placeholder="请输入用户密码" />
      </FormItem>

      <FormItem>
        <Button html-type="submit" type="primary">提交</Button>
      </FormItem>
    </Form>
  </Spin>
</template>
