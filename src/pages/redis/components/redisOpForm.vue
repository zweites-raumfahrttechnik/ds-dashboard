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
});

const { execute, isLoading } = useAxios(CONNECT_URL, { method: 'POST' }, instance, {
  immediate: false,
});

// 更新默认值
// watch(
//   () => formdata.type,
//   newVal => {
//     const defaultVal = defaultFromValue[newVal];

//     Object.keys(defaultVal).forEach(k => {
//       formdata[k] = defaultVal[k];
//     });
//   },
// );

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
const options = {
      Beijing: ['Haidian', 'Chaoyang', 'Changping'],
      Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
      Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
    }
</script>

<template>
  <Spin :loading="isLoading">
    <Form ref="formRef" :model="formdata" class="form" @submit="handleSubmit">
      
      <FormItem label="数据库名称" :rules="[{ required: true }]">
        <InputNumber v-model="formdata.dbname" /> 
      </FormItem>
      <FormItem field="type" label="操作类型" >
        <!-- :rules="[{ required: true }]" -->
        <Select v-model="formdata.action">
          <Option :value="1">set</Option>
          <Option :value="2">get</Option>
          <Option :value="3">delete</Option>
          <Option :value="4">exist</Option>
          <Option :value="5">type</Option>
          <Option :value="6">count</Option>
        </Select>
      </FormItem>
      <FormItem field="type" label="操作值类型">
        <!-- :rules="[{ required: true }]" -->
        <Select v-model="formdata.keyType">
          <Option :value="1">string</Option>
          <Option :value="2">set</Option>
          <Option :value="3">list</Option>
          <Option :value="4">sort</Option>
          <Option :value="5">sortset</Option>
        </Select>
      </FormItem>
      <FormItem v-model="formdata.key" field="key" label="键名">
        <Input placeholder="请输入key值" />
      </FormItem>
      <FormItem v-model="formdata.parameter1" field="others" label="参数1">
        <Input placeholder="请输入参数1" />
      </FormItem>
      <FormItem v-model="formdata.parameter2" field="others" label="参数2">
        <Input placeholder="请输入参数2" />
      </FormItem>
      <FormItem>
        <Button html-type="submit" type="primary">执行</Button>
      </FormItem>

    </Form>
  </Spin>
</template>

<style lang="less" scoped>
.form {
  width: 700px;
}
</style>

