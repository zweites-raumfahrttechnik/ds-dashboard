<script lang="ts" setup>
import {
  Card,
  Table,
  TableColumn,
  Button,
  Modal,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import PageContainer from '@/components/PageContainer.vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { redisMetaTotal_URL,REDIS_META_SIZE_URL,REDIS_KEYS_URL } from '@/api/url';
//引入参数
import { redisDBtotal,redisDbsize,redisKeys,redisgetkeysParams } from '@/api/types';
//接口数据执行
setTimeout(function(){
//  console.log(dbtotalNum.value);
//  console.log(dbcount.value);
//  console.log(dbkeys.value);
 redisMeta();
},500)
type SearchParams = redisgetkeysParams;
const { data, isLoading, execute } = useAxios<ResponseWrap<redisDBtotal>>(
  redisMetaTotal_URL,
  { method: 'GET', params: { uuid:"6df74580-023a-4aa0-ae5f-c134639e618d" } },
  instance,{immediate:true}
);
const dbtotalNum = computed(() =>{return data.value?.data!?.data});

//dbsize
function getdbsize(dbtotal:number[]){
  for(var i=0;i<dbtotal.length;i++){
    const { data:dataSize,execute:executeSize } = useAxios<ResponseWrap<redisDbsize>>(
      REDIS_META_SIZE_URL,
      { method: 'GET', params: { uuid:"6df74580-023a-4aa0-ae5f-c134639e618d",dbnumber:dbtotal[i]} },
      instance,
    );
    watch(dataSize,(value,oldValue)=>{
      const dbsize = computed(() =>{return dataSize.value?.data!?.dbsize});
      //console.log(dbsize.value);
      tablesize.push(dbsize.value);
    })
  }
}

//get keysdetail interface
const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 5,
});
const { data:dataKeys,execute:executeKeys } = useAxios<ResponseWrap<redisKeys>>(
  REDIS_KEYS_URL,
  { method: 'GET'},
  instance,
);
watch(
  () => dataKeys.value?.data?.count,
  newVal => {
    pagination.total = newVal;
    //console.log("keys键个数即浮窗页面所有信息条目数:",pagination.total)
  },
);
// const dbkey=reactive<{key?:string[]}>({});
// watch(
//   () => dataKeys.value?.data?.dbkeys,
//   newVal => {
//     dbkey.key = newVal;
//     //console.log("keys详情:",dbkey.key)
//   },
// );

const handlePageChange = (page: number) => {
  pagination.current = page;
};
const dbcount = computed(() =>{return dataKeys.value?.data!?.count});
const dbkeys = computed(() =>{return dataKeys.value?.data!?.dbkeys});

//浮窗中的keys详情展示的数据组织
const keysData=reactive([{}]);
keysData.pop();
function keysDetail(){
  const keyCount:number[] = new Array(dbcount.value);
  for(var i = 0; i<keyCount.length; i++) {
        keyCount[i] = i;
  }
  for(var i=0;i<dbcount.value;i++){
    var keysItem={index:keyCount[i],keyName:dbkeys.value[i]};
    keysData.push(keysItem);
  }
}


//数据库编号接口与数据库大小接口的数据组织//redisMetaKeys接口，表格索引程序
const tablesize:number[] = new Array(dbtotalNum.value);
tablesize.pop();
function redisMeta(){
  const dbtotal:number[] = new Array(dbtotalNum.value);
  for(var i = 0; i<dbtotal.length; i++) {
      dbtotal[i] = i;
  }
  getdbsize(dbtotal);
  setTimeout(function(){
    //console.log(tablesize);
    for(var i=0;i<dbtotalNum.value;i++){
      var dataItem={ dbnumber:dbtotal[i],dbsize:tablesize[i]};
      tableData.push(dataItem);
    }
  },500);
}

const tableData=reactive([{}]);
tableData.pop();
const getloading = computed(() => {
  if (Array.prototype.isPrototypeOf(tableData) && tableData.length === 0) {
    return true;
  }
  return false;
});
const getdetailloading = computed(() => {
  if (Array.prototype.isPrototypeOf(keysData) && keysData.length === 0) {
    return true;
  }
  return false;
});

//浮窗控制及显示
const visibleKeys = ref(false);
const viewDetails = (dbnumber:number) => {
  const params: SearchParams =
     { uuid:"6df74580-023a-4aa0-ae5f-c134639e618d",dbnumber:dbnumber,pg: pagination.current, size: pagination.pageSize };
  executeKeys({ params });
  setTimeout(function(){keysDetail();},500);
  visibleKeys.value = true;
};
const handleOk = () => {
  visibleKeys.value = false;
};
const handleCancel = () => {
  visibleKeys.value = false;
}
</script>

<template>
  <PageContainer>
    <Card>
      <template #title>redis元数据管理</template>
      <!-- <div>{{data}}</div>
      <div>{{dataSize}}</div>
      <div>{{dataKeys}}</div>
      <div>{{dbtotalNum}}</div>
      <div>{{dbsize}}</div>
      <div>{{dbcount}}</div>
      <div>{{dbkeys}}</div> -->
      <Table id="redismetaTable" row-key="dbnumber" :data="tableData" :bordered="false"
      :loading="getloading">
        <template #columns>
          <TableColumn title="数据库编号" data-index="dbnumber"/>
          <TableColumn title="键值对数量" data-index="dbsize" />
          <TableColumn title="详情">
            <template #cell="{ record }">
              <Button  status="success" @click="viewDetails(record.dbnumber)">查看</Button>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
    <!--对话框-添加用户-->
    <!--显示所有keys键-->
    <Modal v-model:visible="visibleKeys" @ok="handleOk" @cancel="handleCancel">
      <template #title> {{dbcount}}  keys in total </template>
      <Table id="redismetaKeys" row-key="index" :data="keysData" :bordered="{ cell: true }"
      :pagination="pagination"
      :loading="getdetailloading"
      @page-change="handlePageChange">
        <template #columns>
          <TableColumn title="序号" data-index="index" />
          <TableColumn title="键名" data-index="keyName" />
        </template>
      </Table>
    </Modal>
  </PageContainer>
</template>

