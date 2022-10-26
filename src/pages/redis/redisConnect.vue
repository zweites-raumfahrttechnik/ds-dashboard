<script lang="ts" setup>
import {
    Card,
    Divider,
    Table,
    TableColumn,
    Button,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useRouter } from 'vue-router';
import { instance, ResponseWrap } from '@/api';
import { CONNECT_URL } from '@/api/url';
import { GetConnectListParams, GetListData } from '@/api/types';
import PageContainer from '@/components/PageContainer.vue';

type SearchParams = GetConnectListParams;

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
    { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize, type: 4 } },
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
        const params: SearchParams = { pg: pagination.current, size: pagination.pageSize, type: 4 };
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
    },
);
const tableData = computed(() => {
    return data.value?.data?.data;
});

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

            <Divider style="margin-top: 0" />

            <Table row-key="uuid" :bordered="false" :pagination="pagination" :data="tableData" :loading="isLoading"
                @page-change="handlePageChange">
                <template #columns>
                    <!-- <TableColumn title="数据库地址" data-index="ip" />
                    <TableColumn title="数据库运行端口" data-index="port" /> -->
                    <TableColumn title="uuid" data-index="uuid" />
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
