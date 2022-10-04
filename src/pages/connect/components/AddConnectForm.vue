<script lang="ts" setup>
import {
  Form,
  FormItem,
  Select,
  Option,
  Input,
  InputNumber,
  InputPassword,
  Button,
} from '@arco-design/web-vue';

interface FormModel {
  ip: string;
  port: number;
  username: string;
  password: string;
  name: string;
  others: string;
  type: 1 | 2 | 3 | 4 | 5;
}

const formdata = reactive<FormModel>({
  ip: '',
  port: 0,
  username: '',
  password: '',
  name: '',
  others: '',
  type: 1,
});
</script>

<template>
  <Form :model="formdata" class="form">
    <FormItem field="type" label="类型" :rules="[{ required: true }]">
      <Select>
        <Option>MySQL</Option>
        <Option>达梦数据库</Option>
        <Option>金仓数据库</Option>
        <Option>Redis</Option>
        <Option>MongoDB</Option>
        <Option>Elasticsearch</Option>
      </Select>
    </FormItem>

    <FormItem field="ip" label="运行地址" :rules="[{ required: true }]">
      <Input placeholder="请输入数据库运行地址" />
    </FormItem>

    <FormItem field="port" label="运行端口" :rules="[{ required: true }]">
      <InputNumber placeholder="请输入数据库运行端口" />
    </FormItem>

    <FormItem field="username" label="root用户名" :rules="[{ required: true }]">
      <Input placeholder="请输入数据库Root用户名" />
    </FormItem>

    <FormItem field="password" label="root密码" :rules="[{ required: true }]">
      <InputPassword placeholder="请输入数据库Root用户密码" />
    </FormItem>

    <FormItem field="name" label="数据库名称" :rules="[{ required: true }]">
      <Input placeholder="请输入默认连接数据库" />
    </FormItem>

    <FormItem field="others" label="其他连接参数" :rules="[{ required: true }]">
      <Input placeholder="请输入其他连接参数" />
    </FormItem>

    <FormItem>
      <Button html-type="submit" type="primary">提交</Button>
    </FormItem>
  </Form>
</template>

<style lang="less" scoped>
.form {
  width: 700px;
}
</style>
