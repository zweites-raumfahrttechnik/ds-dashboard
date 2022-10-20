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
//文本输入框输入时执行
const handleinput = () => {};
</script>

<template>
  <PageContainer>
    <Card>
      <Form :model="from">
        <Row :gutter="20">
          <Col :span="7">
            <FormItem label="数据库">
              <Select placeholder="请选择数据库">
                <Option :value="1">MySQL</Option>
                <Option :value="2">达梦数据库</Option>
                <Option :value="3">金仓数据库</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="7">
            <FormItem label="表名">
              <Input placeholder="请输入查询的表名" />
            </FormItem>
          </Col>
        </Row>
      </Form>

      <Divider />
      <Space>
        <Row>
          <Col>
            <Tag color="green" size="large">
              <template #icon>
                <icon-play-arrow />
              </template>
            </Tag>
            <Divider direction="vertical" />
            <Tag color="orangered" size="large">
              <template #icon>
                <icon-sun-fill />
              </template>
            </Tag>
            <Divider direction="vertical" />
            <Tag color="blue" size="large">
              <template #icon>
                <icon-check />
              </template>
            </Tag>
            <Divider direction="vertical" />
            <Tag color="arcoblue" size="large">
              <template #icon>
                <icon-drive-file />
              </template>
            </Tag>
          </Col>

          <Col class="TextInput">
            <textarea placeholder="请输入查询语句" auto-size @input="handleinput"></textarea>
          </Col>
        </Row>
      </Space>
    </Card>
  </PageContainer>
</template>
<style scoped lang="less">
.TextInput {
  width: 100%;
  height: 360px;
}
</style>
