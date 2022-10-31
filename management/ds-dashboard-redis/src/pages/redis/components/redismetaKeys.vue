<script lang="ts" setup>
import {
    Card,
    Divider,
    Table,
    TableColumn,
    Space,
    Button,
    TypographyTitle,
    Row,
    Col,
    Form,
    Input,
    InputNumber,
    FormItem
} from '@arco-design/web-vue';

import { reactive, ref } from 'vue';
import PageContainer from '@/components/PageContainer.vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { REDIS_KEYS_URL } from '@/api/url';
//引入参数
import { redisKeys, redisgetkeysParams } from '@/api/types';

let route = useRoute();
const router = useRouter();
const uuid = route.query.uuid as string;
const dbnumber = Number(route.query.dbnumber);
const ip = route.query.ip as string;
const username = route.query.username as string;
type SearchParams = redisgetkeysParams;

//请求pagination
const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 10,
});
const { data, execute } = useAxios<ResponseWrap<redisKeys>>(
    REDIS_KEYS_URL,
    {
        method: 'GET', params: {
            uuid: uuid, dbnumber: dbnumber,
            pg: pagination.current, size: pagination.pageSize
        }
    },
    instance,
);

watch(
    () => data.value?.data?.count,
    newVal => {
        pagination.total = newVal;
        pagin.total = newVal;
        pagination.pageSize = newVal as number;
        const params: SearchParams = {
            uuid: uuid, dbnumber: dbnumber,
            pg: pagination.current, size: pagination.pageSize
        };
        execute({ params });
        watch(
            () => data.value?.data?.data, newVal => {
                const a = data.value?.data?.count as number;
                if (data.value?.data?.data.length === data.value?.data?.count) {
                    for (var i = 0; i < a; i++) {
                        const obj = { key: data.value?.data?.data?.[i] as string };
                        tableData.push(obj);
                    }
                }
            }
        );

        watch(() => data.value?.data?.data, newVal => {
            const a = data.value?.data?.count as number;
            if (data.value?.data?.data.length === data.value?.data?.count) {
                for (var i = 0; i < a; i++) {
                    const obj = { key: data.value?.data?.data?.[i] as string };
                    tableData.push(obj);
                }
            }
        });
    },
);

const tableData = reactive([{ key: '' }]);
tableData.pop();
//表格pagination
const pagin = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 10,
});

const handlePageChange = (page: number) => {
    pagin.current = page;
};

const Formdata = reactive({});

</script>

<template>
    <PageContainer>
        <Card class="general-card" :bordered="false">
            <template #title>
                <TypographyTitle :heading="6">
                    数据库详情
                </TypographyTitle>
            </template>
            <template #extra>
                <Space :size="18">
                    <Button status="success" @click="() => { router.go(-1) }" style="width: 185px;">
                        <template #icon>
                            <icon-backward />
                        </template>
                        <template #default> 返回上一级 </template>
                    </Button>
                </Space>
            </template>
            <Row>
                <Col :flex="1">
                <Form ref="searchFormRef" :model="Formdata" :wrapper-col-props="{ span: 18 }" label-align="right">
                    <Row :gutter="16">
                        <Col :span="6">
                        <FormItem field="uuid" label="数据库连接uuid" label-col-flex="100px" :disabled="true">
                            <Input v-model="uuid" />
                        </FormItem>
                        </Col>
                        <Col :span="6">
                        <FormItem field="ip" label="数据库地址" label-col-flex="85px" :disabled="true">
                            <Input v-model="ip" />
                        </FormItem>
                        </Col>
                        <Col :span="6">
                        <FormItem field="username" label="用户名" label-col-flex="85px" :disabled="true" :label-attrs="{}">
                            <Input v-model="username" />
                        </FormItem>
                        </Col>
                        <Col :span="6">
                        <FormItem field="dbnumber" label="数据库编号" label-col-flex="85px" :disabled="true"
                            :label-attrs="{}">
                            <InputNumber v-model="dbnumber" />
                        </FormItem>
                        </Col>
                    </Row>
                </Form>
                </Col>
            </Row>
            <Divider style="margin-top: 0" />
            <Table id="redismetaKeys" row-key="key" :data="tableData" :bordered="{ cell: true }" :pagination="pagin"
                @page-change="handlePageChange">
                <template #columns>
                    <TableColumn title="键名" data-index="key" />
                </template>
            </Table>
        </Card>
    </PageContainer>
</template>
