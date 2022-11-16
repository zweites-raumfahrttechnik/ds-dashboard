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
  Optgroup,
} from '@arco-design/web-vue';
import { GetListDataItem, KeyItem } from '@/api/types';
import { REDIS_OP_URL, REDIS_META_DB_SIZE_URL, REDIS_KEYS_URL, REDIS_METHODS_URL } from '@/api/url';
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

const { data: methodData } = useAxios<ResponseWrap<Record<string, string[]>>>(
  REDIS_METHODS_URL,
  {},
  instance,
  { immediate: true },
);

const keyList = ref<KeyItem[]>([]);
const methodList = ref<string[]>([]);
const keyMap = ref<Record<string, KeyItem>>({});
const json = computed(() => {
  return basicData.value?.data;
});

const isAddKey = computed(() => {
  return !(basicOpForm.key in keyMap.value);
});

const basicFormRef = ref<FormInstance>();
const basicOpForm = reactive<FormModel>({
  uuid: props.selectedKeys.split('@*@')[0],
  dbname: +props.selectedKeys.split('@*@')[1],
  action: '',
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
  async val => {
    basicOpForm.action = '';
    basicOpForm.parameter1 = '';
    basicOpForm.parameter2 = '';
    basicOpForm.key = '';
    await getKeyList(val);
  },
);

watch(
  () => basicOpForm.key,
  val => {
    if (val && val !== '') {
      if (!isAddKey.value) {
        basicOpForm.keyType = keyMap.value[val].type;
        if (methodData.value?.data) {
          methodList.value = methodData.value?.data[basicOpForm.keyType];
        }
        basicExecute({
          data: {
            uuid: basicOpForm.uuid,
            dbname: basicOpForm.dbname,
            action: '',
            keyType: basicOpForm.keyType,
            key: val,
            parameter1: '',
            parameter2: '',
          },
        });
      } else {
        basicOpForm.action = handleDefaultAddAction(basicOpForm.keyType);
      }
    }
  },
);

watch(
  () => basicOpForm.keyType,
  () => {
    if (isAddKey.value) {
      if (methodData.value?.data) {
        methodList.value = methodData.value?.data[basicOpForm.keyType];
      }
      basicOpForm.action = handleDefaultAddAction(basicOpForm.keyType);
    }
  },
);

const getKeyList = async (val: string) => {
  keyList.value = [];
  const selectedKeys = val.split('@*@');
  basicOpForm.uuid = selectedKeys[0];
  basicOpForm.dbname = +selectedKeys[1];
  const size = await dbSizeExecute({
    params: {
      uuid: selectedKeys[0],
      dbnumber: selectedKeys[1],
    },
  });
  await keysExecute({
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
    if (keyList.value.length !== 0 && basicOpForm.key === '') {
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

const handleExecuteButtonClick = async () => {
  const res = await basicFormRef.value?.validate();
  if (res) {
    return;
  }
  basicExecute({ data: { ...basicOpForm } }).then(async () => {
    if (basicOpForm.action.indexOf('Key') !== -1) {
      if (basicOpForm.action === 'delKey' || basicOpForm.action === 'moveKey') {
        basicOpForm.key = '';
        await getKeyList(props.selectedKeys);
      } else if (basicOpForm.parameter1) {
        await getKeyList(props.selectedKeys);
        basicOpForm.key = basicOpForm.parameter1;
      }
    }
    if (isAddKey.value) {
      await getKeyList(props.selectedKeys);
    }
  });
};

const handleResetButtonClick = async () => {
  basicOpForm.action = '';
  basicOpForm.parameter1 = '';
  basicOpForm.parameter2 = '';

  basicExecute({ data: { ...basicOpForm } });
};

const handleDefaultAddAction = (type: string) => {
  switch (type) {
    case 'string': {
      return 'set';
    }
    case 'set': {
      return 'add';
    }
    case 'zset': {
      return 'add';
    }
    case 'list': {
      return 'set';
    }
    case 'hash': {
      return 'set';
    }
    default: {
      return '';
    }
  }
};
</script>

<template>
  <Form ref="basicFormRef" :model="basicOpForm" label-align="left" layout="vertical">
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
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col :span="8">
          <FormItem
            label="操作类型"
            :rules="{ required: true, message: '请输入操作类型' }"
            field="action"
          >
            <Select v-model="basicOpForm.action">
              <Optgroup label="基础数据操作">
                <Option
                  v-for="item in methodList"
                  :key="item"
                  :value="item"
                  :label="item.toLocaleLowerCase()"
                />
              </Optgroup>
              <Optgroup label="key操作">
                <Option value="delKey" label="delete key" />
                <Option value="moveKey" label="move key" />
                <Option value="renameKey" label="rename key" />
                <Option value="ttlKey" label="ttl key" />
                <Option value="persistKey" label="persist key" />
              </Optgroup>
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
