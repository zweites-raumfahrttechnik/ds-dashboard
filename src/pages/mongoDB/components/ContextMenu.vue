<script setup lang="ts">
import { Space } from '@arco-design/web-vue';
import { IconPlus, IconDelete } from '@arco-design/web-vue/es/icon';

const props = defineProps<{ menuKeys: string[] }>();

const emit = defineEmits<{
  (event: 'newDb'): void;
  (event: 'newCollection'): void;
  (event: 'deleteDb'): void;
  (event: 'deleteCollection'): void;
}>();

const level = computed(() => props.menuKeys.length);
</script>

<template>
  <div class="container">
    <ul class="list-wrap">
      <li v-if="level === 1 || level === 2" class="list-item" @click="() => emit('newDb')">
        <Space>
          <span>
            <IconPlus />
          </span>
          <span>新建数据库</span>
        </Space>
      </li>

      <li v-if="level === 2" class="list-item" @click="() => emit('deleteDb')">
        <Space>
          <span>
            <IconDelete />
          </span>
          <span>删除数据库</span>
        </Space>
      </li>

      <li v-if="level === 2 || level === 3" class="list-item" @click="() => emit('newCollection')">
        <Space>
          <span>
            <IconPlus />
          </span>
          <span>新建数据集合</span>
        </Space>
      </li>

      <li v-if="level === 3" class="list-item" @click="() => emit('deleteCollection')">
        <Space>
          <span>
            <IconDelete />
          </span>
          <span>删除数据集合</span>
        </Space>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
@import '@arco-design/web-vue/es/style/theme/global.less';

.container {
  width: 180px;
  position: absolute;
  background-color: var(--color-bg-3);
  // border: @border-1 solid var(--color-border-3);
  border-radius: @border-radius-medium;
  font-size: @font-size-title-1;
  box-shadow: @shadow2-center;
  z-index: 999;

  .list-wrap {
    margin: 0;
    padding: 7px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    color: @color-text-1;
    list-style: none;
  }

  .list-item {
    padding: 10px;
    width: 100%;
    flex: 1;
    border-radius: @border-radius-medium;
    cursor: default;

    &:hover {
      background-color: @color-fill-2;
    }
  }
}
</style>
