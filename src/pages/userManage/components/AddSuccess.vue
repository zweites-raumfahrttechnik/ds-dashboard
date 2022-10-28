<script lang="ts" setup>
import { Result, Space, Button } from '@arco-design/web-vue';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const handlePre = () => {
  emit('change-step', 0);
};
</script>

<template>
  <Card class="background">
    <Result status="success" title="用户创建成功" class="Result">
      <template #extra>
        <Space :size="16">
          <Button type="primary" @click="handlePre">再次创建</Button>
        </Space>
      </template>
    </Result>
  </Card>
</template>
