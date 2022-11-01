<script lang="ts" setup>
import { Card, Divider, Space, Button } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import Form from './components/RedisOpForm.vue';
import Success from './components/RedisOpSuccess.vue';
import RedisOpJson from './components/RedisOpJson.vue';

const route = useRoute();
const router = useRouter();

const step = ref(0);

const uuid = route.query.uuid as string;
const ip = route.query.ip as string;
const username = route.query.username as string;

const json1 = ref<Record<string, unknown>>({});

const getJson = (num: Record<string, unknown>) => {
  json1.value = num;
};

const changeStep = (idx: number) => {
  step.value = idx;
};
</script>

<template>
  <PageContainer>
    <div>
      <Card class="general-card" :bordered="false">
        <template #title>redis基本操作</template>
        <template #extra>
          <Space :size="18">
            <Button
              status="success"
              style="width: 185px"
              @click="
                () => {
                  router.go(-1);
                }
              "
            >
              <template #icon>
                <icon-backward />
              </template>
              <template #default> 返回上一级 </template>
            </Button>
          </Space>
        </template>

        <div class="wrap">
          <KeepAlive>
            <Form
              v-if="step === 0"
              :uuid="uuid"
              :ip="ip"
              :username="username"
              @change-step="changeStep"
              @get-children="getJson"
            />
            <Success v-else-if="step === 1" @change-step="changeStep" @get-children="getJson" />
          </KeepAlive>
        </div>
      </Card>

      <Divider direction="horizontal" type="dashed" margin="10px" />

      <Card
        class="general-card"
        :bordered="false"
        :style="{ height: '280px' }"
        :head-style="{ color: '#0785fd' }"
        :body-style="{ padding: '0' }"
      >
        <template #title>redis基本操作结果</template>
        <RedisOpJson :data="json1" />
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
</style>
