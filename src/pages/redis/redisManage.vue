<script lang="ts" setup>
import {
  Card,
  Form,
  FormItem,
  Row,
  InputNumber,
  Divider,
  Col,
  Space,
  Table,
  TableColumn,
  Button,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageContainer from '@/components/PageContainer.vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { redisMetaTotal_URL, REDIS_META_SIZE_URL, REDIS_KEYS_URL } from '@/api/url';
//引入参数
import { redisDBtotal, redisDbsize, redisKeys, redisgetkeysParams } from '@/api/types';
//接口数据执行
setTimeout(function () {
  //  console.log(dbtotalNum.value);
  //  console.log(dbcount.value);
  //  console.log(dbkeys.value);
  redisMeta();
}, 50)

let route = useRoute();
const uuid = route.query.uuid as string;

const searchFormRef = ref<FormInstance>();
const searchFormdata = reactive({ num: NaN });
const { data, isLoading, execute } = useAxios<ResponseWrap<redisDBtotal>>(
  redisMetaTotal_URL,
  { method: 'GET', params: { uuid: uuid } },
  instance, { immediate: true }
);

const dbtotalNum = computed(() => { return data.value?.data!?.data });

//dbsize
function getdbsize(dbtotal: number[]) {
  for (var i = 0; i < dbtotal.length; i++) {
    const { data: dataSize, execute: executeSize } = useAxios<ResponseWrap<redisDbsize>>(
      REDIS_META_SIZE_URL,
      { method: 'GET', params: { uuid: uuid, dbnumber: dbtotal[i] } },
      instance,
    );
    watch(dataSize, (value, oldValue) => {
      const dbsize = computed(() => { return dataSize.value?.data!?.dbsize });
      //console.log(dbsize.value);
      tablesize.push(dbsize.value);
    })
  }
}


//数据库编号接口与数据库大小接口的数据组织//redisMetaKeys接口，表格索引程序
const tablesize: number[] = new Array(dbtotalNum.value);
tablesize.pop();
function redisMeta() {
  const dbtotal: number[] = new Array(dbtotalNum.value);
  for (var i = 0; i < dbtotal.length; i++) {
    dbtotal[i] = i;
  }
  getdbsize(dbtotal);
  setTimeout(function () {
    //console.log(tablesize);
    for (var i = 0; i < dbtotalNum.value; i++) {
      var dataItem = { dbnumber: dbtotal[i], dbsize: tablesize[i] };
      tableData.push(dataItem);
    }
  }, 600);
}

const tableData = reactive([{}]);
tableData.pop();
const getloading = computed(() => {
  if (Array.prototype.isPrototypeOf(tableData) && tableData.length === 0) {
    return true;
  }
  return false;
});
//详情跳转
const router = useRouter();
const viewDetails = (dbnum: number) => {
  router.push({ name: "redismetaKeys", query: { uuid: uuid, dbnumber: dbnum } })
};
const handleSearch = () => {
  if (searchFormdata.num >= 0) {
    const { data: dataSize, execute: executeSize } = useAxios<ResponseWrap<redisDbsize>>(
      REDIS_META_SIZE_URL,
      { method: 'GET', params: { uuid: uuid, dbnumber: searchFormdata.num } },
      instance,
    );
    const dbsize = computed(() => { return dataSize.value?.data!?.dbsize });
    tableData.splice(1, tableData.length);
    tableData.pop();
    setTimeout(function () {
      tableData.push({ dbnumber: searchFormdata.num, dbsize: dbsize });
    }, 10)
  }
};
const handleFromReset = () => {
  searchFormdata.num = NaN;
  tableData.splice(1, tableData.length);
  tableData.pop();
  setTimeout(function () { redisMeta(); }, 10);
};
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>redis元数据管理</template>
      <Row>
        <Col :flex="1">
        <Form ref="searchFormRef" :model="searchFormdata" :wrapper-col-props="{ span: 18 }" label-align="right">
          <Row :gutter="16">
            <Col :span="11">
            <FormItem field="number" label="数据库编号">
              <InputNumber v-model="searchFormdata.num" :min="0" placeholder="请输入数据库编号" />
            </FormItem>
            </Col>
          </Row>
        </Form>
        </Col>
        <Col :flex="'86px'" style="text-align: left">
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
      <!-- <div>{{data}}</div>
      <div>{{dataSize}}</div>
      <div>{{dataKeys}}</div>
      <div>{{dbtotalNum}}</div>
      <div>{{dbsize}}</div>
      <div>{{dbcount}}</div>
      <div>{{dbkeys}}</div> -->
      <Table id="redismetaTable" row-key="dbnumber" :data="tableData" :bordered="false" :loading="getloading">
        <template #columns>
          <TableColumn title="数据库编号" data-index="dbnumber" />
          <TableColumn title="键值对数量" data-index="dbsize" />
          <TableColumn title="详情">
            <template #cell="{ record }">
              <Button type="text" @click="viewDetails(record.dbnumber)">查看</Button>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>

