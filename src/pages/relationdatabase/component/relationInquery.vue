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
  Tag,
} from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';

import { instance } from '@/api';

import { InQUERY_DATABASE_URL } from '@/api/url';
import { ApifoxModal, defaultInqueryValue } from '../types';

//change-step定义界面跳转
const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
}>();

//设定默认值
const Inquerydata = reactive<ApifoxModal>({
  ...defaultInqueryValue[1],
  type: 1,
});
//表单检验
const formRef = ref<FormInstance>();

//定义请求参数pg//size
const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

//引入POST请求--instance为axios实例
//请求参数-固定值
//响应数据data
const { data, execute, isLoading } = useAxios(
  InQUERY_DATABASE_URL,
  { method: 'POST', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
  {
    immediate: false,
  },
);

const tableData = computed(() => {
  return data.value?.data?.data;
});

//表单提交函数//同时进行表单检验
const InquerySubmit = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }
  execute({
    data: {
      ...Inquerydata,
    },
  }).then(() => {
    formRef.value?.resetFields();
    emit('change-step', 1);
  });
};
</script>
<template>
  <Space :size="15" direction="vertical" fill>
    <Card>
      <template #title>关系型数据库单表查询</template>
      <Row>
        <Col :flex="1">
          <!--label-col-props标签元素布局//wrapper-col-props表单元素布局-->
          <!--submit方法，表单提交时触发-->
          <Form
            ref="formRef"
            :model="Inquerydata"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            @submit="InquerySubmit"
          >
            <Row :gutter="16">
              <Col :span="7">
                <FormItem field="type" label="数据库" required>
                  <Select v-model="Inquerydata.type" placeholder="请选择数据库">
                    <Option :value="1">MySQL</Option>
                    <Option :value="2">达梦数据库</Option>
                    <Option :value="3">金仓数据库</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="7">
                <FormItem filed="table" label="表名" required>
                  <Input v-model="Inquerydata.table" placeholder="请输入查询的表名" />
                </FormItem>
              </Col>
              <Col :span="10">
                <FormItem label="查询条件-列名">
                  <Input :model="Inquerydata.whereList[0]" placeholder="请输入查询条件" />
                </FormItem>
              </Col>
              <Col :span="10">
                <FormItem label="指定列类型">
                  <Input :model="Inquerydata.whereList[1]" placeholder="请输入列类型" />
                </FormItem>
              </Col>
              <Col :span="10">
                <FormItem label="查询条件-运算符">
                  <Input :model="Inquerydata.whereList[2]" placeholder="请输入查询条件" />
                </FormItem>
              </Col>
              <Col :span="10">
                <FormItem label="查询条件-值">
                  <Input :model="Inquerydata.whereList[3]" placeholder="请输入查询条件" />
                </FormItem>
              </Col>
              <Col :span="10">
                <FormItem label="分组指定列1">
                  <Input :model="Inquerydata.groupByList[0]" placeholder="请输入列名1" />
                </FormItem>
              </Col>
              <Col :span="10">
                <FormItem label="分组指定列2">
                  <Input :model="Inquerydata.groupByList[1]" placeholder="请输入列名2" />
                </FormItem>
              </Col>
              <!--OrderByList--排序-->
              <Col :span="10">
                <FormItem label="指定排序列">
                  <Input :model="Inquerydata.orderByList[0]" placeholder="请输入列名" />
                </FormItem>
              </Col>
              <Col :span="10">
                <FormItem label="排序类型">
                  <Input :model="Inquerydata.orderByList[1]" placeholder="请输入排序类型" />
                </FormItem>
              </Col>
              <FormItem>
                <Button html-type="submit" type="primary">提交</Button>
              </FormItem>
            </Row>
          </Form>
        </Col>
      </Row>
      <Divider />
      <!--返回值，错误较多-->
      <Table :data="tableData">
        <template #columns>
          <TableColumn title="columnName" data-index="columnList[0]" />
          <TableColumn title="columnTypeName" data-index="columnList[1]" />
          <TableColumn title="data-1" data-index="data[0]" />
          <TableColumn title="data-2" data-index="data[1]" />
        </template>
      </Table>
    </Card>
  </Space>
</template>
<style scoped lang="less"></style>
