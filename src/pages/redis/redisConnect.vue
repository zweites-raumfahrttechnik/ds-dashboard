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

//请求数据的pg、size参数
const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 15,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<GetListData>>(
    CONNECT_URL,
    { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize, type: 4,ip:'',username:'' } },
    instance,
);

watch(
    () => data.value?.data?.count,
    newVal => {
        pagination.total = newVal;
    },
);

watch(
    () => pagination.current,
    () => {
        const params: SearchParams = { pg: pagination.current, size: pagination.pageSize, type: 4,ip:'',username:''};
        execute({ params });
    },
);
const tableData = computed(() => {
    return data.value?.data?.data;
});

const handleSearch = () => {
  const params: SearchParams = { pg: pagination.current, size: pagination.pageSize };
  if (searchFormdata.ip && searchFormdata.ip !== '') {
    params.ip = searchFormdata.ip;
  }
  if (searchFormdata.username && searchFormdata.username !== '') {
    params.username = searchFormdata.username;
  }
  if (searchFormdata.type) {
    params.type = 4;
  }
  execute({ params });
};

const handleFromReset = () => {
  searchFormRef.value?.resetFields();
};

const handlePageChange = (page: number) => {
    pagination.current = page;
};

const router = useRouter();
const redisbasicOP = (uuid: string) => {
    router.push({ name: "redisbasicOp", query: { uuid: uuid } })
}
const rediscustomOP = (uuid: string) => {
    router.push({ name: "rediscustomOp", query: { uuid: uuid } })
}
const redisMANAGE = (uuid: string) => {
    router.push({ name: 'redisManagement', query: { uuid: uuid } })
};
</script>

<template>
    <PageContainer>
        <Card class="general-card" :bordered="false">
            <template #title>redis数据库连接列表</template>
            <Row>
                <Col :flex="1">
                <Form
                    ref="searchFormRef"
                    :model="searchFormdata"
                    :label-col-props="{ span: 6 }"
                    :wrapper-col-props="{ span: 18 }"
                    label-align="left"
                >
                    <Row :gutter="16">
                    <Col :span="9">
                        <FormItem field="ip" label="数据库地址">
                        <Input v-model="searchFormdata.ip" placeholder="请输入数据库地址" />
                        </FormItem>
                    </Col>
                    <Col :span="10">
                        <FormItem field="username" label="Root用户名">
                        <Input v-model="searchFormdata.username" placeholder="请输入Root用户名" />
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
                    <TableColumn title="Redis元数据管理">
                        <template #cell="{ record }">
                            <Button type="text" v-if="record.type === 4"
                                @click="() => redisMANAGE(record.uuid)">进入</Button>
                        </template>
                    </TableColumn>
                    <TableColumn title="Redis基本操作">
                        <template #cell="{ record }">
                            <Button type="text" @click="() => redisbasicOP(record.uuid)">进入</Button>
                        </template>
                    </TableColumn>
                    <TableColumn title="Redis自定义操作">
                        <template #cell="{ record }">
                            <Button type="text" status="normal" @click="() => rediscustomOP(record.uuid)">进入</Button>
                        </template>
                    </TableColumn>
                </template>
            </Table>
        </Card>
    </PageContainer>
</template>
