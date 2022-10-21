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
import { instance,ResponseWrap } from '@/api';
import { REDIS_OP_CUSTOM_URL } from '@/api/url';
import { CustomFormModel, defaultCustomFromValue } from './types';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
  (e: 'getChildren', num: object): void;
}>();

const form = reactive<CustomFormModel>({
  ...defaultCustomFromValue[0],
});

const { data,execute, isLoading } = useAxios<ResponseWrap<CustomFormModel>>
    (REDIS_OP_CUSTOM_URL,
     { method: 'get' }, 
     instance, {
     immediate: false,
});
// 更新默认值(用于声明在数据更改时调用的侦听回调。)
watch(
  () => form.uuid,
  () => execute({ params: { uuid: form.uuid } }),
);

const handleSubmit = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }
  execute({
    data: {
      ...form,
    },
  }).then(() => {
    formRef.value?.resetFields();
    emit('change-step', 1);
    emit('getChildren',data.value.data.data);
  });
};
const formRef = ref<FormInstance>();
</script>

<template>
    <div>
    <Form  ref="formRef" :model="form"  @submit="handleSubmit" >
        <Row :gutter="16">
            <Col :span="8">
                <FormItem field="dbnumber" label="数据库编号" label-col-flex="100px"
                help="The database number is required"
                :rules="[{required:true}]">
                  <InputNumber v-model="form.dbnumber" :min="0" placeholder="please enter database number" />
                </FormItem>
            </Col>
            <Col :span="8">
                <FormItem field="command" label="操作" label-col-flex="100px" 
                help="This is required custom operation"
                :rules="[{required:true}]">
                    <Input v-model="form.command" placeholder="please enter command" />
                </FormItem>
            </Col>
            <Col :span="8">
                <FormItem field="args" label="参数列表" label-col-flex="80px"
                help="This is custom parameter,support null"
                :rules="[{required:true}]"
                :validate-trigger="['change','input']">
                    <InputTag v-model="form.args" placeholder="please press enter after entering"  allow-clear/>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <FormItem label-col-flex="100px">
                <Space>
                    <Button html-type="submit" type="primary">执行</Button>
                    <Button type="primary" @click="$refs.formRef.resetFields()">重置</Button>
                </Space>
            </FormItem>
        </Row>
    </Form>
    </div>
</template>

<style lang="less" scoped>

</style>

