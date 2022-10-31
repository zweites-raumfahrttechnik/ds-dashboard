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
    Descriptions
} from '@arco-design/web-vue';
import { reactive } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { REDIS_OP_URL } from '@/api/url';
import { FormModel } from './types';
//const props = defineProps<{ uuid: string }>();

interface Props {
    uuid?: string,
    ip?: string,
    username?: string
}
const props = withDefaults(defineProps<Props>(), {
    uuid: '6df74580-023a-4aa0-ae5f-c134639e618d',
    ip: '41.55.248.156',
    username: 'Larry Williams'
});
//console.log(props.uuid);


const emit = defineEmits<{
    (e: 'change-step', idx: number): void;
    (e: 'getChildren', num: object): void;
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

const { data, execute, isLoading } = useAxios<ResponseWrap<FormModel>>
    (REDIS_OP_URL,
        { method: 'POST' },
        instance, {
        immediate: false,
    });

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
