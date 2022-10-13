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
  Tag
} from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';

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
                    <Input placeholder="请输入查询的表名"/>
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="查询条件-列名">
                    <Input placeholder="请输入查询条件"/>
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="查询条件-运算符">
                    <Input placeholder="请输入查询条件"/>
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="查询条件-值">
                    <Input placeholder="请输入查询条件"/>
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="分组指定列1">
                    <Input placeholder="请输入列名1"/>
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="分组指定列2">
                    <Input placeholder="请输入列名2"/>
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="排序类型">
                    <Input placeholder="请输入排序类型"/>
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="指定排序列">
                    <Input placeholder="请输入列名"/>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
     
    </Space>
  </PageContainer>
</template>
