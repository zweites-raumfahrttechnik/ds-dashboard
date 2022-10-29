<script lang="ts" setup>
import { Card, Split } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import DbTree from './components/DbTree.vue';
import CollectionDetail from './components/CollectionDetail.vue';

const splitSize = ref<number>(0.15);

const selectedKeys = ref<string[]>([]);
</script>

<template>
  <PageContainer>
    <Card class="general-card card-container" :bordered="false">
      <template #title>MongoDB元数据视图</template>

      <Split
        v-model:size="splitSize"
        min="0.15"
        :style="{
          height: '750px',
          width: '100%',
          minWidth: '500px',
        }"
      >
        <template #first>
          <DbTree v-model:selected-keys="selectedKeys" />
        </template>

        <template #second>
          <CollectionDetail :selected-keys="selectedKeys" />
        </template>
      </Split>
    </Card>
  </PageContainer>
</template>

<style lang="less" scoped>
.card-container {
  height: 100%;
  flex: 1;

  :deep(.arco-card-body) {
    position: relative;
  }
}
</style>
