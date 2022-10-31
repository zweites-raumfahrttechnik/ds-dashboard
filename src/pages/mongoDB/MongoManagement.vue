<script lang="ts" setup>
import { Card, Row, Col, Divider } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import DbTree from './components/DbTree.vue';
import CollectionDetail from './components/CollectionDetail.vue';

const selectedKeys = ref<string[]>([]);
</script>

<template>
  <PageContainer>
    <Card class="general-card card-container" :bordered="false">
      <template #title>MongoDB元数据视图</template>

      <Row :wrap="false">
        <Col class="col-height" :span="3">
          <DbTree v-model:selected-keys="selectedKeys" />
        </Col>

        <Col class="col-height line-center" :span="1">
          <Divider direction="vertical" :style="{ height: '100%' }" />
        </Col>

        <Col class="col-height" :span="20">
          <CollectionDetail :selected-keys="selectedKeys" />
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
