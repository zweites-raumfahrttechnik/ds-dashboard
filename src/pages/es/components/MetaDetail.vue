<script setup lang="ts">
import { Tabs, TabPane, Empty } from '@arco-design/web-vue';
import { instance, ResponseWrap } from '@/api';
import { useAxios } from '@vueuse/integrations/useAxios';
import DocumentContent from './DocumentContent.vue';
import JSONEditor from './JsonEditor.vue';

import { ES_META_MAPPING, ES_META_SETTING } from '@/api/url';
import { ESMetaInfo } from '@/api/types';

const props = defineProps<{ selectedKeys: string[] }>();

const activeKey = ref<string>('document');

const { execute: mappingExec } = useAxios<ResponseWrap<ESMetaInfo>>(
  ES_META_MAPPING,
  { params: { uuid: props.selectedKeys[0], index: props.selectedKeys[1] } },
  instance,
  {
    immediate: false,
  },
);

const { execute: settingExec } = useAxios<ResponseWrap<ESMetaInfo>>(
  ES_META_SETTING,
  { params: { uuid: props.selectedKeys[0], index: props.selectedKeys[1] } },
  instance,
  {
    immediate: false,
  },
);

const json = ref<Record<string, unknown>>({});

watch(
  () => activeKey.value,
  val => {
    if (val === 'mapping') {
      mappingExec({ params: { uuid: props.selectedKeys[0], index: props.selectedKeys[1] } }).then(
        val => {
          json.value = JSON.parse(val.data.value?.data?.data || '{}')?.test?.mappings;
        },
      );
    } else if (val === 'setting') {
      settingExec({ params: { uuid: props.selectedKeys[0], index: props.selectedKeys[1] } }).then(
        val => {
          json.value = JSON.parse(val.data.value?.data?.data || '{}')?.test?.settings;
        },
      );
    }
  },
);

watch(
  () => props.selectedKeys[1],
  () => {
    if (activeKey.value === 'mapping') {
      mappingExec().then(val => {
        json.value = JSON.parse(val.data.value?.data?.data || '{}')?.test?.mappings;
      });
    } else if (activeKey.value === 'setting') {
      settingExec().then(val => {
        json.value = JSON.parse(val.data.value?.data?.data || '{}')?.test?.settings;
      });
    }
  },
);
</script>

<template>
  <div class="container">
    <Tabs v-model:active-key="activeKey">
      <TabPane key="document" title="文档信息">
        <Empty v-if="props.selectedKeys.length !== 2" :style="{ paddingTop: '300px' }" />
        <DocumentContent v-else :selected-keys="props.selectedKeys" />
      </TabPane>
      <TabPane key="mapping" title="Mapping信息">
        <Empty v-if="props.selectedKeys.length !== 2" :style="{ paddingTop: '300px' }" />
        <JSONEditor v-else height="650px" :value="json" current-mode="view" />
      </TabPane>
      <TabPane key="setting" title="Setting信息">
        <Empty v-if="props.selectedKeys.length !== 2" :style="{ paddingTop: '300px' }" />
        <JSONEditor v-else height="650px" :value="json" current-mode="view" />
      </TabPane>
    </Tabs>
  </div>
</template>

<style lang="less" scoped>
.container {
  padding: 0 10px;
}
</style>
