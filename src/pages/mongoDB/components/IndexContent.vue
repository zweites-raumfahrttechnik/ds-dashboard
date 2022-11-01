<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Row, Col } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { MongdbIndexInfo } from '@/api/types';
import { MONGODB_INDEX_URL } from '@/api/url';

import JsonCard from './JsonCard.vue';

const props = defineProps<{ selectedKeys: string[] }>();

const { data } = useAxios<ResponseWrap<MongdbIndexInfo>>(
  MONGODB_INDEX_URL,
  {
    params: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
    },
  },
  instance,
);
</script>

<template>
  <Row :gutter="16" :wrap="true">
    <Col v-for="item in data?.data?.data" :key="item" :span="6">
      <JsonCard :value="item" />
    </Col>
  </Row>
</template>

<style lang="less" scoped>
.container {
  :deep(.arco-card) {
    margin-bottom: 10px;
  }
}
</style>
