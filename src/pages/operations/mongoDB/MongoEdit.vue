<script lang="ts" setup>
import PageContainer from '@/components/PageContainer.vue';
import {
  Space,
  Switch,
  Table,
  Button,
  Modal,
  Select,
  Card,
  Row,
  Col,
  Input,
  Pagination,
  Cascader,
  Form,
  Alert,
  FormItem,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';

const selectedKeys = ref(['1', '2']);
const size = ref('medium');
const show = ref(true)

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = { pageSize: 7 };

const visible = ref(false);
const Modal_add_visible = ref(false);
const Modal_edit_visible = ref(false);
const Modal_delete_visible = ref(false);
const Modal_add_form = reactive({
  project: '',
  env: '',
  name: '',
  url: '',
});
const Modal_edit_form = reactive({
  project: '',
  env: '',
  name: '',
  url: '',
});

const Modal_add = () => {
  Modal_add_visible.value = true;
};
const Modal_edit = () => {
  Modal_edit_visible.value = true;
};

const Modal_delete = () => {
  Modal_delete_visible.value = true;
};
const handleBeforeOk = done => {
  console.log(Modal_add_form);
  window.setTimeout(() => {
    done();
    // prevent close
    // done(false)
  }, 3000);
};
const handleCancel = () => {
  visible.value = false;
};

const columns = [
  {
    title: '项目',
    dataIndex: 'project',
  },
  {
    title: '环境',
    dataIndex: 'env',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '连接url',
    dataIndex: 'url',
  },
  {
    title: '创建时间',
    dataIndex: 'time',
  },
  {
    title: '创建人',
    dataIndex: 'person',
  },

  {
    title: '操作',
    dataIndex: 'operation',
  },
];
const data = reactive([
  {
    key: '1',
    project: 'arco pro',
    env: 'prod',
    name: '测试mongo',
    url: '114.67.67.10:27017',
    time: '2022-10-09 19:15',
    person: 'yanghan',
    operation: '数据库',
  },
  {
    key: '2',
    project: 'element',
    env: 'abc',
    name: '测试element',
    url: '115.76.76.20:25874',
    time: '2022-10-09 21:37',
    person: 'monica',
    operation: '数据库',
  },
]);

const options = [
  {
    value: '项目',
    label: '项目',
    children: [
      {
        value: 'arco pro',
        label: 'arco pro',
      },
      {
        value: 'element',
        label: 'element',
      },
    ],
  },
];
</script>

<template>
  <PageContainer>
    <Card>
      <Row justify="start" :gutter="20">
        <Col :span="2">
          <Button @click="Modal_add" type="primary">
            <template #icon>
              <icon-plus />
            </template>
            添加
          </Button>
          <Modal
            v-model:visible="Modal_add_visible"
            title="新增mongoDB"
            @cancel="handleCancel"
            @before-ok="handleBeforeOk"
          >
            <Form :model="Modal_add_form" >
              <FormItem field="project" label="项目">
                <Select v-model="Modal_add_form.project" placeholder="请选择项目"> </Select>
              </FormItem>

              <FormItem field="env" label="环境">
                <Select v-model="Modal_add_form.env" placeholder="请选择环境"> </Select>
              </FormItem>

              <FormItem field="name" label="名称">
                <Select v-model="Modal_add_form.name" placeholder="请输入名称"> </Select>
              </FormItem>

              <FormItem field="url" label="url">
                <Select v-model="Modal_add_form.url" placeholder="请输入url"> </Select>
              </FormItem>
            </Form>
          </Modal>
        </Col>

        <Col :span="2">
          <Button @click="Modal_edit" type="primary">
            <template #icon>
              <IconLaunch />
            </template>
            编辑
          </Button>
          <Modal
            v-model:visible="Modal_edit_visible"
            title="编辑mongoDB"
            @cancel="handleCancel"
            @before-ok="handleBeforeOk"
          >
            <Form :model="Modal_edit_form">
              <FormItem field="projrct" label="项目">
                <Select v-model="Modal_edit_form.project" placeholder="请选择项目"> </Select>
              </FormItem>

              <FormItem field="env" label="环境">
                <Select v-model="Modal_edit_form.env" placeholder="请选择环境"> </Select>
              </FormItem>

              <FormItem field="name" label="名称">
                <Select v-model="Modal_edit_form.name" placeholder="请输入名称"> </Select>
              </FormItem>

              <FormItem field="url" label="url">
                <Select v-model="Modal_edit_form.url" placeholder="请输入url"> </Select>
              </FormItem>
            </Form>
          </Modal>
        </Col>

        <Col :span="2">
          <Button @click="Modal_delete" status="danger">
            <template #icon>
              <IconDelete />
            </template>
            删除
          </Button>
          <Modal
            v-model:visible="Modal_delete_visible"
            title="提示"
            @cancel="handleCancel"
            @before-ok="handleBeforeOk"
          >
            <Alert type="warning"> 确认删除该项目？</Alert>
          </Modal>
        </Col>

        <Col :span="13"></Col>
        <Col :span="1">
          <Cascader
            :options="options"
            :style="{ width: '300px' }"
            placeholder="请选择项目"
            search-button
          />
        </Col>

        <Col :span="4" style="text-align: right">
          <Button type="primary">
            <template #icon>
              <IconSearch />
            </template>
            搜索
          </Button>
        </Col>
      </Row>
    </Card>
    <Space direction="vertical" size="large" fill>
      <Table
        row-key="name"
        :columns="columns"
        :data="data"
        :row-selection="rowSelection"
        :pagination="false"
        v-model:selectedKeys="selectedKeys"
      >
      <template #操作="{ record }">
      <Button @click="$modal.info({ 
        title:'项目', content:record.project })">
        数据库</Button>
    </template>
      </Table>

      <Pagination
        :total="50"
        show-total
        show-jumper
      />
    </Space>
  </PageContainer>
</template>

