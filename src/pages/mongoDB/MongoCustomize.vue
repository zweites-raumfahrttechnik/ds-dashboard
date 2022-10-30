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
import { GetListData, GetListDataItem, MongodbDBInfo, MongodbCustom } from '@/api/types';
import { BSON_URL, CONNECT_URL, MONGODB_DB_URL } from '@/api/url';

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
    execute({ params: { pg: pg.value, type: 5, size: 50 } });
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
  data: db,
  execute: dbExecute,
  isLoading: dbLoading,
} = useAxios<ResponseWrap<MongodbDBInfo>>(MONGODB_DB_URL, {}, instance, {
  immediate: false,
});

const { execute: customExecute, isLoading: customLoading } = useAxios<ResponseWrap<MongodbCustom>>(
  BSON_URL,
  { method: 'POST' },
  instance,
  {
    immediate: false,
  },
);

const form = reactive({
  uuid: '',
  bson: '{}',
  dbName: '',
});

const resForm = reactive({
  execRes: '{}',
});

const { connect, isLoading: connectLoading } = useLoadMoreConnect();

watch(
  () => form.uuid,
  newVal => {
    dbExecute({ params: { newVal } });
  },
);

const dbNameSelectDisable = computed(() => {
  if (connect.value.length === 0 || form.uuid === '') {
    return true;
  }

  return false;
});

const handleSubmit = () => {
  if (form.uuid === '' || form.dbName === '' || form.bson === '{}') {
    return;
  }

  customExecute({
    data: {
      uuid: form.uuid,
      dbName: form.dbName,
      bsonStr: form.bson,
    },
  }).then(val => {
    resForm.execRes = val.data.value?.data?.document || '{}';
  });
};
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>MongoDB自定义操作</template>

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
                >
                  <Option v-for="item in connect" :key="item.uuid" :value="item.uuid">
                    {{ `${item.ip}:${item.port}` }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem field="dbName" label="数据库名称">
                <Select
                  v-model="form.dbName"
                  :disabled="dbNameSelectDisable"
                  :loading="dbLoading"
                  :style="{ width: '440px' }"
                  placeholder="请选择数据库名称"
                >
                  <Option v-for="item in db?.data?.data" :key="item" :value="item">
                    {{ item }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem field="bson" label="bsonStr">
                <JsonEdit v-model:value="form.bson" :style="{ width: '440px', height: '400px' }" />
              </FormItem>
              <FormItem>
                <Button :loading="customLoading" html-type="submit" type="primary" small>
                  提交
                </Button>
              </FormItem>
            </Form>
          </div>
        </Col>

        <Divider style="height: 700px" direction="vertical" />

        <Col :span="11">
          <div class="form-container">
            <Form :model="resForm">
              <FormItem field="execRes" label="结果">
                <JsonEdit
                  v-model:value="resForm.execRes"
                  current-mode="view"
                  :style="{ width: '440px', height: '505px' }"
                />
              </FormItem>
            </Form>
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
