<script lang="ts" setup>
import { Card,
         Select,
         Option,
         Row,
         Col,
         Button
         
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';

import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon';
import PageContainer from '@/components/PageContainer.vue';
import { ref, watch } from 'vue';
import Form from './components/redisOpForm.vue';
import Success from './components/redisOpSuccess.vue';

const step =ref(0);
const changeStep = (idx: number) => {
  step.value = idx;
};
const value = ref();
const message = ref();
const checked = ref(true);

const searchFormRef = ref<FormInstance>();
const data = [{
      value: 'beijing',
      label: 'Beijing',
      other: 'extra'
    }, {
      value: 'shanghai',
      label: 'Shanghai',
      other: 'extra'
    }, {
      value: 'guangzhou',
      label: 'Guangzhou',
      other: 'extra'
    }, {
      value: 'chengdu',
      label: 'Chengdu',
      other: 'extra'
    }]

</script>

<template>
  <PageContainer>
    <div>
      <Card class="general-card" :bordered="false">
        <template #title>redis自定义操作</template>
        <!-- <div>Select Value: {{ value }}</div><br >
        <Select v-model="value" :style="{width:'320px'}" placeholder="Please select ...">
          <Option v-for="item of data" :value="item" :label="item.label" />
        </Select> -->
        <div class="wrap">
          <KeepAlive>
            <Form v-if="step === 0" @change-step="changeStep" />
            <Success v-else-if="step === 1" @change-step="changeStep" />
          </KeepAlive>
        </div>
          
      </Card>

      
    </div>
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
