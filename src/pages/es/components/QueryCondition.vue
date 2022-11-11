<script setup lang="ts">
import { Link, Space, Modal, Popover } from '@arco-design/web-vue';
import { IconSettings } from '@arco-design/web-vue/es/icon';

import JsonEditor from '@/components/JsonEditor.vue';

const props = defineProps<{ linkTitle: string }>();

const emit = defineEmits<{ (event: 'handleSetCondition', condition: string): void }>();

const json = ref<string>('{}');
const visible = ref(false);

const handleSetLinkClick = () => {
  visible.value = true;
};

const handleModalOk = () => {
  emit('handleSetCondition', json.value);
};
</script>

<template>
  <Space>
    <div :style="{ minWidth: '90px' }">
      <Popover>
        <Link @click="handleSetLinkClick">
          <template #icon>
            <IconSettings />
          </template>
          {{ props.linkTitle }}
        </Link>
        <template #content>
          <JsonEditor :value="json" current-mode="view" width="400px"></JsonEditor>
        </template>
      </Popover>
    </div>
  </Space>

  <Modal v-model:visible="visible" title="设置条件" @ok="handleModalOk">
    <JsonEditor v-model:value="json"></JsonEditor>
  </Modal>
</template>
