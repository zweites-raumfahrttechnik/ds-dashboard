<script lang="ts" setup>
import {
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Select,
  Space,
  Option,
  Divider,
  Table,
  TableColumn,
  Button,
  Modal,
} from '@arco-design/web-vue';
import { IconSearch,IconRefresh } from '@arco-design/web-vue/es/icon';
import { reactive, ref } from 'vue';
import PageContainer from '@/components/PageContainer.vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactify  } from '@vueuse/core';
import { instance, ResponseWrap } from '@/api';
import { redisMetaTotal_URL,REDIS_META_SIZE_URL,REDIS_KEYS_URL } from '@/api/url';
//引入参数
import { redisDBtotal,redisDbsize,redisKeys } from '@/api/types';
import { InputNumber } from '@arco-design/web-vue';



//浮窗控制
const visibleKeys = ref(false);

const viewDetails = () => {
  visibleKeys.value = true;
};

const dbtotalNum=10;
const dbtotal:number[] = new Array(dbtotalNum);
for(var i = 0; i<dbtotal.length; i++) {
    dbtotal[i] = i;
}
const dbSize=6;//暂时写死
const tableData=reactive([{}]);
for(var i=0;i<dbtotalNum;i++){
  var dataItem={ dbnumber:dbtotal[i],dbsize:dbSize};
  tableData.push(dataItem);
}
tableData.reverse().pop();
tableData.reverse();


//redisMetaKeys接口，表格索引程序
const count=6;
const keyCount:number[] = new Array(count);
for(var i = 0; i<keyCount.length; i++) {
       keyCount[i] = i;
}
const keysName=['set','list','zset','hash','string','zhuxian'];
const keysData=reactive([{}]);
for(var i=0;i<count;i++){
   var keysItem={index:keyCount[i],keyName:keysName[i]};
   keysData.push(keysItem);
}
keysData.reverse().pop();
keysData.reverse();
</script>
<template>
  <PageContainer>
    <Card>
      <template #title>redis元数据管理</template>
      <Table id="redismetaTable" row-key="dbnumber" :data="tableData" :bordered="{ cell: true }">
        <template #columns>
          <TableColumn title="数据库编号" data-index="dbnumber"/>
          <TableColumn title="键值对数量" data-index="dbsize" />
          <TableColumn title="详情">
            <template #cell>
              <Button status="success" @click="viewDetails">查看</Button>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
    <!--对话框-添加用户-->
    <!--显示所有keys键-->
    <Modal v-model:visible="visibleKeys">
      <template #title> {{count}}  keys in total </template>
      <Table id="redismetaKeys" row-key="index" :data="keysData" :bordered="{ cell: true }" :pagination="keyspagination">
        <template #columns>
          <TableColumn title="序号" data-index="index" />
          <TableColumn title="键名" data-index="keyName" />
        </template>
      </Table>
    </Modal>
  </PageContainer>
</template>

