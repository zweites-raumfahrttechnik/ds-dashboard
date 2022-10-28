<script lang="ts" setup>
import {
  Card,
  Form,
  FormItem,
  Button,
  Row,
  Col,
  Select,
  Option,
  Input,
  Divider,
  Table,
} from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import { reactive } from 'vue';
//上传数据
const form = reactive({
  type: '',
  table: '',
  name: '',
  columnList: [{ column: '' }],
  whereList: [{ column: '', columnType: '', value: '', queryType: '' }],
  groupByList: [{ column: '' }],
  orderByList: [{ type: '', column: '' }],
});
const handleAddInquery = () => {
  form.columnList.push({
    column: '',
  });
};

const handleAddGroup = () => {
  form.groupByList.push({
    column: '',
  });
};
const handleAddWhere = () => {
  form.whereList.push({
    column: '',
    columnType: '',
    value: '',
    queryType: '',
  });
};
const handleAddOrder = () => {
  form.orderByList.push({
    type: '',
    column: '',
  });
};
const handleDelteWhere = (index: number) => {
  form.whereList.splice(index, 1);
};
const handleDeleteInquery = (index: number) => {
  form.columnList.splice(index, 1);
};
const handleDeleteGroup = (index: number) => {
  form.groupByList.splice(index, 1);
};
const handleDeleteOrder = (index: number) => {
  form.orderByList.splice(index, 1);
};
//提交
const handlesubmit = () => {};
</script>
<template>
  <PageContainer>
    <Card>
      <template #title> 单表数据库查询 </template>
      <Form :model="form" @submit="handlesubmit" :style="{ width: '75%' }">
        <FormItem
          field="type"
          label="数据库类型"
          :content-flex="false"
          :merge-props="false"
          required
        >
          <Row :gutter="8">
            <Col :span="23">
              <FormItem no-style>
                <Select v-model="form.type" default-value="1">
                  <Option :value="1">MySQL</Option>
                  <Option :value="2">达梦数据库</Option>
                  <Option :value="3">金仓数据库</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem field="table" label="表名" :content-flex="false" :merge-props="false" required>
          <Row :gutter="8">
            <Col :span="23">
              <FormItem no-style>
                <Input v-model="form.table" placeholder="请输入查询表名" allow-clear />
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          v-for="(post, index) of form.columnList"
          :field="`columnList.${index + 1}.column`"
          :label="`查询列名${index + 1}`"
          :key="index"
          :content-flex="false"
          :merge-props="false"
        >
          <Row :gutter="8">
            <Col :span="20">
              <FormItem no-style>
                <Input v-model="post.column" placeholder="请输入查询列名" />
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Button @click="handleAddInquery" type="primary" status="success" shape="circle">
                  <template #icon>
                    <icon-plus size="25" />
                  </template>
                </Button>
                <Button
                  @click="handleDeleteInquery(index)"
                  :style="{ marginLeft: '10px' }"
                  status="danger"
                  shape="circle"
                >
                  <template #icon>
                    <icon-close size="25" />
                  </template>
                </Button>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          v-for="(post, index) in form.whereList"
          :field="`whereList.${index}`"
          :key="index"
          :label="`过滤条件${index + 1}`"
          :content-flex="false"
          :merge-props="false"
        >
          <Row :gutter="8">
            <Col :span="5">
              <FormItem no-style>
                <Input v-model="post.column" placeholder="请输入查询列名" />
              </FormItem>
            </Col>
            <Col :span="5">
              <FormItem no-style>
                <Select v-model="post.columnType" defalut-value="int">
                  <Option>int</Option>
                  <Option>string</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="5">
              <FormItem no-style>
                <Input v-model="post.value" placeholder="请输入过滤条件值" />
              </FormItem>
            </Col>
            <Col :span="5">
              <FormItem no-style>
                <Select v-model="post.queryType">
                  <Option>&gt;</Option>
                  <Option>&lt;</Option>
                  <Option>like</Option>
                  <Option>=</Option>
                  <Option>&le;</Option>
                  <Option>&ge;</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Button @click="handleAddWhere" type="primary" status="success" shape="circle">
                  <template #icon>
                    <icon-plus size="25" />
                  </template>
                </Button>

                <Button
                  @click="handleDelteWhere(index)"
                  :style="{ marginLeft: '10px' }"
                  status="danger"
                  shape="circle"
                >
                  <template #icon>
                    <icon-close size="25" />
                  </template>
                </Button>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          v-for="(post, index) of form.groupByList"
          :field="`groupByList.${index + 1}.column`"
          :label="`分组列名${index + 1}`"
          :key="index"
          :content-flex="false"
          :merge-props="false"
        >
          <Row :gutter="8">
            <Col :span="20">
              <FormItem no-style>
                <Input v-model="post.column" placeholder="请输入分组条件列" />
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Button @click="handleAddGroup" type="primary" status="success" shape="circle"
                  ><template #icon> <icon-plus size="25" /> </template
                ></Button>
                <Button
                  @click="handleDeleteGroup(index)"
                  :style="{ marginLeft: '10px' }"
                  status="danger"
                  shape="circle"
                >
                  <template #icon> <icon-close size="25" /> </template
                ></Button>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          v-for="(post, index) in form.orderByList"
          :field="`orderByList.${index}`"
          :key="index"
          :label="`排序条件${index + 1}`"
          :content-flex="false"
          :merge-props="false"
        >
          <Row :gutter="8">
            <Col :span="10">
              <FormItem filed="orderByList.type" no-style>
                <Select v-model="post.type">
                  <Option>ASC</Option>
                  <Option>DESC</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="10">
              <FormItem no-style>
                <Input v-model="post.column" placeholder="请输入查询列名" />
              </FormItem>
            </Col>
            <Col :span="4">
              <FormItem no-style>
                <Button @click="handleAddOrder" type="primary" status="success" shape="circle"
                  ><template #icon> <icon-plus size="25" /> </template
                ></Button>
                <Button
                  @click="handleDeleteOrder(index)"
                  :style="{ marginLeft: '10px' }"
                  status="danger"
                  shape="circle"
                >
                  <template #icon> <icon-close size="25" /> </template
                ></Button>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Button html-type="submit" type="primary">提交</Button>
        </FormItem>
      </Form>

      <Divider />
      <Table >
        <template #columns>
          <TableColumn title="ip" data-index="ip" />
          <TableColumn title="name" data-index="name" />
          <TableColumn title="password" data-index="password" />
          <TableColumn title="port" data-index="port" />
          <TableColumn title="type" data-index="type" />
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>

<style scoped lang="less"></style>
