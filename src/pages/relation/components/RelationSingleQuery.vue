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
  whereList: { columnList: [{ column: '' }], columnType: '', value: '', queryType: '' },

  groupByList: [{ column: '' }],
  orderByList: { type: '', columnList: [{ column: '' }] },
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
  form.whereList.columnList.push({
    column: '',
  });
};
const handleAddOrder = () => {
  form.orderByList.columnList.push({
    column: '',
  });
};
const handleDelteWhere = (index: number) => {
  form.whereList.columnList.splice(index, 1);
};
const handleDeleteInquery = (index: number) => {
  form.columnList.splice(index, 1);
};
const handleDeleteGroup = (index: number) => {
  form.groupByList.splice(index, 1);
};
const handleDeleteOrder = (index: number) => {
  form.orderByList.columnList.splice(index, 1);
};
</script>
<template>
  <PageContainer>
    <Card>
      <Form :model="form" :style="{ width: '100%' }">
        <Row :gutter="16">
          <Col :span="9">
            <FormItem field="type" label="数据库类型" label-col-flex="90px" required>
              <Select v-model="form.type" default-value="1">
                <Option :value="1">MySQL</Option>
                <Option :value="2">达梦数据库</Option>
                <Option :value="3">金仓数据库</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="9">
            <FormItem field="table" label="表名" label-col-flex="50px" required>
              <Input v-model="form.table" placeholder="请输入查询表名" />
            </FormItem>
          </Col>
          <Col :span="10">
            <FormItem
              v-for="(post, index) of form.columnList"
              :key="index"
              :field="`columnList.${index + 1}.column`"
              :label="`查询列名${index + 1}`"
            >
              <Input v-model="post.column" placeholder="请输入查询列名" />
              <Button
                :style="{ marginLeft: '10px' }"
                status="danger"
                @click="handleDeleteInquery(index)"
              >
                <template #icon>
                  <icon-close size="25" />
                </template>
              </Button>
            </FormItem>
          </Col>
          <FormItem>
            <Button type="primary" status="success" @click="handleAddInquery">
              <template #icon>
                <icon-plus size="25" />
              </template>
            </Button>
          </FormItem>
          <Col :span="10">
            <FormItem label="过滤条件" :content-flex="false" :merge-props="false">
              <FormItem
                v-for="(post, index) of form.whereList.columnList"
                :key="index"
                :field="`whereList.columnList.${index + 1}.column`"
                :label="`条件${index + 1}`"
              >
                <Input v-model="post.column" placeholder="请输入查询列名" />
                <Button
                  :style="{ marginLeft: '10px' }"
                  status="danger"
                  @click="handleDelteWhere(index)"
                >
                  <template #icon> <icon-close size="25" /> </template>
                </Button>
              </FormItem>
              <FormItem>
                <Button type="primary" status="success" @click="handleAddWhere">
                  <template #icon> <icon-plus size="25" /> </template>
                </Button>
              </FormItem>
              <FormItem field="whereList.columnType" label="列类型">
                <!--<Input v-model="form.whereList.columnType" placeholder="请输入过滤条件列类型" />-->
                <Select v-model="form.whereList.columnType" defalut-value="int">
                  <Option>int</Option>
                  <Option>string</Option>
                </Select>
              </FormItem>
              <FormItem field="whereList.value" label="值">
                <Input v-model="form.whereList.value" placeholder="请输入过滤条件值" />
              </FormItem>
              <FormItem field="whereList.queryType" label="条件类型">
                <Select v-model="form.whereList.queryType">
                  <Option>&gt;</Option>
                  <Option>&lt;</Option>
                  <Option>like</Option>
                  <Option>=</Option>
                  <Option>&le;</Option>
                  <Option>&ge;</Option>
                </Select>
              </FormItem>
            </FormItem>
          </Col>
          <Col :span="10">
            <FormItem
              v-for="(post, index) of form.groupByList"
              :key="index"
              :field="`groupByList.${index + 1}.column`"
              :label="`分组列名${index + 1}`"
            >
              <Input v-model="post.column" placeholder="请输入分组条件列" />
              <Button
                :style="{ marginLeft: '10px' }"
                status="danger"
                @click="handleDeleteGroup(index)"
              >
                <template #icon> <icon-close size="25" /> </template>
              </Button>
            </FormItem>

            <FormItem>
              <Button type="primary" status="success" @click="handleAddGroup">
                <template #icon> <icon-plus size="25" /> </template>
              </Button>
            </FormItem>
          </Col>
          <Col :span="10">
            <FormItem label="排序条件" :content-flex="false" :merge-props="false">
              <FormItem field="orderByList.type" label="排序类型">
                <!--<Input v-model="form.orderByList.type" placeholder="请输入排序条件列" />-->
                <Select v-model="form.orderByList.type">
                  <Option>ASC</Option>
                  <Option>DESC</Option>
                </Select>
              </FormItem>
              <FormItem
                v-for="(post, index) of form.orderByList.columnList"
                :key="index"
                :field="`orderByList.columnList.${index + 1}.column`"
                :label="`排序列${index + 1}`"
              >
                <Input v-model="post.column" placeholder="请输入查询列名" />
                <Button
                  :style="{ marginLeft: '10px' }"
                  status="danger"
                  @click="handleDeleteOrder(index)"
                >
                  <template #icon> <icon-close size="25" /> </template
                ></Button>
              </FormItem>
              <FormItem>
                <Button type="primary" status="success" @click="handleAddOrder">
                  <template #icon> <icon-plus size="25" /> </template>
                </Button>
              </FormItem>
            </FormItem>
          </Col>
          <FormItem>
            <Button html-type="submit" type="primary">提交</Button>
          </FormItem>
        </Row>
      </Form>
      <Divider />
      <Table>
        <template #columns>
          <TableColumn title="ip" data-index="ip" />
          <TableColumn title="name" data-index="name" />
          <TableColumn title="password" data-index="password" />
          <TableColumn title="port" data-index="port" />
          <TableColumn title="type" data-index="type" />
          <TableColumn title="port" data-index="port" />
          <TableColumn title="port" data-index="port" />
          <TableColumn title="port" data-index="port" />
        </template>
      </Table>
    </Card>
  </PageContainer>
</template>
