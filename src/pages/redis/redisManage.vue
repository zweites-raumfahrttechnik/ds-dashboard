<script lang="ts" setup>
import {
  Card,
  Table,
  TableColumn,
  Button,
  Modal,
} from '@arco-design/web-vue';
import { IconSearch,IconRefresh } from '@arco-design/web-vue/es/icon';
import { ComputedRef, reactive, ref } from 'vue';
import PageContainer from '@/components/PageContainer.vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactify  } from '@vueuse/core';
import { instance, ResponseWrap } from '@/api';
import { redisMetaTotal_URL,REDIS_META_SIZE_URL,REDIS_KEYS_URL } from '@/api/url';
//引入参数
import { redisDBtotal,redisDbsize,redisKeys } from '@/api/types';
import { InputNumber } from '@arco-design/web-vue';



const { data, isLoading, execute } = useAxios<ResponseWrap<redisDBtotal>>(
  redisMetaTotal_URL,
  { method: 'GET', params: { uuid:"6df74580-023a-4aa0-ae5f-c134639e618d" } },
  instance,{immediate:true}
);
const { data:dataSize,execute:executeSize } = useAxios<ResponseWrap<redisDbsize>>(
    REDIS_META_SIZE_URL,
    { method: 'GET', params: { uuid:"6df74580-023a-4aa0-ae5f-c134639e618d",dbnumber:4} },
    instance,
);
const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 5,
});
const { data:dataKeys,execute:executeKeys } = useAxios<ResponseWrap<redisKeys>>(
  REDIS_KEYS_URL,
  { method: 'GET', params: { uuid:"6df74580-023a-4aa0-ae5f-c134639e618d",dbnumber:3,
    pg: pagination.current, size: pagination.pageSize} },
  instance,
);
watch([data,dataSize,dataKeys], (value,oldValue)=>{
  const dbtotalNum = computed(() =>{return data.value?.data!?.data});
  const dbcount = computed(() =>{return dataKeys.value?.data!?.count});
  const dbkeys = computed(() =>{return dataKeys.value?.data!?.dbkeys});
  console.log(dbtotalNum.value);
  console.log(dbcount.value);
  console.log(dbkeys.value);
})

// function redisMeta(){
//     const dbtotal:number[] = new Array(dbtotalNum.value);
//     for(var i = 0; i<dbtotal.length; i++) {
//         dbtotal[i] = i;
//     }
    
//     //redisMetaKeys接口，表格索引程序
//     const keyCount:number[] = new Array(dbcount.value);
//     for(var i = 0; i<keyCount.length; i++) {
//           keyCount[i] = i;
//     }
//     for(var i=0;i<dbcount.value;i++){
//       var keysItem={index:keyCount[i],keyName:dbkeys.value[i]};
//       keysData.push(keysItem);
//     }
//     keysData.reverse().pop();
//     keysData.reverse();
//   }

const tableData=reactive([{}]);
tableData.pop();
const keysData=reactive([{}]);
 //浮窗控制
const visibleKeys = ref(false);
const viewDetails = () => {
  visibleKeys.value = true;
};
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
      <Table id="redismetaTable"
        row-key="dbnumber" 
        :data="tableData" 
        :bordered="false"
        :loading="isLoading"
        >
        <template #columns>
          <TableColumn title="数据库编号" data-index="dbnumber"/>
          <TableColumn title="键值对数量" data-index="dbsize" />
          <TableColumn title="详情" >
            <template #cell>
              <Button type="text" @click="viewDetails">查看</Button>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
    <!--对话框-添加用户-->
    <!--显示所有keys键-->
    <Modal v-model:visible="visibleKeys">
      <template #title> {{dbcount}}  keys in total </template>
      <Table id="redismetaKeys" row-key="index" :data="keysData" :bordered="{ cell: true }">
        <template #columns>
          <TableColumn title="序号" data-index="index" />
          <TableColumn title="键名" data-index="keyName" />
        </template>
      </Table>
    </Modal>
  </PageContainer>
</template>

