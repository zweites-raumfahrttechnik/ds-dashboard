<script lang="ts" setup>
import {
    Card,
    Divider,
    Table,
    TableColumn,
    Button,
    Row,
    Col,
    Form,
    FormItem,
    Space,
    Input
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useRouter } from 'vue-router';
import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL } from '@/api/url';
import { GetConnectListParams, GetListData } from '@/api/types';
import PageContainer from '@/components/PageContainer.vue';

type SearchParams = GetConnectListParams;
const searchFormRef = ref<FormInstance>();

const searchFormdata = reactive<Pick<SearchParams, 'ip' | 'username' | 'type'>>({
    ip: '',
    username: '',
    type: 4
});

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 15,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<GetListData>>(
    CONNECT_URL,
    { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize, type: 4, ip: '', username: '' } },
    instance,
);

watch(
    () => data.value?.data?.count,
    newVal => {
        pagination.total = newVal;
    },
);
//分页实时请求
watch(
    () => pagination.current,
    () => {
        const params: SearchParams = { pg: pagination.current, size: pagination.pageSize, type: 4, ip: '', username: '' };
        execute({ params });
    },
);

const tableData = computed(() => {
    return data.value?.data?.data;
});
//表单值为空，则get请求参数也为空
const handleSearch = async () => {
    const res = await searchFormRef.value?.validate();
    if (res) {
        return;
    }
    const params: SearchParams = { pg: pagination.current, size: pagination.pageSize };
    if (searchFormdata.ip && searchFormdata.ip !== '') {
        params.ip = searchFormdata.ip;
    } else { params.ip = '' }
    if (searchFormdata.username && searchFormdata.username !== '') {
        params.username = searchFormdata.username;
    } else { params.username = '' }
    if (searchFormdata.type) {
        params.type = 4;
    }
    execute({ params });
};
const handleFromReset = () => {
    searchFormRef.value?.resetFields();
    //非刷新，重新请求数据方法
    // const params: SearchParams = { pg: pagination.current, size: pagination.pageSize, type: 4, ip: '', username: '' };
    // execute({ params });
    router.go(0);
};
const handlePageChange = (page: number) => {
    pagination.current = page;
};
const router = useRouter();
const RedisBasicOP = (uuid: string, ip: string, username: string) => {
    router.push({ name: "RedisBasicOp", query: { uuid: uuid, ip: ip, username: username } })
}
const RedisCustomOP = (uuid: string, ip: string, username: string) => {
    router.push({ name: "RedisCustomOp", query: { uuid: uuid, ip: ip, username: username } })
}
const RedisManage = (uuid: string, ip: string, username: string) => {
    router.push({ name: 'RedisManage', query: { uuid: uuid, ip: ip, username: username } })
};
</script>

<template>
    <PageContainer>
        <Card class="general-card" :bordered="false">
            <template #title>redis数据库连接列表</template>
            <Row>
                <Col :flex="1">
                    <Form ref="searchFormRef" :model="searchFormdata" :label-col-props="{ span: 6 }"
                        :wrapper-col-props="{ span: 18 }" label-align="left">
                        <Row :gutter="16">
                            <Col :span="9">
                                <FormItem field="ip" label="数据库地址" auto-label-width="true" :rules="[
                                { required: true, message: '请输入IP地址' },
                                {
                                    match:
                                        /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/,
                                    message: 'IP地址格式不正确',
                                }]" :hide-asterisk=true>
                                    <Input v-model="searchFormdata.ip" placeholder="请输入数据库地址" />
                                </FormItem>
                            </Col>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Col :span="7">
                                <FormItem field="username" label="用户名" auto-label-width="true">
                                    <Input v-model="searchFormdata.username" placeholder="请输入用户名" />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Divider style="height: 34px" direction="vertical" />
                <Col :flex="'86px'" style="text-align: right">
                    <Space :size="18">
                        <Button type="primary" @click="handleSearch">
                            <template #icon>
                                <IconSearch />
                            </template>
                            搜索
                        </Button>
                        <Button @click="handleFromReset">
                            <template #icon>
                                <IconRefresh />
                            </template>
                            重置
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Divider style="margin-top: 0" />
            <Table row-key="uuid" :bordered="false" :pagination="pagination" :data="tableData" :loading="isLoading"
                @page-change="handlePageChange">
                <template #columns>
                    <TableColumn title="uuid" data-index="uuid" />
                    <TableColumn title="数据库地址" data-index="ip" />
                    <TableColumn title="数据库运行端口" data-index="port" />
                    <TableColumn title="用户名" data-index="username" />
                    <TableColumn title="元数据查询">
                        <template #cell="{ record }">
                            <Button status="success" v-if="record.type === 4"
                                @click="() => RedisManage(record.uuid, record.ip, record.username)">查看</Button>
                        </template>
                    </TableColumn>
                    <TableColumn title="基本操作">
                        <template #cell="{ record }">
                            <Button status="warning"
                                @click="() => RedisBasicOP(record.uuid, record.ip, record.username)">进入</Button>
                        </template>
                    </TableColumn>
                    <TableColumn title="自定义操作">
                        <template #cell="{ record }">
                            <Button status="warning"
                                @click="() => RedisCustomOP(record.uuid, record.ip, record.username)">进入</Button>
                        </template>
                    </TableColumn>
                </template>
            </Table>
        </Card>
    </PageContainer>
</template>
