<script lang="ts" setup>
import {
        Form,
        FormItem,
        Row,
        Col,
        Input,
        InputNumber,
        Select,
        Option,
        Button,
        Space
} from '@arco-design/web-vue';
import { reactive } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance,ResponseWrap } from '@/api';
import { REDIS_OP_URL } from '@/api/url';
import { FormModel, defaultFromValue } from './types';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
  (e: 'getChildren', num: object): void;
}>();

const form = reactive<FormModel>({
  ...defaultFromValue[0],
  type: 0,
});
//acition为set/get时,string/set/list/zset/hash;  acition为delete/exist时,item/set/list/zset/hash
const isSetGet = computed(() => {
  if (form.action === 'set' || form.action === 'get' ) {
    return false;
  }
  return true;
});

const isDelExist = computed(() => {
  if (form.action === 'delete' || form.action === 'exist' ) {
    return false;
  }
  return true;
});

const { data,execute, isLoading } = useAxios<ResponseWrap<FormModel>>
    (REDIS_OP_URL,
     { method: 'get' }, 
     instance, {
     immediate: false,
});

// 更新默认值(用于声明在数据更改时调用的侦听回调。)
watch(
  () => form.type,
  newVal => {
    const defaultVal = defaultFromValue[newVal];
    Object.keys(defaultVal).forEach(k => {
      form[k] = defaultVal[k];
    });
  },
);

// const json1={
//         库:'1,2,3,4,5,6,7,8,9',
//         number:10,
//         1:{hello:'redisOp操作',halou:'redisManagement'},
//         2:{zhuxian:'gujian',qingyun:'dazhufeng'}
// }

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
    emit('getChildren',data.value.data);
  });
};
const formRef = ref<FormInstance>();
</script>

<template>
    <div>
    <Form  ref="formRef" :model="form"  @submit="handleSubmit" >
        <Row :gutter="16">
            <Col :span="8">
                <FormItem field="dbname" label="数据库编号" label-col-flex="100px" 
                :rules="[{required:true,message:'name is required'},{type:'number',message:'must be a number'}]"
                :validate-trigger="['change','input']">
                    <InputNumber v-model="form.dbname" :min="0" placeholder="please enter..." /> 
                </FormItem>
            </Col>
            <Col :span="8">
                <FormItem field="action" label="操作类型" label-col-flex="80px"
                :rules="[{required:true,message:'action is required to select'}]">
                    <Select v-model="form.action" placeholder="please select ..." allow-search>
                        <Option :value="set">set</Option>
                        <Option :value="get">get</Option>
                        <Option :value="delete">delete</Option>
                        <Option :value="exist">exist</Option>
                        <Option :value="type">type</Option>
                        <Option :value="count">count</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col :span="8">
                <FormItem field="keyType" label="操作值类型" label-col-flex="80px"
                :rules="[{required:true,message:'keyType is required to select'}]">
                    <Select v-model="form.keyType" placeholder="please select ..." allow-search>
                        <Option :value="item" v-if="isSetGet">item</Option>
                        <Option :value="string" v-if="isDelExist">string</Option>
                        <Option :value="set">set</Option>
                        <Option :value="list">list</Option>
                        <Option :value="zset">zset</Option>
                        <Option :value="hash">hash</Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <Row :gutter="16">
            <Col :span="8">
                <FormItem field="key" label="键名" label-col-flex="100px"
                :rules="[{required:true,message:'key is required'}]" :validate-trigger="['change','input']">
                    <Input v-model="form.key" placeholder="please enter..." />
                </FormItem>
            </Col>
            <Col :span="8">
                <FormItem field="parameter1" label="参数1" label-col-flex="80px" 
                :rules="[{required:true,message:'parameter is required'}]"
                :validate-trigger="['change','input']">
                    <Input v-model="form.parameter1" placeholder="please enter..." /> 
                </FormItem>
            </Col>
            <Col :span="8">
                <FormItem field="parameter2" label="参数2" label-col-flex="80px">
                    <Input v-model="form.parameter2" placeholder="please enter..." />
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
