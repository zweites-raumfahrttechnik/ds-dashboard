<script lang="ts" setup>
import {
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Select,
  Space,
  Option,
  Divider,
  Table,
  TableColumn,
  Button,
  Popconfirm,
  Modal,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import PageContainer from '@/components/PageContainer.vue';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';

import { instance } from '@/api';
import { Add_Userlist } from '@/api/url';

import { UserFormlist, defaultUserFormlist } from './type';
const visible1 = ref(false);
const visible2 = ref(false);
const formRef = ref<FormInstance>();
//默认情况
const formdata = reactive<UserFormlist>({
  //默认情况
  ...defaultUserFormlist[1],
  type: 1,
});
const { execute, isLoading } = useAxios(Add_Userlist, { method: 'POST' }, instance, {
  immediate: false,
});

const handleSubmit = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }
  execute({
    data: {
      ...formdata,
    },
  }).then(() => {
    formRef.value?.resetFields();
  });
};

//显示不同的行数，待做
const handleChange = () => {};

//事件-添加用户
const adduseraccount = () => {
  visible1.value = true;
};
//事件-搜索用户列表
const searchuserlist = () => {};
searchuserlist();
//修改用户数据
const changeuserdata = () => {
  visible2.value = true;
};
//删除用户数据
const handleDeleteAccount = (uuid: string) => {};
</script>

<template>
  <PageContainer>
    <Card>
      <Row justify="start" :gutter="20">
        <Col :span="2">
          <Button type="primary" @click="adduseraccount">
            <template #icon>
              <IconPlus />
            </template>
            添加用户
          </Button>
        </Col>
        <Col :span="13"></Col>
        <Col :span="5">
          <Input :style="{ width: '350px' }" placeholder="请输入查询内容" search-button />
        </Col>
        <Col :span="4" style="text-align: right">
          <Space>
            <Button type="primary" @click="searchuserlist">
              <template #icon>
                <IconSearch />
              </template>
              搜索
            </Button>
          </Space>
        </Col>
        <Col flex="auto"></Col>
      </Row>
    </Card>

    <Divider direction="horizontal" type="dashed" />
    <Card>
      <Table :model="formdata">
        <template #columns>
          <TableColumn title="uuid" v-model="formdata.uuid" />
          <TableColumn title="用户类型" v-model="formdata.type">
            <template #cell="{ record }">
              <span v-if="record.type === 1">MySQL</span>
              <span v-else-if="record.type === 2">达梦数据库</span>
              <span v-else>金仓数据库</span>
            </template>
          </TableColumn>
          <TableColumn title="用户名" v-model="formdata.username"/>
          <TableColumn title="主机地址" v-model="formdata.host"/>
          <TableColumn title="密码" v-model="formdata.password" />
          <TableColumn title="修改">
            <template #cell>
              <Button status="success" @click="changeuserdata">编辑</Button>
            </template>
          </TableColumn>
          <TableColumn title="操作">
            <template #cell="{ record }">
              <!--点击确认时，执行deleteuserdata方法-->
              <Popconfirm
                content="请确认是否删除此用户数据"
                @ok="() => handleDeleteAccount(record.uuid)"
                type="warning"
              >
                <Button status="warning">删除</Button>
              </Popconfirm>
            </template>
          </TableColumn>
          <TableColumn title="权限">
            <template #cell>
              <Button type="primary">分配</Button>
            </template>
          </TableColumn>
        </template>
      </Table>
    </Card>

    <!--对话框-添加用户-->
    <Modal v-model:visible="visible1">
      <template #title> 添加用户 </template>
      <Spin :loading="isLoading">
        <Form ref="formRef" :model="formdata" class="form" @submit="handleSubmit">
          <FormItem label="uuid">
            <Input v-model="formdata.uuid" />
          </FormItem>
          <FormItem label="用户类型" field="type">
            <Select v-model="formdata.type">
              <Option :value="1" label="MySQL">MySQL</Option>
              <Option :value="2" label="DM">达梦数据库</Option>
              <Option :value="3" label="Kingbase">金仓数据库</Option>
            </Select>
          </FormItem>
          <FormItem label="用户名">
            <Input v-model="formdata.username" placeholder="请输入用户名" />
          </FormItem>
          <FormItem label="主机地址">
            <Input v-model="formdata.host" placeholder="请输入用户主机地址" />
          </FormItem>
          <FormItem label="密码">
            <Input v-model="formdata.password" placeholder="请输入用户密码" />
          </FormItem>
        </Form>
        <template #footer>
          <Button type="primary">取消</Button>
          <Button html-type="submit" type="primary">提交</Button>
        </template>
      </Spin>
    </Modal>
    <!--修改用户信息-->
    <Modal v-model:visible="visible2">
      <template #title> 修改用户信息 </template>
      <Form>
        <FormItem label="用户名">
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="主机地址">
          <Input placeholder="请输入用户主机地址" />
        </FormItem>
        <FormItem label="密码">
          <Input placeholder="请输入用户密码" />
        </FormItem>
      </Form>
    </Modal>
  </PageContainer>
</template>
