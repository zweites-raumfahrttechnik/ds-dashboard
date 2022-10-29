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
import { INDEX_URL } from '@/api/url';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { IndexinformationParams, IndexListData } from '@/api/types';

const True = ref(true);
const False = ref(false);

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<IndexListData>>(
  INDEX_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);

const handlePageChange = (page: number) => {
  pagination.current = page;
};

const IndexData = computed(() => {
  return data.value?.data?.data;
});

const IndexVisible = ref(false);

//新增属性
const NewIndexVisible = ref(false);
const NewIndexForm = reactive({
  name: ' ',
});

const NewIndex = () => {
  NewIndexVisible.value = true;
};

const handleNewIndexOk = () => {
  NewIndexVisible.value = false;
};

const handleNewIndexCancel = () => {
  NewIndexVisible.value = false;
};

const handleDeleteIndex = () => {
  DeleteIndexVisible.value = true;
};
const DeleteIndexVisible = ref(false);
</script>

<template>
  <tempalate>
    <Button @click="NewIndex()" type="primary">
      <template #icon>
        <icon-plus />
      </template>
      新建
    </Button>
    <Modal
      v-model:visible="NewIndexVisible"
      title="新建索引"
      :draggable="true"
      @cancel="handleNewIndexCancel()"
      @ok="handleNewIndexOk()"
    >
      <Form :model="NewIndexForm">
        <FormItem field="name" label="索引名">
          <Input v-model="NewIndexForm.name" />
        </FormItem>
      </Form>
    </Modal>
    <Table :pagination="false" :bordered="false">
      <Table row-key="uuid" :data="IndexData" :bordered="false">
        <template #columns>
          <TableColumn title="uuid" data-index="uuid" />
          <TableColumn title="数据库名" data-index="dbName" />
          <TableColumn title="集合名" data-index="collectionName" />
          <TableColumn title="操作">
            <template #cell>
              <Popconfirm type="warning" content="确认删除该索引？" @ok="() => handleDeleteIndex()">
                <Button type="text" status="danger">删除</Button>
              </Popconfirm>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Table>
  </tempalate>
</template>
