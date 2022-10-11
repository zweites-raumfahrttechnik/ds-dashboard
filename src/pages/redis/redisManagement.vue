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

import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { Userlist_Account } from '@/api/url';
//引入传回参数
import { UserlistData } from '@/api/types';

const visible1 = ref(false);
const visible2 = ref(false);

const { data } = useAxios<ResponseWrap<UserlistData>>(
  Userlist_Account,
  { method: 'GET' },
  instance,
);

const { execute: deleteExecute, isLoading: deleteIsLoading } = useAxios(
  Userlist_Account,
  { method: 'DELETE' },
  instance,
  {
    immediate: false,
  },
);
 
const tableData = computed(() => {
  return data.value?.data?.data;
});

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
const handleDeleteAccount = (uuid: string) => {
};
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
      <Table id="userTable" row-key="uuid" :data="tableData" :bordered="{ cell: true }">
        <template #columns>
          <TableColumn title="uuid" data-index="uuid" />
          <TableColumn title="用户名" data-index="username" />
          <TableColumn title="密码" data-index="password" />
          <TableColumn title="修改">
            <template #cell>
              <Button status="success" @click="changeuserdata">编辑</Button>
            </template>
          </TableColumn>
          <TableColumn title="操作">
            <template #cell="{ record }">
              <!--点击确认时，执行deleteuserdata方法-->
              <Popconfirm content="请确认是否删除此用户数据" @ok="() => handleDeleteAccount(record.uuid)" type="warning">
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
      <Form>
        <FormItem label="用户名">
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="密码">
          <Input placeholder="请输入用户密码" />
        </FormItem>
      </Form>
      <template #footer>
        <Button type="primary">取消</Button>
        <Button type="primary">确认</Button>
      </template>
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
