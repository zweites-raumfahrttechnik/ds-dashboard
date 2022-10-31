<script setup lang="ts">
import {
  Link,
  Space,
  Tag,
  Modal,
  Form,
  FormItem,
  Input,
  Select,
  Option,
} from '@arco-design/web-vue';

import { ConditionItem, opMap } from './types';

const props = defineProps<{
  value: ConditionItem[];
}>();

const emit = defineEmits<{ (event: 'update:value', condition: ConditionItem[]): void }>();

const visible = ref(false);

const condition = reactive<ConditionItem>({
  target: '',
  op: 'EQ',
  field: '',
});

const handleDelete = (key: string) => {
  emit(
    'update:value',
    props.value.filter(item => `${item.field}${item.op}${item.target}` !== key),
  );
};

const handleAddCondition = () => {
  visible.value = true;
};

const handleModalOk = () => {
  emit('update:value', [
    ...props.value,
    { target: condition.target, op: condition.op, field: condition.field },
  ]);
};

const handleModalClose = () => {
  condition.target = '';
  condition.op = 'EQ';
  condition.field = '';
};
</script>

<template>
  <Space>
    <Link @click="handleAddCondition">
      <template #icon>
        <IconPlus />
      </template>
      添加条件
    </Link>

    <Space>
      <Tag
        v-for="item in props.value"
        :key="`${item.field}${item.op}${item.target}`"
        closable
        color="#86909c"
        @close="() => handleDelete(`${item.field}${item.op}${item.target}`)"
      >
        {{ item.field }}
        {{ opMap[item.op] }}
        {{ item.target }}
      </Tag>
    </Space>
  </Space>

  <Modal v-model:visible="visible" title="添加条件" @ok="handleModalOk" @close="handleModalClose">
    <Form :model="condition">
      <FormItem label="字段">
        <Input v-model="condition.field" />
      </FormItem>
      <FormItem label="条件">
        <Select v-model="condition.op">
          <Option v-for="item in Object.keys(opMap)" :key="item" :value="item">
            {{ opMap[item] }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="目标值">
        <Input v-model="condition.target" />
      </FormItem>
    </Form>
  </Modal>
</template>
