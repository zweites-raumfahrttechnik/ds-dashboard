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
  Popconfirm,
  Modal,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import PageContainer from '@/components/PageContainer.vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance } from '@/api';

import {GRANT_USER_URL,REVOKE_USER_URL} from '@/api/url';
//权限授权
const { execute } = useAxios(GRANT_USER_URL, { method: 'POST' }, instance, {
  immediate: false,
});

//权限撤销
const { execute:revokeexcute} = useAxios(REVOKE_USER_URL, { method: 'POST' }, instance, {
  immediate: false,
});

</script>
<template>
  <PageContainer>
    <Card>
      <Table :bordered="{ cell: true }">
        <template #columns>
          <!--添加索引列-->
          <TableColumn type="index" />
          <TableColumn title="uuid" />
          <TableColumn title="用户类型" data-index="type">
            <template #cell="{ record }">
              <span v-if="record.type === 1">MySQL</span>
              <span v-else-if="record.type === 2">达梦数据库</span>
              <span v-else>金仓数据库</span>
            </template>
          </TableColumn>
          <TableColumn title="用户名" />
          <TableColumn title="主机地址" data-index="host" />
          <TableColumn title="数据库名" data-index="password" />
          <TableColumn title="权限"> 
            <template #cell="{record}">
              <Tag v-if="record.type === 1" checkable @check="" color="orange">MySQL</Tag>
              <Tag v-else-if="record.type === 2" checkable @check="" color="green">达梦数据库</Tag>
              <Tag v-else checkable @check="" color="cyan">金仓数据库</Tag>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>
