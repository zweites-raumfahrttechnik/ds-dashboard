<script lang="ts" setup>
import { Result, Space, Button } from '@arco-design/web-vue';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
  (e: 'getChildren', num: object): void;
}>();

interface Props {
    bo?:boolean
}
const props = withDefaults(defineProps<Props>(), {
    bo:true
});

const handlePre = () => {
  emit('change-step', 0);
  emit('getChildren', Object);
};

</script>

<template>
  <div>
    <Result status="success" title="redis数据库基本操作成功"  v-if="props.bo===false">
      <!-- <template #subtitle> 请在连接列表页面查看添加的数据库连接 </template> -->
      <template #extra>
        <Space :size="16">
          <Button type="primary" @click="handlePre">再次操作</Button>
        </Space>
      </template>
    </Result>
    <Result status="error" title="redis数据库基本操作失败" subtitle="可能是您表单输入的信息有误" v-else-if="props.bo===true">
      <template #extra>
        <Space :size="16">
          <Button type="primary" @click="handlePre">返回重新操作</Button>
        </Space>
      </template>
    </Result>
  </div>
</template>
