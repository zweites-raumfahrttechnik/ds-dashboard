<script lang="ts" setup>
import { Card } from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';

import FormInquery from './component/relationInquery.vue';
import Success from './component/relationInquerySuccess.vue';
//step数值为0
const step = ref(0);

const changeStep = (idx: number) => {
  step.value = idx;
};
</script>

<template>
  <PageContainer>
    <template #title>添加数据库连接</template>
    <div>
      <KeepAlive>
        <FormInquery v-if="step === 0" @change-step="changeStep" />
        <Success v-else-if="step === 1" @change-step="changeStep" />
      </KeepAlive>
    </div>
  </PageContainer>
</template>

<style lang="less" scoped>
</style>
