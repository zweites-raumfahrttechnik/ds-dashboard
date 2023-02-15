<script setup lang="ts">
import { Card, Row, Col, Divider } from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import { useVisibleTableProvideStore, useListProvideStore, useModalProvideStore } from './hooks';
import UserSearchList from './components/UserSearchList.vue';
import UserListTable from './components/UserListTable.vue';
import ModifyModal from './components/ModifyModal.vue';
useVisibleTableProvideStore();
useListProvideStore();
useModalProvideStore();
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>用户可见性可删性管理</template>

      <UserSearchList />

      <Divider style="margin-top: 0" />

      <Row>
        <Col :span="24">
          <UserListTable />
        </Col>
      </Row>
    </Card>

    <ModifyModal />
  </PageContainer>
</template>
