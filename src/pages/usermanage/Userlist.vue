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

import Formlist from './components/Adduserdata.vue';
import Successadd from './components/Successaddpages.vue';
import ReviseForm from './components/Reviseuserdata.vue';
import Treepermission from './components/Permissionslist.vue';

import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { Add_Userlist, Delete_User_URl } from '@/api/url';
//引入传回参数
import { UserlistData } from '@/api/types';

const visibleAdd = ref(false);
const visibleChange = ref(false);
const visibleAssignment = ref(false);

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});
//data为请求返回的数据,重命名为res--自定义操作
const {
  data: res,
  isLoading,
  execute,
} = useAxios<ResponseWrap<UserlistData>>(Add_Userlist, { method: 'GET' }, instance);

//删除操作
const { execute: deleteExecute, isLoading: deleteIsLoading } = useAxios(
  Delete_User_URl,
  { method: 'DELETE' },
  instance,
  {
    immediate: false,
  },
);
//进行数据的检测
const tableData = computed(() => {
  return res.value?.data?.data;
});

const step = ref(0);

const changeStep = (idx: number) => {
  step.value = idx;
};

//显示不同的行数，待做
const handleChange = () => {};

//事件-添加用户--显示对话框
const adduseraccount = () => {
  visibleAdd.value = true;
};
//事件-搜索用户列表
const searchuserlist = () => {};

//编辑对话框
const reviseuserdata=()=>{
  visibleChange.value=true
}

//删除用户数据
const handleDeleteAccount = (uuid:string,type:1|2|3,username:string,host:string) => {
  deleteExecute({ data: { uuid,type,username,host } }).then(() => {
    execute({ params: { pg: pagination.current, size: pagination.pageSize } });
  });
};

//分配权限
const assignmentpermission = () => {
  visibleAssignment.value = true;
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

        <Divider direction="horizontal" type="dashed" />
        <!--请求数据列表-->
        <Col>
          <Table id="userTable" row-key="uuid" :data="tableData">
            <template #columns>
              <TableColumn title="uuid" data-index="uuid" />
              <TableColumn title="用户类型" data-index="type">
                <template #cell="{ record }">
                  <span v-if="record.type === 1">MySQL</span>
                  <span v-else-if="record.type === 2">达梦数据库</span>
                  <span v-else>金仓数据库</span>
                </template>
              </TableColumn>
              <TableColumn title="用户名" data-index="username" />
              <TableColumn title="主机地址" data-index="host" />
              <TableColumn title="密码" data-index="password" />
              <TableColumn title="修改">
                <template #cell>
                  <Button status="success" @click="reviseuserdata">编辑</Button>
                </template>
              </TableColumn>
              <!--定义删除用户数据操作//ok--点击确认按钮时触发-->
              <TableColumn title="操作">
                <template #cell="{ record }">
                  <Popconfirm
                    content="请确认是否删除此用户数据"
                    @ok="() => handleDeleteAccount(record.uuid,record.type,record.username,record.host)"
                    type="warning"
                  >
                    <Button status="danger">删除</Button>
                  </Popconfirm>
                </template>
              </TableColumn>

              <TableColumn title="权限">
                <template #cell>
                  <Button type="primary" @click="assignmentpermission">分配</Button>
                </template>
              </TableColumn>
            </template>
          </Table>
        </Col>
      </Row>
    </Card>
    <!--对话框-添加用户-->
    <Modal v-model:visible="visibleAdd" :hide-cancel="true">
      <template #title> 添加用户 </template>
      <KeepAlive>
        <Formlist v-if="step === 0" @change-step="changeStep" />
        <Successadd v-else-if="step === 1" @change-step="changeStep" />
      </KeepAlive>
    </Modal>

    <!--修改用户信息-->
    <Modal v-model:visible="visibleChange" :hide-cancel="true">
      <template #title> 修改用户信息 </template>
      <ReviseForm />
    </Modal>

    <!--分配权限-->
    <Modal v-model:visible="visibleAssignment" :hide-cancel="true">
      <template #title>分配权限</template>
      <Treepermission />
    </Modal>
  </PageContainer>
</template>
