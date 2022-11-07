<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  Card,
  FormItem,
  Form,
  Button,
  Select,
  Option,
  Col,
  Row,
  Divider,
} from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import { instance, ResponseWrap } from '@/api';
import { GetListData, GetListDataItem, ESMetaInfo } from '@/api/types';
import {
  CONNECT_URL,
  ES_META_INDEX,
  ES_CREATE_INDEX,
  ES_DELETE_INDEX,
  ES_CREATE_DOC,
  ES_GET_DOC,
  ES_DELETE_DOC,
  ES_SEARH_DOC,
  ES_UPDATE_DOC,
} from '@/api/url';
import { FormModel } from './types';

import JsonEdit from './components/JsonEditor.vue';

const useLoadMoreConnect = () => {
  const { data, execute, isLoading } = useAxios<ResponseWrap<GetListData>>(
    CONNECT_URL,
    {},
    instance,
    {
      immediate: false,
    },
  );

  const connect = ref<GetListDataItem[]>([]);
  const pg = ref(1);

  onMounted(() => {
    execute({ params: { pg: pg.value, type: 6, size: 50 } });
  });

  watch(
    () => data.value?.data?.data,
    newVal => {
      const tmp = new Set(connect.value);
      newVal?.forEach(item => {
        tmp.add(item);
      });

      connect.value = Array.from(tmp);
    },
  );

  const selectLoadMore = () => {
    pg.value++;

    nextTick(() => {
      execute({
        params: {
          pg: pg.value,
          size: 50,
          type: 5,
        },
      });
    });
  };

  return { connect, isLoading, selectLoadMore };
};

const {
  data: indexStr,
  execute: indexExec,
  isLoading: indexLoading,
} = useAxios<ResponseWrap<ESMetaInfo>>(ES_META_INDEX, {}, instance, {
  immediate: false,
});

const {
  data: docStr,
  execute: docExec,
  isLoading: docLoading,
} = useAxios<ResponseWrap<ESMetaInfo>>(ES_SEARH_DOC, {}, instance, {
  immediate: false,
});

const { execute: docGetExec, isLoading: docGetLoading } = useAxios<ResponseWrap<ESMetaInfo>>(
  ES_GET_DOC,
  {},
  instance,
  {
    immediate: false,
  },
);

const indexList = computed(() => {
  return Object.keys(JSON.parse(indexStr.value?.data?.data || '{}'));
});

const docList = computed(() => {
  const res = [];
  return JSON.parse(docStr.value?.data?.data || '{}')?.hits?.hits.forEach(
    (item: { _id: string }) => {
      res.push(item?._id);
    },
  );
});

const resRecord = ref<Record<string, unknown>>({});

const form = reactive<FormModel>({
  uuid: '',
  index: '',
  indexOpType: 'NONE',
  docid: '',
  docOpType: 'NONE',
  entityInfo: '{}',
});

const { connect, isLoading: connectLoading, selectLoadMore } = useLoadMoreConnect();

watch(
  () => form.uuid,
  newVal => {
    form.index = '';
    indexExec({ params: { newVal } });
  },
);

watch(
  () => form.index,
  newVal => {
    form.index = '';
    form.docid = '';
    indexExec({ params: { newVal } });
  },
);

watch(
  () => form.docid,
  () => {
    docGetExec({ params: { uuid: form.uuid, index: form.index, docid: form.docid } }).then(val => {
      resRecord.value = JSON.parse(val.data.value?.data?.data || '{}');
    });
  },
);

const handleSubmit = () => {
  return '';
};
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>ES基础操作</template>

      <Row>
        <Col :span="11">
          <div class="form-container">
            <Form :model="form" @submit="handleSubmit">
              <FormItem field="uuid" label="数据库实例">
                <Select
                  v-model="form.uuid"
                  :loading="connectLoading"
                  :style="{ width: '440px' }"
                  placeholder="请选择数据库实例"
                  @dropdown-reach-bottom="selectLoadMore"
                >
                  <Option v-for="item in connect" :key="item.uuid" :value="item.uuid">
                    {{ `${item.ip}:${item.port}` }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem field="index" label="请选择索引名称">
                <Select
                  v-model="form.index"
                  :loading="indexLoading"
                  :style="{ width: '440px' }"
                  placeholder="请选择索引名称"
                >
                  <Option v-for="item in indexList" :key="item" :value="item">
                    {{ item }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem field="docid" label="请选择文档名称">
                <Select
                  v-model="form.docid"
                  :loading="docLoading"
                  :style="{ width: '440px' }"
                  placeholder="请选择文档名称"
                >
                  <Option v-for="item in docList" :key="item" :value="item">
                    {{ item }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem field="entityInfo" label="docid">
                <JsonEdit
                  v-model:value="form.entityInfo"
                  :style="{ width: '440px', height: '400px' }"
                />
              </FormItem>
            </Form>
          </div>
        </Col>

        <Divider style="height: 700px" direction="vertical" />

        <Col :span="11">
          <div class="form-container">
            <JsonEdit
              v-model:value="resRecord"
              current-mode="view"
              :style="{ width: '440px', height: '505px' }"
            />
          </div>
        </Col>
      </Row>
    </Card>
  </PageContainer>
</template>

<style lang="less" scoped>
.form-container {
  display: flex;
  justify-content: left;
  align-items: left;
  padding: 80px 0;
}
</style>
