<script lang="ts" setup>
import {
  Spin,
  Form,
  Table,
  FormItem,
  Select,
  Option,
  Input,
  InputNumber,
  InputPassword,
  Button,
  Row,
  Col,
  Tag,
  Divider,
} from '@arco-design/web-vue';
import { defineComponent } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { sql } from '@codemirror/lang-sql';

const code = ref(`console.log('Hello, world!')`);
const extensions = [sql()];

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload: any) => {
  view.value = payload.view;
};

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state;
  const ranges = state.selection.ranges;
  const selected = ranges.reduce((r: any, range: any) => r + range.to - range.from, 0);
  const cursor = ranges[0].anchor;
  const length = state.doc.length;
  const lines = state.doc.lines;
  // more state info ...
  // return ...
};
</script>

<template>
  <Card class="cardbackground">
    <Row :gutter="2">
      <Col :span="2">
        <Button status="success" type="primary" @click="">
          <template #icon>
            <icon-play-circle />
          </template>
          运行
        </Button>
      </Col>
      <Col :span="2">
        <Button type="primary" status="danger" @click="">
          <template #icon>
            <icon-pause-circle />
          </template>
          停止
        </Button></Col
      >
    </Row>
    <div class="codemirror">
      <Codemirror
        :style="{ height: '360px', background: '#D4D4D4' }"
        placeholder="请在此处输入sql语句..."
        :autofocus="true"
        :indent-with-tab="true"
        :extensions="extensions"
      />
    </div>
    <Divider type:solid :margin="20"/>
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
</template>

<style scoped lang="less">
.cardbackground {
  background-color: #F2FFF2;
}
.codemirror {
  font-family: Arial, monospace;
  font-size: 18px;
}
</style>
