<script lang="ts" setup>
import {Modal,Checkbox,Tree} from '@arco-design/web-vue';
import { ref } from 'vue';
const checkedKeys = ref([]);
const checkStrictly = ref(false);
const treeData = [
  {
    title: '一级权限',
    key: '0-0',
    children: [
      {
        title: '二级权限',
        key: '0-0-1',
      },
      {
        title: '二级权限',
        key: '0-0-2',
        //disabled: true,
        children: [
          {
            title: '三级权限',
            key: '0-0-2-1',
          },
          {
            title: '三级权限',
            key: '0-0-2-2',
            //disableCheckbox: true,
          },
        ],
      },
    ],
  },
];
</script>
<!--checked-keys (v-model)   选中复选框的树节点-->
<!--check-strictly 是否取消父子节点关联-->
<template>
  <div >分配权限
</div>
  <Tree
    :checkable="true"
    v-model:checked-keys="checkedKeys"
    :check-strictly="checkStrictly"
    :data="treeData"
  ></Tree>
</template>
