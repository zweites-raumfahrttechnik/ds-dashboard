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
                <Col :span="8">
                  <FormItem label="数据库">
                    <Select placeholder="请选择数据库">
                      <Option :value="1">MySQL</Option>
                      <Option :value="2">达梦数据库</Option>
                      <Option :value="3">金仓数据库</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col :span="8">
                  <FormItem label="表名">
                    <Select placeholder="选择表查看表数据"> </Select>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <Card>
        <Space>
          <Tag color="green">
            <template #icon>
              <icon-play-arrow />
            </template>
          </Tag>
          <Tag color="orangered">
            <template #icon>
              <icon-sun-fill />
            </template>
          </Tag>
          <Tag color="blue">
            <template #icon>
              <icon-check />
            </template>
          </Tag>
          <Tag color="arcoblue">
            <template #icon>
              <icon-drive-file />
            </template>
          </Tag>
        </Space>
      </Card>
    </Space>
  </PageContainer>
</template>
