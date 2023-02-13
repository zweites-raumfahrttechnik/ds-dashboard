<script setup lang="ts">
import { Space, Button, Divider } from '@arco-design/web-vue';
import { EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { Codemirror } from 'vue-codemirror';
import { sql } from '@codemirror/lang-sql';
import { format } from 'sql-formatter';

interface Payload {
  view: EditorView;
  state: EditorState;
  container: HTMLDivElement;
}

const emit = defineEmits<{
  (event: 'exec', code: string): void;
}>();

const extensions = [sql()];

const code = ref('');
const view = shallowRef<EditorView>();

const handleReady = (payload: Payload) => {
  view.value = payload.view;
};

const handleExec = () => {
  const selection = view.value?.state.selection;
  const from = selection?.ranges[0].from;
  const to = selection?.ranges[0].to;

  if (from === to) {
    emit('exec', code.value);
  }
};

const handleFormat = () => {
  code.value = format(code.value);
};

watch(
  () => code.value,
  () => {
    handleExec();
  },
);
</script>

<template>
  <Space>
    <Button @click="handleFormat">格式化</Button>
  </Space>

  <Divider :style="{ margin: '10px' }" />

  <Codemirror
    v-model="code"
    placeholder="请输入 SQL 查询语句"
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
  />
</template>

<style lang="less">
.cm-editor {
  outline: none !important;
}
</style>
