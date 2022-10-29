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
import { DOC_URL } from '@/api/url';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { DocinformationParams, DocListData } from '@/api/types';

const True = ref(true);
const False = ref(false);

const selectedKeys = ref(['1', '2']);
const size = ref('medium');
const show = ref(true);

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data, isLoading, execute } = useAxios<ResponseWrap<DocListData>>(
  DOC_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);

const handlePageChange = (page: number) => {
  pagination.current = page;
};

const DocData = computed(() => {
  return data.value?.data?.data;
});

const DocVisible = ref(false);

//新增文档
const NewDoc = () => {
  NewDocVisible.value = true;
};

const NewDocVisible = ref(false);
const NewDocForm = reactive({
  name: ' ',
});

const handleNewDocOk = () => {
  NewDocVisible.value = false;
};

const handleNewDocCancel = () => {
  NewDocVisible.value = false;
};

//删除文档
const handleDeleteDoc = () => {
  DeleteDocVisible.value = true;
};
const DeleteDocVisible = ref(false);
</script>

<template>
  <Button @click="NewDoc()" type="primary">
    <template #icon>
      <icon-plus />
    </template>
    新建
  </Button>
  <Modal
    v-model:visible="NewDocVisible"
    title="新建文档"
    :draggable="true"
    @cancel="handleNewDocCancel()"
    @ok="handleNewDocOk()"
  >
    <Form :model="NewDocForm">
      <FormItem field="name" label="文档名">
        <Input v-model="NewDocForm.name" />
      </FormItem>
    </Form>
  </Modal>

  <Table :pagination="false" :bordered="false">
    <Table row-key="uuid" :data="DocData" :bordered="false">
      <template #columns>
        <TableColumn title="uuid" data-index="uuid" />
        <TableColumn title="数据库名" data-index="dbName" />
        <TableColumn title="集合名" data-index="collectionName" />
        <TableColumn title="操作">
          <template #cell>
            <Popconfirm type="warning" content="确认删除该文档？" @ok="() => handleDeleteDoc()">
              <Button type="text" status="danger">删除</Button>
            </Popconfirm>
          </template>
        </TableColumn>
      </template>
    </Table>
  </Table>
</template>
