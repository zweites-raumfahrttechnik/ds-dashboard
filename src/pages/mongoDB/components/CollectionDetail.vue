<script setup lang="ts">
import { Tabs, TabPane, Empty } from '@arco-design/web-vue';
import DocumentContent from './DocumentContent.vue';
import IndexContent from './IndexContent.vue';

const props = defineProps<{ selectedKeys: string[] }>();
</script>

<template>
  <div class="container">
    <Tabs>
      <TabPane key="doc" title="文档信息">
        <Empty v-if="props.selectedKeys.length !== 3" :style="{ paddingTop: '200px' }" />
        <DocumentContent v-else :selected-keys="props.selectedKeys" />
      </TabPane>
      <TabPane key="index" title="索引信息">
        <Empty v-if="props.selectedKeys.length !== 3" :style="{ paddingTop: '200px' }" />
        <IndexContent v-else :selected-keys="props.selectedKeys" />
      </TabPane>
    </Tabs>
  </div>
</template>

<style lang="less" scoped>
.container {
  padding: 0 10px;
}
</style>
