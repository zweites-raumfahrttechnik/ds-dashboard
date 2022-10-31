<script setup lang="ts">
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';

const props = withDefaults(
  defineProps<{
    value: string | Record<string, unknown>;
    height?: string;
    width?: string;
    options?: Record<string, unknown> | null;
    currentMode?: string;
    modeList?: string[];
  }>(),
  {
    height: '500px',
    width: 'auto',
    options: null,
    currentMode: 'tree',
    modeList: () => ['tree', 'code', 'form', 'text', 'view'],
  },
);

const emit = defineEmits<{
  (event: 'update:value', val: string): void;
  (event: 'onChange', json: string): void;
}>();

// 编辑器实例
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let editor = null as any;
// 值类型
let valueType = 'string';
// 是否内部改变(即onChange事件双向绑定)，内部改变则不需要重新赋值给editor
let internalChange = false;

const jsoneditorRef = ref(null);
const state = reactive({
  height: '500px',
  width: 'auto',
});

const setJson = (value: string | Record<string, unknown>) => {
  if (internalChange) {
    return;
  }

  if (typeof value == 'string') {
    valueType = 'string';
    editor?.set(JSON.parse(value));
  } else {
    valueType = 'object';
    editor?.set(value);
  }
};

const onChange = () => {
  const json = editor.get();

  if (valueType == 'string') {
    emit('update:value', JSON.stringify(json));
  } else {
    emit('update:value', json);
  }

  emit('onChange', json);

  internalChange = true;
  nextTick(() => {
    internalChange = false;
  });
};

const init = () => {
  const finalOptions = {
    ...props.options,
    mode: props.currentMode,
    modes: props.modeList,
    onChange,
  };
  editor = new JSONEditor(jsoneditorRef.value, finalOptions);
};

onMounted(() => {
  state.width = props.width;
  state.height = props.height;

  init();
  setJson(props.value);
});

onUnmounted(() => {
  editor?.destroy();
  editor = null;
});

watch(
  () => props.value,
  newValue => {
    if (!editor) {
      init();
    }
    setJson(newValue);
  },
);
</script>

<template>
  <div ref="jsoneditorRef" :style="{ height: height, width: width }"></div>
</template>

<style lang="less">
div.jsoneditor-menu {
  display: none;
}

/* stylelint-disable-next-line selector-class-pattern */
a.jsoneditor-poweredBy {
  display: none;
}
</style>
