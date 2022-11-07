<script lang="ts" setup>
import { Result, Space, Button } from '@arco-design/web-vue';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
  (e: 'get-children', num: Record<string, unknown>): void;
}>();

const handlePre = () => {
  emit('change-step', 0);
  emit('get-children', {});
};
</script>

<template>
  <div>
    <Result status="success" title="redis数据库基本操作成功">
      <template #extra>
        <Space :size="16">
          <Button type="primary" @click="handlePre">再次操作</Button>
        </Space>
      </template>
    </Result>
  </div>
</template>
