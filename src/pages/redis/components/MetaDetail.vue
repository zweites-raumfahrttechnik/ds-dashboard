<script lang="ts" setup>
import { Tabs, TabPane, Empty } from '@arco-design/web-vue';
import { GetListDataItem } from '@/api/types';
import BasicOp from './BasicOp.vue';
import CustomOp from './CustomOp.vue';

const props = defineProps<{
  selectedKeys: string;
  conMap: Record<string, GetListDataItem>;
}>();
const activeTab = ref<string>('basic');
</script>

<template>
  <div class="container">
    <Tabs v-model:active-key="activeTab">
      <TabPane key="basic" title="基础操作">
        <Empty v-if="props.selectedKeys.split('@*@').length < 2" :style="{ marginTop: '300px' }" />
        <BasicOp v-else :selected-keys="props.selectedKeys" :con-map="props.conMap" />
      </TabPane>
      <TabPane key="custom" title="自定义操作">
        <Empty v-if="props.selectedKeys.split('@*@').length < 2" :style="{ marginTop: '300px' }" />
        <CustomOp v-else :selected-keys="props.selectedKeys" :con-map="props.conMap" />
      </TabPane>
    </Tabs>
  </div>
</template>

<style lang="less" scoped>
.container {
  padding: 0 10px;
}
</style>
