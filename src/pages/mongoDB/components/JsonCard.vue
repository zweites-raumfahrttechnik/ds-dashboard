<script setup lang="ts">
import { Card, Popconfirm, Link, Divider } from '@arco-design/web-vue';
import { IconTool, IconDelete } from '@arco-design/web-vue/es/icon';

const props = defineProps<{
  value: string;
  editable?: boolean;
  deletable?: boolean;
}>();

const emit = defineEmits<{
  (event: 'delete'): void;
  (event: 'edit'): void;
}>();

const handleEditClick = () => {
  emit('edit');
};

const handleDeleteClick = () => {
  emit('delete');
};
</script>

<template>
  <Card>
    <template #extra>
      <Link v-if="props.editable" type="success" :underline="false" @click="handleEditClick">
        <template #icon>
          <IconTool size="15" />
        </template>
      </Link>

      <Divider direction="vertical" />

      <Popconfirm
        v-if="props.deletable"
        type="warning"
        content="确认删除该文档？"
        @ok="handleDeleteClick"
      >
        <Link status="danger" :underline="false">
          <template #icon>
            <IconDelete size="15" />
          </template>
        </Link>
      </Popconfirm>
    </template>
    <div class="content">
      {{ JSON.stringify(JSON.parse(props.value), null, 4) }}
    </div>
  </Card>
</template>

<style lang="less" scoped>
.content {
  height: 200px;
  overflow-y: auto;
  white-space: pre;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #ecf0f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #bdc3c7;
  }
}
</style>
