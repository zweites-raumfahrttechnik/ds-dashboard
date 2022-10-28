<script lang="ts" setup>
import { Card, Table, TableColumn } from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
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
            <template #cell="{ record }">
              <Tag v-if="record.type === 1" checkable color="orange">MySQL</Tag>
              <Tag v-else-if="record.type === 2" checkable color="green">达梦数据库</Tag>
              <Tag v-else checkable color="cyan">金仓数据库</Tag>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>
