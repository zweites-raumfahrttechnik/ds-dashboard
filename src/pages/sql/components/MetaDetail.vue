<script setup lang="ts">
import { Tabs, TabPane, Table, Spin, Card, Divider, Empty, Switch } from '@arco-design/web-vue';

import { SQL_META_COLUMN, SQL_META_TABLE } from '@/api/url';
import { GetListDataItem, GetSqlMetaData } from '@/api/types';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';

import { boxTabCol } from '../types';

const props = defineProps<{ selectedKeys: string; conMap: Map<string, GetListDataItem> }>();
const detailTabs = ref<{ selectedKeys: string; showType: 0 | 1 }[]>([]);

const activeTab = ref<string>('');
const activeTabShowAll = ref<0 | 1>(0);
const tableInfo = ref<GetSqlMetaData>();

const tableCol = computed(() => {
  if (activeTabShowAll.value === 1) {
    return boxTabCol(tableInfo.value?.allData.columnList);
  } else {
    return boxTabCol(tableInfo.value?.briefData.columnList);
  }
});

const tableData = computed(() => {
  if (activeTabShowAll.value === 1) {
    return tableInfo.value?.allData.data || [];
  } else {
    return tableInfo.value?.briefData.data || [];
  }
});

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 13,
});

const cardTitle = computed(() => {
  console.log(activeTab.value);
  if (activeTab.value === null || activeTab.value === '') return '';
  const keys = activeTab.value.split('@*@');
  if (keys.length === 1) {
    return 'Schame信息表';
  } else if (keys.length === 2) {
    return 'Table信息表';
  } else if (keys.length === 3) {
    return 'Column信息表';
  }
});

const {
  data: tableList,
  isLoading: tableListLoading,
  execute: tableListExec,
} = useAxios<ResponseWrap<GetSqlMetaData>>(SQL_META_TABLE, { method: 'GET' }, instance, {
  immediate: false,
});

const {
  data: columnList,
  isLoading: columnListLoading,
  execute: columnListExec,
} = useAxios<ResponseWrap<GetSqlMetaData>>(SQL_META_COLUMN, { method: 'GET' }, instance, {
  immediate: false,
});

watch(
  () => props.selectedKeys,
  val => {
    if (val.split('@*@').length > 1 && !detailTabs.value.some(item => item.selectedKeys === val)) {
      detailTabs.value.push({
        selectedKeys: val,
        showType: 0,
      });
      activeTab.value = val;
    }
  },
);

watch(
  () => tableList.value?.data,
  val => {
    tableInfo.value = val;
  },
);

watch(
  () => columnList.value?.data,
  val => {
    tableInfo.value = val;
  },
);

watch(
  () => activeTab.value,
  val => {
    const keys = val.split('@*@');
    if (keys.length === 2) {
      tableListExec({
        params: { uuid: keys[0], type: props.conMap.get(keys[0])?.type, schema: keys[1] },
      });
    } else if (keys.length === 3) {
      columnListExec({
        params: {
          uuid: keys[0],
          type: props.conMap.get(keys[0])?.type,
          schema: keys[1],
          table: keys[2],
        },
      });
    }
    activeTabShowAll.value = 0;
  },
);

const handleDelete = (key: string | number) => {
  detailTabs.value = detailTabs.value.filter(item => item.selectedKeys !== key);
  activeTab.value = detailTabs.value.at(detailTabs.value.length - 1)?.selectedKeys || '';
};

const showTabTitle = (item: { selectedKeys: string; showType: 0 | 1 }) => {
  const keys = item.selectedKeys.split('@*@');
  if (keys.length === 1) {
    return props.conMap.get(keys[0])?.ip + ':' + props.conMap.get(keys[0])?.port;
  }
  return (
    keys[keys.length - 1] +
    '(' +
    props.conMap.get(keys[0])?.ip +
    ':' +
    props.conMap.get(keys[0])?.port +
    ')'
  );
};

const handleClearAllTabs = () => {
  detailTabs.value = [];
  activeTab.value = '';
};

const handlePageChange = (page: number) => {
  pagination.current = page;
};
</script>

<template>
  <div class="container">
    <Empty v-if="detailTabs.length === 0" :style="{ padding: '300px' }"></Empty>

    <Tabs v-model:active-key="activeTab" :editable="true" @delete="handleDelete">
      <TabPane v-for="item in detailTabs" :key="item.selectedKeys" :title="showTabTitle(item)" />
    </Tabs>

    <Card v-if="detailTabs.length !== 0 && activeTab !== ''" class="general-card" :bordered="false">
      <template #title>{{ cardTitle }}</template>
      <template #extra>
        <Switch v-model:model-value="activeTabShowAll" :checked-value="1" :unchecked-value="0">
          <template #checked>All</template>
          <template #unchecked>Brief</template>
        </Switch>
      </template>
      <Divider style="margin-top: 0" />
      <Spin :style="{ width: '100%' }" :loading="columnListLoading || tableListLoading">
        <Table
          :scroll="{ minWidth: 1500 }"
          :bordered="false"
          :columns="tableCol"
          :data="tableData"
          :pagination="pagination"
          @page-change="handlePageChange"
        />
      </Spin>
    </Card>
  </div>
</template>

<style lang="less" scoped>
.container {
  padding: 0 10px;
}
</style>
