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
import { instance, ResponseWrap } from '@/api';
import { REDIS_OP_CUSTOM_URL } from '@/api/url';
import { CustomFormModel } from './types';
//const props = defineProps<{ uuid: string }>();
interface Props {
  uuid?: string
}
const props = withDefaults(defineProps<Props>(), {
  uuid: '6df74580-023a-4aa0-ae5f-c134639e618d',
});
//console.log(props.uuid);

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
  (e: 'getChildren', num: object): void;
}>();

const form = reactive<CustomFormModel>({
  //defaultCustomFromValue[0],
  args: [],
  command: '',
  dbnumber: 0,
  uuid: props.uuid
});

const { data, execute, isLoading } = useAxios<ResponseWrap<CustomFormModel>>
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
  execute({
    data: {
      ...form,
    },
  }).then(() => {
    formRef.value?.resetFields();
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
      <Row :gutter="16">
        <Col :span="8">
        <FormItem field="dbnumber" label="数据库编号" label-col-flex="100px" :rules="[{ required: true }]">
          <InputNumber v-model="form.dbnumber" :min="0" placeholder="请输入数据库编号" />
        </FormItem>
        </Col>
        <Col :span="8">
        <FormItem field="command" label="操作类型" label-col-flex="100px" :rules="[{ required: true, message: '请输入操作命令' }]">
          <Input v-model="form.command" placeholder="请输入操作命令" />
        </FormItem>
        </Col>
      </Row>
      <br />
      <Row :gutter="16">
        <Col :span="16">
        <FormItem field="args" label="参数列表" label-col-flex="100px"
          :rules="[{ required: true, message: '请输入自定义参数后，按Enter键' }]" :validate-trigger="['change', 'input']">
          <InputTag v-model="form.args" placeholder="请输入自定义参数后，按Enter键输入下一个参数" allow-clear />
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



