<script setup lang="ts">
import {
  Form,
  FormItem,
  Row,
  Col,
  Space,
  Divider,
  Button,
  Select,
  Option,
} from '@arco-design/web-vue';

import { useVisibleTableStore, useListStore } from '../hooks';

const { searchFormRef, searchFormData, pagination, refreshList } = useVisibleTableStore()!;

const { userList, userIsLoading, userSelectLoadMore } = useListStore()!;

const handleSearch = () => {
  refreshList();
};

const handleFromReset = () => {
  searchFormRef.value?.resetFields();

  if (pagination.current !== 1) {
    pagination.current = 1;
  }
  refreshList();
};
</script>

<template>
  <Row>
    <Col :flex="1">
      <Form
        ref="searchFormRef"
        :model="searchFormData"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <Row :gutter="16">
          <Col :span="8">
            <FormItem
              field="userUuid"
              label="用户名"
              :rules="[{ required: true, message: '请选择用户名' }]"
              :virtual-list-props="{ height: 20 }"
            >
              <Select
                v-model="searchFormData.userUuid"
                :loading="userIsLoading"
                allow-clear
                allow-search
                @dropdown-reach-bottom="userSelectLoadMore"
              >
                <Option v-for="item in userList" :key="item.userName" :value="item.userUuid">
                  {{ item.userName }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>

    <Divider style="height: 34px" direction="vertical" />

    <Col :flex="'86px'" style="text-align: right">
      <Space :size="8">
        <Button type="primary" @click="handleSearch">
          <template #icon>
            <IconSearch />
          </template>
          查询
        </Button>
        <Button @click="handleFromReset">
          <template #icon>
            <IconLoop />
          </template>
          重置
        </Button>
      </Space>
    </Col>
  </Row>
</template>
