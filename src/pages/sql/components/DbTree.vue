<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Tree, TreeNodeData } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { GetListData, GetListDataItem, GetSqlMetaData } from '@/api/types';
import { CONNECT_URL, SQL_META_SCHEMA, SQL_META_TABLE } from '@/api/url';

const emit = defineEmits<{
  (event: 'update:selectedKeys', val: string): void;
  (event: 'getConMap', val: Record<string, GetListDataItem>): void;
}>();

const treeData = ref<TreeNodeData[]>([]);
const selectedKeys = ref<string[]>([]);

const conMap = ref<Record<string, GetListDataItem>>({});

const { execute: connectExecute } = useAxios<ResponseWrap<GetListData>>(
  CONNECT_URL,
  { params: { types: [1, 2, 3] } },
  instance,
  { immediate: false },
);

const { execute: schemaExecute } = useAxios<ResponseWrap<GetSqlMetaData>>(
  SQL_META_SCHEMA,
  {},
  instance,
  {
    immediate: false,
  },
);

const { execute: tableExecute } = useAxios<ResponseWrap<GetSqlMetaData>>(
  SQL_META_TABLE,
  {},
  instance,
  {
    immediate: false,
  },
);

// 获取链接实例
onMounted(() => {
  connectExecute().then(val => {
    conMap.value = {};
    val.data.value?.data?.data.forEach(item => {
      treeData.value.push({
        title: `${item.ip}:${item.port}${item.name === null || item.name === '' ? '' : '/'}${
          item.name
        }`,
        key: item.uuid,
      });
      conMap.value[item.uuid] = item;
    });
    emit('getConMap', conMap);
  });
});

watch(
  () => selectedKeys.value,
  val => {
    emit('update:selectedKeys', val[0]);
  },
);

const handleLoadMore = async (data: TreeNodeData) => {
  const keys = data.key?.toString().split('@*@') as string[];

  // 获取表名
  if (keys.length === 2) {
    const val = await tableExecute({
      params: { uuid: keys[0], type: conMap.value.get(keys[0]), schema: keys[1] },
    });

    // 寻找 connect
    const connectIdx = treeData.value.findIndex(item => item.key === keys[0]);
    if (connectIdx === -1) {
      return;
    }

    const connect = treeData.value[connectIdx];
    if (!connect.children) {
      return;
    }

    // 寻找 db
    const dbIdx = connect.children.findIndex(item => item.key === `${keys[0]}@*@${keys[1]}`);
    if (dbIdx === -1) {
      return;
    }

    const db = connect.children[dbIdx];

    if (treeData.value[connectIdx].children !== undefined) {
      db.children = val.data.value?.data?.names.map(item => ({
        key: `${keys[0]}@*@${keys[1]}@*@${item}`,
        title: item,
        isLeaf: true,
      }));
    }

    return;
  }

  // 获取 schema
  const val = await schemaExecute({ params: { uuid: keys[0], type: conMap.value[keys[0]].type } });
  const idx = treeData.value.findIndex(item => item.key === data.key);
  if (idx === -1) {
    return;
  }

  treeData.value[idx].children = val.data.value?.data?.names.map(item => ({
    key: `${treeData.value[idx].key}@*@${item}`,
    title: item,
  }));
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
