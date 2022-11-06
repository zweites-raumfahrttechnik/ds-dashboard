<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Tree, TreeNodeData } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { GetListData, ESMetaInfo } from '@/api/types';
import { CONNECT_URL, ES_META_INDEX } from '@/api/url';

const emit = defineEmits<{ (event: 'handleSelectedKeys', val: string[]): void }>();

const treeData = ref<TreeNodeData[]>([]);
const selectedKeys = ref<string[]>([]);

const { execute: connectExecute } = useAxios<ResponseWrap<GetListData>>(
  CONNECT_URL,
  { params: { type: 6 } },
  instance,
  { immediate: false },
);

const { execute: indexExec } = useAxios<ResponseWrap<ESMetaInfo>>(ES_META_INDEX, {}, instance, {
  immediate: false,
});

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

const handleIndexStr2List = (indexStr: string) => {
  return Object.keys(JSON.parse(indexStr));
};

const handleLoadMore = async (data: TreeNodeData) => {
  const keys = data.key?.toString().split('@*@') as string[];

  // 获取 DB
  const val = await indexExec({ params: { uuid: keys[0] } });
  const idx = treeData.value.findIndex(item => item.key === data.key);
  if (idx === -1) {
    return;
  }

  treeData.value[idx].children = handleIndexStr2List(val.data.value?.data?.data || '').map(
    item => ({
      key: `${treeData.value[idx].key}@*@${item}`,
      title: item,
      isLeaf: true,
    }),
  );
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
