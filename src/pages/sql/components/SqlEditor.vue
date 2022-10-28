<script lang="ts" setup>
import { Table, Button, Row, Col, Divider } from '@arco-design/web-vue';
import { Codemirror } from 'vue-codemirror';
import { sql } from '@codemirror/lang-sql';

const extensions = [sql()];
</script>

<template>
  <Card class="cardbackground">
    <Row :gutter="2">
      <Col :span="2">
        <Button status="success" type="primary">
          <template #icon>
            <icon-play-circle />
          </template>
          运行
        </Button>
      </Col>
      <Col :span="2">
        <Button type="primary" status="danger">
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
    <Divider type:solid :margin="20" />
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
  background-color: #f2fff2;
}

.codemirror {
  font-family: Arial, monospace;
  font-size: 18px;
}
</style>
