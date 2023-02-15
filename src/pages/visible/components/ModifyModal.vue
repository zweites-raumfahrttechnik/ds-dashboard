<script setup lang="ts">
import { Form, FormItem, Input, Radio, Modal, RadioGroup } from '@arco-design/web-vue';

import { useModalStore, useVisibleTableStore } from '../hooks';

import { useAxios } from '@vueuse/integrations/useAxios';
import { instance } from '@/api';
import { USER_VISIBLE_URL } from '@/api/url';

const { ModalFormRef, ModalVisible, modifyForm } = useModalStore()!;

const { refreshList } = useVisibleTableStore()!;

const { execute: deleteVisible } = useAxios(USER_VISIBLE_URL, { method: 'PUT' }, instance, {
  immediate: false,
});

const handleModify = async (userConnectUuid: any, deletable: any) => {
  await deleteVisible({
    data: {
      userConnectUuid: userConnectUuid,
      deletable: deletable,
    },
  }).then(() => {
    ModalFormRef.value?.resetFields();
    ModalVisible.value = false;
    refreshList();
  });
};

const handleCancel = () => {
  ModalVisible.value = false;
};
</script>

<template>
  <Modal
    v-model:visible="ModalVisible"
    title="用户可删性修改"
    width="700px"
    @cancel="handleCancel"
    @ok="handleModify(modifyForm.userConnectUuid, modifyForm.deletable)"
  >
    <Form ref="ModalFormRef" v-model:model="modifyForm">
      <FormItem field="userConnectUuid" label="用户连接UUID" disabled :rules="[{ required: true }]">
        <Input v-model="modifyForm.userConnectUuid" />
      </FormItem>
      <FormItem field="deletable" label="是否可删" :rules="[{ required: true, message: '请选择' }]">
        <RadioGroup v-model="modifyForm.deletable">
          <Radio :value="1">是</Radio>
          <Radio :value="0">否</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
  </Modal>
</template>
