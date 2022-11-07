<script lang="ts" setup>
import { Card, Row, Col, Divider } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import DbTree from './components/DbTree.vue';
import MetaDetails from './components/MetaDetail.vue';

import { GetListDataItem } from '@/api/types';

const selectedKeys = ref<string>('');
const conMap = ref<Record<string, GetListDataItem>>({});

const getSelectedKeys = (val: string) => {
  selectedKeys.value = val;
};

const getConMap = (val: Record<string, GetListDataItem>) => {
  conMap.value = val;
};
</script>

<template>
  <PageContainer>
    <Card class="general-card card-container" :bordered="false">
      <template #title>关系型数据库</template>

      <Row :wrap="false">
        <Col class="col-height" :span="3">
          <DbTree @get-selected-keys="getSelectedKeys" @get-con-map="getConMap" />
        </Col>

        <Col class="col-height line-center" :span="1">
          <Divider direction="vertical" :style="{ height: '100%' }" />
        </Col>

        <Col class="col-height" :span="20">
          <MetaDetails :selected-keys="selectedKeys" :con-map="conMap" />
        </Col>
      </Row>
    </Card>
  </PageContainer>
</template>

<style lang="less" scoped>
.card-container {
  height: 100%;
  flex: 1;

  .col-height {
    height: 750px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #ecf0f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #bdc3c7;
    }
  }

  .line-center {
    display: flex;
    justify-content: center;
  }

  :deep(.arco-card-body) {
    position: relative;
  }
}
</style>
