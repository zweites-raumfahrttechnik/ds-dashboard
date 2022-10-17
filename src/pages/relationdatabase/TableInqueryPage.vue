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

import { RelationInqurey } from '@/api/url';
</script>
<template>
  <PageContainer>
    <Space :size="15" direction="vertical" fill>
      <Card>
        <template #title>关系型数据库单表查询</template>
        <Row>
          <Col :flex="1">
            <Form :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
              <Row :gutter="16">
                <Col :span="7">
                  <FormItem label="数据库" required>
                    <Select placeholder="请选择数据库">
                      <Option :value="1">MySQL</Option>
                      <Option :value="2">达梦数据库</Option>
                      <Option :value="3">金仓数据库</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col :span="7">
                  <FormItem label="表名" required>
                    <Input placeholder="请输入查询的表名" />
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="查询条件-列名">
                    <Input placeholder="请输入查询条件" />
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="查询条件-运算符">
                    <Input placeholder="请输入查询条件" />
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="查询条件-值">
                    <Input placeholder="请输入查询条件" />
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="分组指定列1">
                    <Input placeholder="请输入列名1" />
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="分组指定列2">
                    <Input placeholder="请输入列名2" />
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="排序类型">
                    <Input placeholder="请输入排序类型" />
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="指定排序列">
                    <Input placeholder="请输入列名" />
                  </FormItem>
                </Col>
                <FormItem>
                  <Button html-type="submit" type="primary">提交</Button>
                </FormItem>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <!--数据显示部分//多行输入-->
      <Card class="ResultOutput"> </Card>
    </Space>
  </PageContainer>
</template>
<style scoped lang="less">
.ResultOutput {
  width: 100%;
  height: 300px;
}
</style>
