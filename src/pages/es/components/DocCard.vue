<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Modal } from '@arco-design/web-vue';

import { instance } from '@/api';
import { ES_DELETE_DOC, ES_UPDATE_DOC } from '@/api/url';

import JsonEditor from '@/components/JsonEditor.vue';

import JsonCard from './JsonCard.vue';

const props = defineProps<{
  value: string;
  selectedKeys: string[];
}>();

const emit = defineEmits<{ (event: 'refresh'): void }>();

const { execute: executeDelete } = useAxios(ES_DELETE_DOC, { method: 'DELETE' }, instance, {
  immediate: false,
});

const { execute: executePost } = useAxios(ES_UPDATE_DOC, { method: 'PUT' }, instance, {
  immediate: false,
});

const selectJson = reactive<{ json: string; _id: string }>({ _id: '', json: '{}' });
const visible = ref(false);

const handleDelete = async () => {
  const { _id } = JSON.parse(props.value);

  await executeDelete({
    data: {
      uuid: props.selectedKeys[0],
      index: props.selectedKeys[1],
      docid: _id,
    },
  });

  emit('refresh');
};

const handleEdit = () => {
  const { _id, _source } = JSON.parse(props.value);

  selectJson._id = _id;
  selectJson.json = JSON.stringify({ doc: { ..._source } });
  visible.value = true;
};

const handleModify = async () => {
  await executePost({
    data: {
      uuid: props.selectedKeys[0],
      index: props.selectedKeys[1],
      docid: selectJson._id,
      entityInfo: selectJson.json,
    },
  });

  emit('refresh');
};
</script>

<template>
  <JsonCard
    :value="props.value"
    :editable="true"
    :deletable="true"
    @edit="handleEdit"
    @delete="handleDelete"
  />

  <Modal v-model:visible="visible" title="浏览" @ok="handleModify">
    <JsonEditor v-model:value="selectJson.json" />
  </Modal>
</template>
