<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Tree, TreeNodeData } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { GetListData, GetListDataItem, GetSqlMetaData } from '@/api/types';
import { CONNECT_URL, SQL_META_SCHEMA, SQL_META_TABLE, SQL_META_VIEW } from '@/api/url';

const emit = defineEmits<{
  (event: 'getSelectedKeys', val: string): void;
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

const { execute: viewExecute } = useAxios<ResponseWrap<GetSqlMetaData>>(
  SQL_META_VIEW,
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
        title: `${item.ip}:${item.port}${
          item.name === null || item.name === '' ? '' : '/' + item.name
        }`,
        key: item.uuid,
      });
      conMap.value[item.uuid] = item;
    });
    emit('getConMap', conMap.value);
  });
});

watch(
  () => selectedKeys.value,
  val => {
    emit('getSelectedKeys', val[0]);
  },
);

const handleLoadMore = async (data: TreeNodeData) => {
  const keys = data.key?.toString().split('@*@') as string[];

  const connectIdx = treeData.value.findIndex(item => item.key === keys[0]);
  if (connectIdx === -1) {
    return;
  }

  if (keys.length === 2) {
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
    db.children = [];

    const tables = await tableExecute({
      params: { uuid: keys[0], type: conMap.value[keys[0]].type, schema: keys[1] },
    });
    const views = await viewExecute({
      params: { uuid: keys[0], type: conMap.value[keys[0]].type, schema: keys[1] },
    });

    if (tables.data.value?.data?.names.length !== 0) {
      db.children.push({
        key: `${db.key}@*@tables`,
        title: 'tables',
      });
      db.children[0].children = tables.data.value?.data?.names.map(item => ({
        key: `${db.key}@*@tables@*@${item}`,
        title: item,
        isLeaf: true,
      }));
    }

    if (views.data.value?.data?.names.length !== 0) {
      db.children.push({
        key: `${db.key}@*@views`,
        title: 'views',
      });
      db.children[1].children = views.data.value?.data?.names.map(item => ({
        key: `${db.key}@*@views@*@${item}`,
        title: item,
        isLeaf: true,
      }));
    }
    return;
  }

  // 获取 schema
  const val = await schemaExecute({ params: { uuid: keys[0], type: conMap.value[keys[0]].type } });

  treeData.value[connectIdx].children = val.data.value?.data?.names.map(item => ({
    key: `${treeData.value[connectIdx].key}@*@${item}`,
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
