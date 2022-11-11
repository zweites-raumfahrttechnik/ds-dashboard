<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Modal } from '@arco-design/web-vue';

import { instance } from '@/api';
import { MONGODB_QUERY_URL } from '@/api/url';

import JsonEditor from '@/components/JsonEditor.vue';
import JsonCard from './JsonCard.vue';

const props = defineProps<{
  value: string;
  selectedKeys: string[];
}>();

const emit = defineEmits<{ (event: 'refresh'): void }>();

const { execute: executeDelete } = useAxios(MONGODB_QUERY_URL, { method: 'DELETE' }, instance, {
  immediate: false,
});

const { execute: executePost } = useAxios(MONGODB_QUERY_URL, { method: 'POST' }, instance, {
  immediate: false,
});

const selectJson = reactive<{ json: string; _id: string }>({ _id: '', json: '{}' });
const visible = ref(false);

const handleDelete = async () => {
  const { _id } = JSON.parse(props.value);

  await executeDelete({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
      isMany: true,
      items: [
        {
          field: '_id',
          op: 'EQ',
          target: _id['$oid'],
        },
      ],
    },
  });

  emit('refresh');
};

const handleEdit = () => {
  const { _id, ...rest } = JSON.parse(props.value);

  selectJson._id = _id['$oid'];
  selectJson.json = JSON.stringify(rest);
  visible.value = true;
};

const handleModify = async () => {
  await executePost({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
      isMany: true,
      items: [
        {
          field: '_id',
          op: 'EQ',
          target: selectJson._id,
        },
      ],
      documents: [selectJson.json],
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
