<script lang="ts" setup>
import {
  Form,
  FormItem,
  Input,
  Space,
  Table,
  TableColumn,
  Button,
  Popconfirm,
  Modal,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import { COLLECTION_URL } from '@/api/url';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { CollectioninformationParams, CollectionListData } from '@/api/types';

const True = ref(true);
const False = ref(false);

const selectedKeys = ref(['1', '2']);
const size = ref('medium');
const show = ref(true);

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<CollectionListData>>(
  COLLECTION_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);

const handlePageChange = (page: number) => {
  pagination.current = page;
};

const CollectionData = computed(() => {
  return data.value?.data?.data;
});

//新建集合
const NewCollection = () => {
  NewCollectionVisible.value = true;
};

const NewCollectionVisible = ref(false);
const NewCollectionForm = reactive({
  name: ' ',
});

const handleNewCollectionOk = () => {
  NewCollectionVisible.value = false;
};
const handleNewCollectionCancel = () => {
  NewCollectionVisible.value = false;
};

//删除集合
const handleDeleteCollection = () => {
  DeleteCollectionVisible.value = true;
};
const DeleteCollectionVisible = ref(false);
</script>

<template>
  <Button @click="NewCollection()" type="primary">
    <template #icon>
      <icon-plus />
    </template>
    新建
  </Button>
  <Modal
    v-model:visible="NewCollectionVisible"
    title="新建集合"
    :draggable="true"
    @cancel="handleNewCollectionCancel()"
    @ok="handleNewCollectionOk()"
  >
    <Form :model="NewCollectionForm">
      <FormItem field="name" label="集合名">
        <Input v-model="NewCollectionForm.name" />
      </FormItem>
    </Form>
  </Modal>

  <Table row-key="uuid" :data="CollectionData" :bordered="false">
    <template #columns>
      <TableColumn title="uuid" data-index="uuid" />
      <TableColumn title="数据库名" data-index="dbName" />
      <TableColumn title="操作">
        <template #cell>
          <Popconfirm
            type="warning"
            content="确认删除该集合？"
            @ok="() => handleDeleteCollection()"
          >
            <Button type="text" status="danger">删除</Button>
          </Popconfirm>
        </template>
      </TableColumn>
    </template>
  </Table>
</template>
