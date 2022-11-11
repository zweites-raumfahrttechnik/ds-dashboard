<script lang="ts" setup>
import {
  Card,
  Divider,
  Form,
  FormItem,
  Row,
  Col,
  Input,
  Select,
  Option,
  Button,
  Space,
  Spin,
} from '@arco-design/web-vue';
import { GetListDataItem, KeyItem } from '@/api/types';
import { REDIS_OP_URL, REDIS_META_DB_SIZE_URL, REDIS_KEYS_URL } from '@/api/url';
import { instance, ResponseWrap } from '@/api';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import JsonEditor from '@/components/JsonEditor.vue';

import { FormModel } from './types';
import { RedisKeys } from '@/api/types';

const props = defineProps<{
  selectedKeys: string;
  conMap: Record<string, GetListDataItem>;
}>();

const {
  data: basicData,
  isLoading: basicLoading,
  execute: basicExecute,
} = useAxios<ResponseWrap<{ data: undefined }>>(
  REDIS_OP_URL,
  {
    method: 'POST',
  },
  instance,
  {
    immediate: false,
  },
);

const { execute: dbSizeExecute } = useAxios<ResponseWrap<string>>(
  REDIS_META_DB_SIZE_URL,
  {},
  instance,
  {
    immediate: false,
  },
);

const { execute: keysExecute } = useAxios<ResponseWrap<RedisKeys>>(REDIS_KEYS_URL, {}, instance, {
  immediate: false,
});

const keyList = ref<KeyItem[]>([]);
const keyMap = ref<Record<string, KeyItem>>({});
const json = computed(() => {
  return basicData.value?.data;
});

const isAddKey = computed(() => {
  return !(basicOpForm.key in keyMap.value);
});

const basicFormRef = ref<FormInstance>;
const basicOpForm = reactive<FormModel>({
  uuid: props.selectedKeys.split('@*@')[0],
  dbname: +props.selectedKeys.split('@*@')[1],
  action: 'get',
  keyType: '',
  key: '',
  parameter1: '',
  parameter2: '',
});

onMounted(() => {
  getKeyList(props.selectedKeys);
});

watch(
  () => props.selectedKeys,
  val => {
    keyList.value = [];
    getKeyList(val);
  },
);

watch(
  () => basicOpForm.key,
  val => {
    if (val && val !== '') {
      if (basicOpForm.key in keyMap.value) {
        console.log(2);
        basicOpForm.keyType = keyMap.value[val].type;
        basicExecute({
          data: {
            uuid: basicOpForm.uuid,
            dbname: basicOpForm.dbname,
            action: 'get',
            keyType: basicOpForm.keyType,
            key: val,
          },
        });
      } else {
        basicOpForm.action = 'set';
      }
    }
  },
);

const getKeyList = async (val: string) => {
  const selectedKeys = val.split('@*@');
  basicOpForm.uuid = selectedKeys[0];
  basicOpForm.dbname = +selectedKeys[1];
  const size = await dbSizeExecute({
    params: {
      uuid: selectedKeys[0],
      dbnumber: selectedKeys[1],
    },
  });
  keysExecute({
    params: {
      uuid: selectedKeys[0],
      dbnumber: selectedKeys[1],
      pg: 1,
      keys: size.data.value?.data,
    },
  }).then(val => {
    (val.data.value?.data?.data || []).forEach(val => {
      keyList.value.push(val);
      keyMap.value[val.key] = val;
    });
    if (keyList.value.length !== 0) {
      basicOpForm.key = keyList.value[0].key;
    }
  });
};

const concatRedisAddress = computed(() => {
  return props.conMap[basicOpForm.uuid].ip + ':' + props.conMap[basicOpForm.uuid].port;
});

const concatRedisDbName = computed(() => {
  const index = basicOpForm.dbname;
  return `db${index < 10 ? '0' + index : index}`;
});

const handleExecuteButtonClick = () => {
  basicExecute({ data: { ...basicOpForm } });
};

const handleResetButtonClick = () => {
  basicOpForm.action = 'get';
  basicOpForm.parameter1 = '';
  basicOpForm.parameter2 = '';
  if (isAddKey.value) {
    if (keyList.value.length !== 0) {
      basicOpForm.key = keyList.value[0].key;
    }
    return;
  }

  handleExecuteButtonClick();
};
</script>

<template>
  <Form :ref="basicFormRef" :model="basicOpForm" label-align="left" layout="vertical">
    <Card class="general-card" :bordered="false" :style="{ marginBottom: 0 }">
      <template #title>基础操作</template>
      <template #extra>
        <Space>
          <Button type="primary" @click="handleExecuteButtonClick">
            <template #icon> <IconPlayArrow /> </template>
            执行
          </Button>
          <Button @click="handleResetButtonClick">
            <template #icon>
              <IconLoop />
            </template>
            重置
          </Button>
        </Space>
      </template>

      <Row :gutter="16">
        <Col :span="8">
          <FormItem label="实例地址">
            <Input v-model="concatRedisAddress" readonly />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="数据库">
            <Input v-model="concatRedisDbName" readonly />
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="键" field="key">
            <Select v-model="basicOpForm.key" :allow-create="true" allow-search>
              <Option v-for="item in keyList" :key="item.key" :value="item.key" :label="item.key">
                <span>{{ item.key }}</span>
                <span :style="{ float: 'right', color: '#909399' }">{{ item.type }}</span>
              </Option>

              <template #append>
                {{ basicOpForm.key }}
              </template>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="键类型" field="keyType">
            <Select v-model="basicOpForm.keyType" :disabled="!isAddKey">
              <Option>string</Option>
              <Option>set</Option>
              <Option>zset</Option>
              <Option>hash</Option>
              <Option>list</Option>
            </Select>
          </FormItem></Col
        >
      </Row>
      <Row :gutter="16">
        <Col :span="8">
          <FormItem label="操作类型" :rules="{ required: true }" field="action">
            <Select v-model="basicOpForm.action">
              <Option>get</Option>
              <Option>set</Option>
              <Option>delete</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="参数1" field="parameter1">
            <Input v-model="basicOpForm.parameter1"></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="参数2" field="parameter2">
            <Input v-model="basicOpForm.parameter2"> </Input>
          </FormItem>
        </Col>
      </Row>
    </Card>
  </Form>

  <Card class="general-card" :bordered="false">
    <Divider style="margin-top: 0" />
    <Spin :loading="basicLoading" :style="{ width: '100%' }">
      <JsonEditor :value="json" current-mode="view" height="440px"></JsonEditor>
    </Spin>
  </Card>
</template>

<style lang="less">
.arco-checkbox-label {
  display: block !important;
  width: 100% !important;
}

.arco-select-option-checkbox {
  width: 100% !important;
}

.arco-select-option-content {
  display: block !important;
  width: 100% !important;
}
</style>
