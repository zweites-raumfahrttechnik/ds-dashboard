<script lang="ts" setup>
import { Result, Space, Button } from '@arco-design/web-vue';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

const router = useRouter();

const handlePre = () => {
  emit('change-step', 0);
};

const handleDetail = () => {
  router.push({ name: 'ConnectList' });
};
</script>

<template>
  <div>
    <Result status="success" title="操作数据库成功">
      <!-- <template #subtitle> 请在连接列表页面查看添加的数据库连接 </template> -->
      <template #extra>
        <Space :size="16">
          <Button type="primary" @click="handlePre">再次操作</Button>
        </Space>
      </template>
    </Result>
  </div>
</template>
