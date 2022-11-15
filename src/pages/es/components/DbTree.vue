<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Tree, TreeNodeData, Modal, Input, Form, FormItem } from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';

import { instance, ResponseWrap } from '@/api';
import { GetListData, ESMetaInfo } from '@/api/types';
import { CONNECT_URL, ES_CREATE_INDEX, ES_DELETE_INDEX, ES_META_INDEX } from '@/api/url';

import ContextMenu from './ContextMenu.vue';

import JsonEditor from '@/components/JsonEditor.vue';

interface ContextMenuEvent extends PointerEvent {
  target: HTMLElement;
  path: HTMLElement[];
}

const emit = defineEmits<{ (event: 'handleSelectedKeys', val: string[]): void }>();

const treeData = ref<TreeNodeData[]>([]);
const selectedKeys = ref<string[]>([]);

const { execute: connectExecute } = useAxios<ResponseWrap<GetListData>>(
  CONNECT_URL,
  { params: { type: 6 } },
  instance,
  { immediate: false },
);

const { execute: indexExec } = useAxios<ResponseWrap<ESMetaInfo>>(ES_META_INDEX, {}, instance, {
  immediate: false,
});

const refreshIndex = async (uuid: string) => {
  const val = await indexExec({ params: { uuid: uuid } });
  const idx = treeData.value.findIndex(item => item.key === uuid);
  if (idx === -1) {
    return;
  }

  treeData.value[idx].children = handleIndexStr2List(val.data.value?.data?.data || '{}').map(
    item => ({
      key: `${treeData.value[idx].key}@*@${item}`,
      title: item,
      isLeaf: true,
    }),
  );
};

// 获取链接实例
onMounted(() => {
  connectExecute().then(val => {
    val.data.value?.data?.data.forEach(item => {
      treeData.value.push({
        title: `${item.ip}:${item.port}`,
        key: item.uuid,
      });
    });
  });
});

watch(
  () => selectedKeys.value,
  val => {
    emit('handleSelectedKeys', val[0].split('@*@'));
  },
);

const handleIndexStr2List = (indexStr: string) => {
  return Object.keys(JSON.parse(indexStr));
};

const handleLoadMore = async (data: TreeNodeData) => {
  const keys = data.key?.toString().split('@*@') as string[];

  // 获取 Index
  await refreshIndex(keys[0]);
};

const contextMenuKey = ref<string[]>([]);
const menuVisible = ref(false);
const menuPosition = ref({ top: '', left: '' });

const handleCloseMenu = () => {
  menuVisible.value = false;
};

onMounted(() => {
  document.body.addEventListener('click', handleCloseMenu);

  document.body.addEventListener('contextmenu', handleCloseMenu);
});

onUnmounted(() => {
  menuVisible.value = false;

  document.body.removeEventListener('click', handleCloseMenu);
  document.body.removeEventListener('contextmenu', handleCloseMenu);
});

const handleContextMenu = (e: ContextMenuEvent) => {
  // 确定点击的元素是否是 title
  const target = e.target as HTMLElement;
  if (
    target.localName !== 'span' ||
    (!target.classList.contains('arco-tree-node-title-text') &&
      !target.classList.contains('arco-tree-node-title'))
  ) {
    return;
  }

  // 阻止浏览器原生事件
  e.preventDefault();
  e.stopPropagation();

  menuPosition.value.left = e.clientX + 'px';
  menuPosition.value.top = e.clientY + 'px';

  // 根据类名拿到 tree-node
  const path = e.path as HTMLElement[];
  let treeNode: HTMLElement = path[2];
  if (target.classList.contains('arco-tree-node-title')) {
    treeNode = path[1];
  }

  // 确定点击的层级
  const indent = (treeNode.firstElementChild as HTMLSpanElement).children.length;

  // 返回右键点击的 key
  const res: string[] = [];

  // 获取本身的 key
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastEle = treeNode.lastElementChild?.lastElementChild as any;
  res.unshift(lastEle.innerText);

  // 获取其父层级节点
  let i = 0,
    tail = 0;
  let ele: Element | null = treeNode.previousElementSibling;
  while (i < indent && ele !== null) {
    if (ele.classList.contains('arco-tree-node-expanded')) {
      if (tail === 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lastEle = ele.lastElementChild?.lastElementChild as any;
        res.unshift(lastEle.innerText);
        i++;
      } else {
        tail--;
      }
    } else if (ele.classList.contains('arco-tree-node-is-tail')) {
      tail++;
    }

    ele = ele.previousElementSibling;
  }

  // 将父节点更换为uuid
  const idx = treeData.value.findIndex(item => item.title === res[0]);
  if (idx === -1) {
    return;
  }
  res[0] = treeData.value[idx].key as string;

  contextMenuKey.value = res;
  menuVisible.value = true;
};

const createIndexVisible = ref(false);
const createIndexFormRef = ref<FormInstance>();
const createIndexForm = reactive({
  index: '',
  entityInfo: '{}',
});

const { execute: createIndexExecute } = useAxios(ES_CREATE_INDEX, { method: 'POST' }, instance, {
  immediate: false,
});

const handleCreateIndex = () => {
  createIndexVisible.value = true;
};

const handleCreateIndexModalClose = () => {
  createIndexForm.index = '';
  createIndexForm.entityInfo = '{}';
};

const handleOkCreateIndex = async () => {
  await createIndexExecute({
    data: {
      uuid: contextMenuKey.value[0],
      index: createIndexForm.index,
      entityInfo: createIndexForm.entityInfo,
    },
  });

  await refreshIndex(contextMenuKey.value[0]);
};

const handleValidateAddIndexForm = async () => {
  const res = await createIndexFormRef.value?.validate();
  if (res) {
    return false;
  }
};

const deleteIndexVisible = ref(false);

const { execute: deleteIndexExecute } = useAxios(ES_DELETE_INDEX, { method: 'DELETE' }, instance, {
  immediate: false,
});

const handleDeleteIndex = () => {
  deleteIndexVisible.value = true;
};

const handleOkDeleteIndex = async () => {
  await deleteIndexExecute({
    params: {
      uuid: contextMenuKey.value[0],
      index: contextMenuKey.value[1],
    },
  });

  await refreshIndex(contextMenuKey.value[0]);
};
</script>

<template>
  <Tree
    v-model:selected-keys="selectedKeys"
    block-node
    :data="treeData"
    :load-more="handleLoadMore"
    @contextmenu="handleContextMenu"
  />

  <Teleport to="#app">
    <ContextMenu
      v-if="menuVisible"
      :style="menuPosition"
      :menu-keys="contextMenuKey"
      @new-index="handleCreateIndex"
      @delete-index="handleDeleteIndex"
    />
  </Teleport>

  <Modal
    v-model:visible="createIndexVisible"
    :on-before-ok="handleValidateAddIndexForm"
    @ok="handleOkCreateIndex"
    @close="handleCreateIndexModalClose"
  >
    <template #title>新建索引</template>
    <Form ref="createIndexFormRef" :model="createIndexForm" layout="vertical">
      <FormItem
        field="index"
        label="索引名称"
        :rules="[{ required: true, message: '请输入索引名称' }]"
      >
        <Input v-model="createIndexForm.index" placeholder="请输入索引名称" />
      </FormItem>
      <FormItem field="json" label="索引属性">
        <JsonEditor v-model:value="createIndexForm.entityInfo" width="100%" />
      </FormItem>
    </Form>
  </Modal>

  <Modal v-model:visible="deleteIndexVisible" @ok="handleOkDeleteIndex">
    <template #title>确认</template>

    <div>你确认删除索引{{ contextMenuKey[1] }}吗？</div>
  </Modal>
</template>
