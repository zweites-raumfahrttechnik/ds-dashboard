<script lang="ts" setup>
import {Modal,Checkbox,Tree} from '@arco-design/web-vue';
import { ref } from 'vue';
const checkedKeys = ref([]);
const checkStrictly = ref(false);
const treeData = [
  {
    title: 'MySQL',
    key: '0-0',
    children: [
      {
        title: 'Select_priv',
        key: '0-0-1',
      },
      {
        title: 'Insert_priv',
        key: '0-0-2',
      },
      {
        title: 'Update_priv',
        key: '0-0-3',
      },
      {
        title: 'Delete_priv',
        key: '0-0-4',
      },
      {
        title: 'Create_priv',
        key: '0-0-5',
      },
      {
        title: 'Drop_priv',
        key: '0-0-6',
      },
      {
        title: 'Reload_priv',
        key: '0-0-7',
      },
    ],
  },
  {
    title: 'DM',
    key: '0-1',
    children: [
      {
        title: 'CREATE TABLE',
        key: '0-1-1',
      },
      {
        title: 'CREATE VIEW',
        key: '0-1-2',
      },
      {
        title: 'CREATE USER',
        key: '0-1-3',
      },
      {
        title: 'CREATE TRIGGER',
        key: '0-1-4',
      },
      {
        title: 'ALTER USER',
        key: '0-1-5',
      },
      {
        title: 'ALTER DATABASE',
        key: '0-1-6',
      },
      {
        title: 'CREATE PROCEDURE',
        key: '0-1-7',
      },
    ],
  },
  {
    title: 'KingBase',
    key: '0-2',
    children: [
      {
        title: 'CREATE',
        key: '0-2-1',
      },
      {
        title: 'CONNECT',
        key: '0-2-2',
      },
      {
        title: 'TEMPORARY',
        key: '0-2-3',
      },
      {
        title: 'CREATE TRIGGER',
        key: '0-2-4',
      },
      {
        title: 'TEMP',
        key: '0-2-5',
      },
    ],
  },


];
</script>
<!--checked-keys (v-model)选中复选框的树节点-->
<!--check-strictly是否取消父子节点关联-->
<template>
  <div >分配权限</div>
  <!--data数据源，生成对应的树结构-->
  <Tree
    :checkable="true"
    v-model:checked-keys="checkedKeys"
    :check-strictly="checkStrictly"
    :data="treeData"
  ></Tree>
</template>
