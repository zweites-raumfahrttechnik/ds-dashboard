<script lang="ts" setup>
import {
  Card,
  Divider,
  Space,
  Switch,
} from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import { ref, watch } from 'vue';
import Form from './components/redisOpForm.vue';
import Success from './components/redisOpSuccess.vue';
import RedisOpJson from './components/redisOpJson.vue';
import CustomForm from './components/redisOpCustomForm.vue';
import CustomSuccess from './components/redisOpCustomSuccess.vue';

const json1 = ref();
const customJson1 = ref();
const getJson = (num: Object) => {
  json1.value = num;
};
const getCustomJson = (num: Object) => {
  customJson1.value = num;
};

const step = ref(0);
const customStep = ref(0);
const changeStep = (idx: number) => {
  step.value = idx;
};
const changeCustomStep = (idx: number) => {
  customStep.value = idx;
};

const disabledCustom = ref(false);
const disabledBasic = ref(false);
</script>

<template>
  <PageContainer>
    <div>
      <Card class="general-card" :bordered="false">
        <Space style="margin-top: 8px;">
          <p>redis基本操作</p>
          <Switch v-model="disabledBasic" />
        </Space>
        <Divider direction="horizontal" type="solid" margin="6px" />
        <div class="wrap" v-if="disabledBasic">
          <KeepAlive>
            <Form v-if="step === 0" @change-step="changeStep" @getChildren="getJson" />
            <Success v-else-if="step === 1" @change-step="changeStep" @get-children="getJson" />
          </KeepAlive>
        </div>
      </Card>
      <Card class="general-card" :bordered="false">
        <Space style="margin-top: 8px;">
          <p>redis自定义操作</p>
          <Switch v-model="disabledCustom" />
        </Space>
        <Divider direction="horizontal" type="solid" margin="6px" />
        <div class="wrap" v-if="disabledCustom">
          <KeepAlive>
            <CustomForm v-if="customStep === 0" @change-step="changeCustomStep" @getChildren="getCustomJson" />
            <CustomSuccess v-else-if="customStep === 1" @change-step="changeCustomStep" @get-children="getCustomJson" />
          </KeepAlive>
        </div>
      </Card>
      <Divider direction="horizontal" type="dashed" margin="10px" />
      <Card class="general-card" :bordered="false">
        <template #title>redis操作结果</template>
        <template #title v-if="disabledBasic">redis数据库基本操作结果</template>
        <template #title v-if="disabledCustom">redis数据库自定义操作结果</template>
        <RedisOpJson :data="json1" v-if="disabledBasic" />
        <RedisOpJson :data="customJson1" v-if="disabledCustom" />
      </Card>
    </div>
  </PageContainer>

</template>

<style lang="less" scoped>
.wrap {
  display: center;
  justify-content: left;
  align-items: center;
  padding-top: 24px;
}

p {
  font-size: medium;
}
</style>
