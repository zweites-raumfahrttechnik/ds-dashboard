<script lang="ts" setup>
import {
  Card,
  Form,
  FormItem,
  Row,
  Divider,
  Col,
  Space,
  Table,
  TableColumn,
  Button,
  Input,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageContainer from '@/components/PageContainer.vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { redisMetaTotal_URL, REDIS_META_SIZE_URL } from '@/api/url';
//引入参数

let route = useRoute();
const uuid = route.query.uuid as string;
const ip = route.query.ip as string;
const username = route.query.username as string;
const searchFormRef = ref<FormInstance>();
const searchFormdata = reactive({ num: NaN });
const { data, isLoading, execute } = useAxios<ResponseWrap<string>>(
  redisMetaTotal_URL,
  { method: 'GET', params: { uuid: uuid } },
  instance, { immediate: true }
);
let dbtotalNum: number = 0;

//dbsize
const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 10,
});

const { data: dataSize,isLoading:sizeloading, execute: executeSize } = useAxios<ResponseWrap<Number[]>>(
  REDIS_META_SIZE_URL,
  { method: 'GET',params: { uuid: uuid,dbnumber:-1,pg:pagination.current,size:pagination.pageSize } },
  instance,
);

const tableData = computed(()=>{
  return dataSize.value?.data?.map((val,index)=>{
    return {dbnumber:index+(pagination.current-1)*pagination.pageSize,dbsize:val}
  })
})

watch(()=>data.value?.data,newVal=>{
  dbtotalNum=Number(newVal);
  pagination.total=Number(newVal);
  //console.log(dbtotalNum,pagination.total);
})

watch(
  () => pagination.current,
  () => {
    const params = {uuid:uuid,dbnumber:-1, pg: pagination.current, size: pagination.pageSize };
    executeSize({ params });
  },
);


//详情跳转
const router = useRouter();
const viewDetails = (dbnum: number) => {
  router.push({ name: "redismetaKeys", query: { uuid: uuid, dbnumber: dbnum, ip: ip, username: username } })
};

const handlePageChange = (page: number) => {
  pagination.current = page;
};
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>redis元数据查询</template>
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
      <!-- <Divider style="margin-top: 0" /> -->
      <br />
      <Row>
        <Col :flex="1">
        <Form ref="searchFormRef" :model="searchFormdata" :wrapper-col-props="{ span: 18 }" label-align="right">
          <Row :gutter="16">
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
          </Row>
        </Form>
        </Col>
      </Row>
      <Divider style="margin-top: 0" />
      <Table id="redismetaTable" row-key="dbnumber" :data="tableData" :bordered="{ wrapper: true, cell: true }"
        :loading="isLoading"
        :pagination="pagination"
        @page-change="handlePageChange">
        <template #columns>
          <TableColumn title="数据库编号" data-index="dbnumber" >
            
          </TableColumn>
          <TableColumn title="键值对数量" data-index="dbsize" />
          <TableColumn title="详情">
            <template #cell="{ record }">
              <Button status="warning" @click="viewDetails(record.dbnumber)">查看</Button>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>
