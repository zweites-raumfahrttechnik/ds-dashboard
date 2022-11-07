<script setup lang="ts">
import { Space } from '@arco-design/web-vue';
import { IconPlus, IconDelete } from '@arco-design/web-vue/es/icon';

const props = defineProps<{ menuKeys: string[] }>();

const emit = defineEmits<{
  (event: 'newIndex'): void;
  (event: 'deleteIndex'): void;
}>();

const level = computed(() => props.menuKeys.length);
</script>

<template>
  <div class="container">
    <ul class="list-wrap">
      <li v-if="level === 1 || level === 2" class="list-item" @click="() => emit('newIndex')">
        <Space>
          <span>
            <IconPlus />
          </span>
          <span>新建索引</span>
        </Space>
      </li>

      <li v-if="level === 2" class="list-item" @click="() => emit('deleteIndex')">
        <Space>
          <span>
            <IconDelete />
          </span>
          <span>删除索引</span>
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
