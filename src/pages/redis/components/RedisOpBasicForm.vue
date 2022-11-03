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
    Space,
} from '@arco-design/web-vue';
import { reactive } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ResponseWrap } from '@/api';
import axios from 'axios';
import { REDIS_OP_URL } from '@/api/url';
import { FormModel } from './types';
//接收RedisOpForm.vue父组件传递过来的参数
interface Props {
    uuid?: string,
    ip?: string,
    username?: string
}
const props = withDefaults(defineProps<Props>(), {
    uuid: '暂无数据',
    ip: '暂无数据',
    username: '暂无数据'
});

const emit = defineEmits<{
    (e: 'change-step', idx: number): void;//页面跳转
    (e: 'getChildren', num: object): void;//响应信息传递（为了显示响应数据）
    (e: 'isright', num: boolean): void;//请求是否成功判定
}>();

const form = reactive<FormModel>({
    uuid: props.uuid,
    dbname: 0,
    action: '',
    keyType: '',
    key: '',
    parameter1: '',
    parameter2: ''
});

//acition为set/get时,string/set/list/zset/hash;  acition为delete/exist时,item/set/list/zset/hash
const isSetGet = computed(() => {
    if (form.action === 'set' || form.action === 'get') {
        return false;
    }
    return true;
});

const isDelExist = computed(() => {
    if (form.action === 'delete' || form.action === 'exist') {
        return false;
    }
    return true;
});

//该示例单独拿出来，是因为用户可能表单填写错误致使后端返回错误数据，
//此处需要拿到返回的错误数据，以提醒用户操作有误
const instance = axios.create({
  baseURL: '/api',
})
const { data, execute, cancel, isLoading } = useAxios<ResponseWrap<FormModel>>(
    REDIS_OP_URL,
    { method: 'POST' },
    instance, {
    immediate: false,
});

const handleSubmit = async () => {
    const res = await formRef.value?.validate();
    if (res) {
        return;
    }
    cancel();
    execute({
        data: {
            ...form,
        },
    }).then(() => {
        formRef.value?.resetFields();
        if(data.value?.code!==0 || data.value?.msg!=='success'){
            emit('isright', true);
        }
        else { emit('isright', false); }
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
            <Row :gutter="20">
                <Col :span="8">
                    <FormItem field="uuid" label="数据库连接uuid" label-col-flex="100px" :disabled="true">
                        <Input v-model="uuid" />
                    </FormItem>
                </Col>
                <Col :span="8">
                    <FormItem field="ip" label="数据库地址" label-col-flex="80px" :disabled="true">
                        <Input v-model="ip" />
                    </FormItem>
                </Col>
                <Col :span="8">
                    <FormItem field="username" label="用户名" label-col-flex="85px" :disabled="true" :label-attrs="{}">
                        <Input v-model="username" />
                    </FormItem>
                </Col>
            </Row><br />
            <Row :gutter="20">
                <Col :span="8">
                    <FormItem field="dbname" label="数据库编号" label-col-flex="100px"
                        :rules="[{ required: true, message: '必填' }, { type: 'number', message: '数据库编号为整型' }]">
                        <InputNumber v-model="form.dbname" :min="0" placeholder="请输入数据库编号" />
                    </FormItem>
                </Col>
                <Col :span="8">
                    <FormItem field="action" label="操作类型" label-col-flex="80px"
                        :rules="[{ required: true, message: '请选择操作类型' }]">
                        <Select v-model="form.action" placeholder="请选择操作类型" allow-search>
                            <Option value="set">set</Option>
                            <Option value="get">get</Option>
                            <Option value="delete">delete</Option>
                            <Option value="exist">exist</Option>
                            <Option value="type">type</Option>
                            <Option value="count">count</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :span="8">
                    <FormItem field="keyType" label="操作值类型" label-col-flex="85px"
                        :rules="[{ required: true, message: '请选择操作值类型' }]">
                        <Select v-model="form.keyType" placeholder="请选择操作值类型" allow-search>
                            <Option value="item" v-if="isSetGet">item</Option>
                            <Option value="string" v-if="isDelExist">string</Option>
                            <Option value="set">set</Option>
                            <Option value="list">list</Option>
                            <Option value="zset">zset</Option>
                            <Option value="hash">hash</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row><br />
            <Row :gutter="20">
                <Col :span="8">
                    <FormItem field="key" label="键名" label-col-flex="100px" :rules="[{ required: true, message: '请输入键名' }]"
                        :validate-trigger="['change', 'input']">
                        <Input v-model="form.key" placeholder="请输入键名" />
                    </FormItem>
                </Col>
                <Col :span="8">
                    <FormItem field="parameter1" label="参数1" label-col-flex="80px">
                        <Input v-model="form.parameter1" placeholder="请输入要设置的参数" />
                    </FormItem>
                </Col>
                <Col :span="8">
                    <FormItem field="parameter2" label="参数2" label-col-flex="85px">
                        <Input v-model="form.parameter2" placeholder="请输入要设置的参数" />
                    </FormItem>
                </Col>
            </Row><br />
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
