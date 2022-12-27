<script lang="ts" setup>
import {
  Spin,
  Form,
  FormItem,
  Select,
  Option,
  Radio,
  RadioGroup,
  Button,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance } from '@/api';
import { USER_VISIBLE_URL } from '@/api/url';

import { useListStore } from '../hooks';

const {
  userList,
  userIsLoading,
  connectList,
  connectIsLoading,
  addForm,
  connectSelectLoadMore,
  userSelectLoadMore,
} = useListStore()!;

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const formRef = ref<FormInstance>();

const { execute, isLoading } = useAxios(USER_VISIBLE_URL, { method: 'POST' }, instance, {
  immediate: false,
});

// 提交表单数据
const handleSubmit = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }

  execute({
    data: {
      ...addForm,
    },
  }).then(() => {
    formRef.value?.resetFields();
    emit('change-step', 1);
  });
};
</script>

<template>
  <Spin :loading="isLoading">
    <Form ref="formRef" :model="addForm" class="form" @submit="handleSubmit">
      <FormItem
        field="userUuid"
        label="用户名"
        :rules="[{ required: true, message: '请选择用户名' }]"
        :virtual-list-props="{ height: 20 }"
      >
        <Select
          v-model="addForm.userUuid"
          :loading="userIsLoading"
          allow-clear
          allow-search
          @dropdown-reach-bottom="userSelectLoadMore"
        >
          <Option v-for="item in userList" :key="item.userName" :value="item.userUuid">
            {{ item.userName }}
          </Option>
        </Select>
      </FormItem>
      <FormItem
        field="connectUuid"
        label="数据库地址"
        :rules="[{ required: true, message: '请选择数据库地址' }]"
        :virtual-list-props="{ height: 20 }"
      >
        <Select
          v-model="addForm.connectUuid"
          :loading="connectIsLoading"
          allow-clear
          allow-search
          @dropdown-reach-bottom="connectSelectLoadMore"
        >
          <Option v-for="item in connectList" :key="item.ip" :value="item.uuid">
            {{ item.ip }}:{{ item.port }}
          </Option>
        </Select>
      </FormItem>

      <FormItem
        field="visible"
        label="是否可见"
        :rules="[{ required: true, message: '请选择' }]"
        disabled
      >
        <RadioGroup v-model="addForm.visible">
          <Radio :value="1"> 是 </Radio>
          <Radio :value="0"> 否 </Radio>
        </RadioGroup>
      </FormItem>

      <FormItem field="deletable" label="是否可删" :rules="[{ required: true, message: '请选择' }]">
        <RadioGroup v-model="addForm.deletable">
          <Radio v-model="addForm.deletable" :value="1"> 是 </Radio>
          <Radio v-model="addForm.deletable" :value="0"> 否 </Radio>
        </RadioGroup>
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
