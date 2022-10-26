<script lang="ts" setup>
import {
    Card,
    Divider,
    Table,
    TableColumn,
} from '@arco-design/web-vue';

import { reactive, ref } from 'vue';
import PageContainer from '@/components/PageContainer.vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { REDIS_KEYS_URL } from '@/api/url';
//引入参数
import { redisKeys, redisgetkeysParams } from '@/api/types';

let route = useRoute();
const uuid = route.query.uuid as string;
const dbnumber = Number(route.query.dbnumber);

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
    },
);
watch(
    () => data.value?.data?.data, newVal => {
        //console.log(data.value?.data?.data.length);
        const a = data.value?.data?.count as number;

        if (data.value?.data?.data.length === data.value?.data?.count) {
            for (var i = 0; i < a; i++) {
                const obj = { key: data.value?.data?.data?.[i] as string };
                tableData.push(obj);
            }
        }
    }
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

const dbcount = computed(() => { return data.value?.data!?.count });

</script>

<template>
    <PageContainer>
        <Card class="general-card" :bordered="false">
            <template #title> 库号为{{ dbnumber }}的redis数据库共{{ dbcount }}个键：</template>
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
