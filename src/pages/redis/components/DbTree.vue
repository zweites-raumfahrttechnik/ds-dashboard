<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Tree, TreeNodeData } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { GetListData, GetListDataItem } from '@/api/types';
import { CONNECT_URL, REDIS_META_DB_TOTAL_URL } from '@/api/url';

const emit = defineEmits<{
  (event: 'handleSelectedKeys', val: string[]): void;
  (event: 'handleConMap', val: Record<string, GetListDataItem>): void;
}>();

const treeData = ref<TreeNodeData[]>([]);
const selectedKeys = ref<string[]>([]);

const { data: connects, execute: connectExecute } = useAxios<ResponseWrap<GetListData>>(
  CONNECT_URL,
  { params: { type: 4 } },
  instance,
  { immediate: false },
);

const { execute: dbExecute } = useAxios<ResponseWrap<string>>(
  REDIS_META_DB_TOTAL_URL,
  {},
  instance,
  {
    immediate: false,
  },
);

// 获取链接实例
onMounted(() => {
  connectExecute().then(val => {
    val.data.value?.data?.data.forEach(item => {
      treeData.value.push({
        title: `${item.ip}:${item.port}`,
        key: item.uuid,
      });
    });
  });
});

watch(
  () => selectedKeys.value,
  val => {
    emit('handleSelectedKeys', val[0].split('@*@'));
  },
);

watch(
  () => connects.value?.data?.data,
  val => {
    const conMap = ref<Record<string, GetListDataItem>>({});
    val?.forEach(item => {
      conMap.value[item.uuid] = item;
    });
    emit('handleConMap', conMap.value);
  },
);

const handleLoadMore = async (data: TreeNodeData) => {
  const keys = data.key?.toString().split('@*@') as string[];
  const connectIdx = treeData.value.findIndex(item => item.key === keys[0]);
  if (connectIdx === -1) {
    return;
  }

  const val = await dbExecute({ params: { uuid: keys[0] } });

  const dbNumber = Number(val.data.value?.data);
  treeData.value[connectIdx].children = Array(dbNumber)
    .fill(1)
    .map((_item, index) => {
      return {
        title: `db${index < 10 ? '0' + index : index}`,
        key: `${treeData.value[connectIdx].key}@*@${index}`,
        isLeaf: true,
      };
    });
};
</script>

<template>
  <Tree
    v-model:selected-keys="selectedKeys"
    block-node
    :data="treeData"
    :load-more="handleLoadMore"
  />
</template>
