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
const visible1 = ref(false);
const formRef = ref<FormInstance>();

//默认情况
const formdata = reactive<UserFormlist>({
  //默认情况
  ...defaultUserFormlist[1],
  type: 1,
});
//计算属性

//引入POST请求
const { execute, isLoading } = useAxios(Add_Userlist, { method: 'POST' }, instance, {
  immediate: false,
});

//提交事件
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
      <FormItem label="uuid">
        <Input v-model="formdata.uuid" />
      </FormItem>
      <FormItem label="用户类型" field="type">
        <Select v-model="formdata.type">
          <Option :value="1" label="MySQL">MySQL</Option>
          <Option :value="2" label="DM">达梦数据库</Option>
          <Option :value="3" label="Kingbase">金仓数据库</Option>
        </Select>
      </FormItem>
      <FormItem label="用户名">
        <Input v-model="formdata.username" placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="主机地址">
        <Input v-model="formdata.host" placeholder="请输入用户主机地址" />
      </FormItem>
      <FormItem label="密码">
        <Input v-model="formdata.password" placeholder="请输入用户密码" />
      </FormItem>
      <FormItem>
        <Button html-type="submit" type="primary">提交</Button>
      </FormItem>
    </Form>
  </Spin>
</template>
