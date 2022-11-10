<script lang="ts" setup>
import { Card, Row, Col, Divider } from '@arco-design/web-vue';
import { GetListDataItem, KeyItem } from '@/api/types';

import PageContainer from '@/components/PageContainer.vue';
import DbTree from './components/DbTree.vue';
import MetaDetail from './components/MetaDetail.vue';

const selectedKeys = ref<string>('');
const conMap = ref<Record<string, GetListDataItem>>({});

const handleSelectKeys = (val: string[]) => {
  selectedKeys.value = val.join('@*@');
};

const handleConMap = (map: Record<string, GetListDataItem>) => {
  conMap.value = map;
};
</script>

<template>
  <PageContainer>
    <Card class="general-card card-container" :bordered="false">
      <template #title>Redis元数据视图</template>

      <Row :wrap="false">
        <Col class="col-height" :span="3">
          <DbTree @handle-selected-keys="handleSelectKeys" @handle-con-map="handleConMap" />
        </Col>

        <Col class="col-height line-center" :span="1">
          <Divider direction="vertical" :style="{ height: '100%' }" />
        </Col>

        <Col class="col-height" :span="20">
          <MetaDetail :selected-keys="selectedKeys" :con-map="conMap"></MetaDetail>
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
