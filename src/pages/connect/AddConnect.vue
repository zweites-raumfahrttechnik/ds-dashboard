<script lang="ts" setup>
import { Spin, Card } from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';

import Form from './components/AddConnectForm.vue';
import Success from './components/AddConnectSuccess.vue';

const step = ref(0);
</script>

<template>
  <PageContainer>
    <Spin>
      <Card>
        <template #title>添加数据库连接</template>

        <div class="wrap">
          <KeepAlive>
            <Form v-if="step === 0" />
            <Success v-else-if="step === 1" />
          </KeepAlive>
        </div>
      </Card>
    </Spin>
  </PageContainer>
</template>

<style lang="less" scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 0;
}
</style>
