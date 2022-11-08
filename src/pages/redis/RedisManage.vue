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
  instance,
  { immediate: true },
);
const dbtotalNum = ref<number>(0);
watch(
  () => data.value?.data,
  newVal => {
    dbtotalNum.value = Number(newVal);
  },
);

//dbsize
const tablesize = ref<Array<number>>(new Array(dbtotalNum.value));

const { data: dataSize } = useAxios<ResponseWrap<number>>(
  REDIS_META_SIZE_URL,
  { method: 'GET' },
  instance,
);
watch(dataSize, () => {
  tablesize.value.push(dataSize.value?.data as number);
});
tablesize.value.pop();
function getdbsize(dbtotal: number[]) {
  for (var i = 0; i < dbtotal.length; i++) {
    const { data: dataSize } = useAxios<ResponseWrap<number>>(
      REDIS_META_SIZE_URL,
      { method: 'GET', params: { uuid: uuid, dbnumber: dbtotal[i] } },
      instance,
    );
    watch(dataSize, () => {
      const dbsize = computed(() => {
        return dataSize.value?.data;
      });
      tablesize.value.push(dbsize.value as number);
    });
  }
}

//数据库编号接口与数据库大小接口的数据组织//redisMetaKeys接口，表格索引程序
function redisMeta() {
  const dbtotal = ref<Array<number>>(new Array(dbtotalNum.value));
  for (var i = 0; i < dbtotalNum.value; i++) {
    dbtotal.value[i] = i;
  }
  getdbsize(dbtotal.value);
  setTimeout(function () {
    for (var i = 0; i < dbtotalNum.value; i++) {
      var dataItem = { dbnumber: dbtotal.value[i], dbsize: tablesize.value[i] };
      tableData.push(dataItem);
    }
  }, 1002);
}
const tableData = reactive([{}]);
tableData.pop();

//接口数据执行
setTimeout(function () {
  redisMeta();
}, 5);
// const getloading = computed(() => {
//   if (Array.prototype.isPrototypeOf(tableData) && tableData.length === 0) {
//     return true;
//   }
//   return false;
// });
const getloading = ref();
function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}
if (Object.prototype.isPrototypeOf.call(tableData, Array) && tableData.length === 0) {
  getloading.value = true;
  sleep(1100).then(() => {
    getloading.value = false;
  });
} else {
  getloading.value = true;
}
//详情跳转
const router = useRouter();
const viewDetails = (dbnum: number) => {
  router.push({
    name: 'redismetaKeys',
    query: { uuid: uuid, dbnumber: dbnum, ip: ip, username: username },
  });
};
const handleSearch = () => {
  if (searchFormdata.num >= 0 && searchFormdata.num < dbtotalNum.value) {
    const { data: dataSize } = useAxios<ResponseWrap<number>>(
      REDIS_META_SIZE_URL,
      { method: 'GET', params: { uuid: uuid, dbnumber: searchFormdata.num } },
      instance,
    );
    const dbsize = computed(() => {
      return dataSize.value?.data;
    });
    tableData.splice(1, tableData.length);
    tableData.pop();
    setTimeout(function () {
      tableData.push({ dbnumber: searchFormdata.num, dbsize: dbsize });
    }, 10);
  }
};
const handleFromReset = () => {
  searchFormdata.num = NaN;
  tableData.splice(1, tableData.length);
  tableData.pop();
  setTimeout(function () {
    redisMeta();
  }, 10);
};
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>redis元数据查询</template>
      <template #extra>
        <Space :size="18">
          <Button
            status="success"
            style="width: 185px"
            @click="
              () => {
                router.go(-1);
              }
            "
          >
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
          <Form
            ref="searchFormRef"
            :model="searchFormdata"
            :wrapper-col-props="{ span: 18 }"
            label-align="right"
          >
            <Row :gutter="16">
              <Col :span="8">
                <FormItem
                  field="uuid"
                  label="数据库连接uuid"
                  label-col-flex="100px"
                  :disabled="true"
                >
                  <Input v-model="uuid" />
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem field="ip" label="数据库地址" label-col-flex="80px" :disabled="true">
                  <Input v-model="ip" />
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem
                  field="username"
                  label="用户名"
                  label-col-flex="85px"
                  :disabled="true"
                  :label-attrs="{}"
                >
                  <Input v-model="username" />
                </FormItem>
              </Col>
            </Row>
            <!-- <Row :gutter="16">
            <Col :span="14">
            <FormItem field="number" label="数据库编号">
              <InputNumber v-model="searchFormdata.num" :min="0" placeholder="请输入数据库编号" style="width:195px ;" />
            </FormItem>
            </Col>
          </Row> -->
          </Form>
        </Col>
        <!-- <Divider style="height: 34px" direction="vertical" />
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
        </Col> -->
      </Row>
      <Divider style="margin-top: 0" />
      <Table
        id="redismetaTable"
        row-key="dbnumber"
        :data="tableData"
        :bordered="{ wrapper: true, cell: true }"
        :loading="getloading"
      >
        <template #columns>
          <!-- <TableColumn title="数据库连接uuid" :body-cell-style="{ color: 'grey' }">
            <template #cell="{ record }">
              {{ uuid }}
            </template>
          </TableColumn>
          <TableColumn title="数据库地址" :body-cell-style="{ color: 'grey' }">
            <template #cell="{ record }">
              {{ ip }}
            </template>
          </TableColumn>
          <TableColumn title="用户名" :body-cell-style="{ color: 'grey' }">
            <template #cell="{ record }">
              {{ username }}
            </template>
          </TableColumn> -->
          <TableColumn title="数据库编号" data-index="dbnumber" />
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
