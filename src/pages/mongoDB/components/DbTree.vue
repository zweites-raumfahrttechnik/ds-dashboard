<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Tree, TreeNodeData, Modal, Form, FormItem, Input } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { GetListData, MongodbDBInfo, MongodbCollectionInfo } from '@/api/types';
import {
  CONNECT_URL,
  MONGODB_DB_URL,
  MONGODB_COLLECTION_URL,
  MONGODB_META_DB_URL,
  MONGODB_META_COLLECTION_URL,
} from '@/api/url';

import ContextMenu from './ContextMenu.vue';

interface ContextMenuEvent extends PointerEvent {
  target: HTMLElement;
  path: HTMLElement[];
}

defineProps<{ selectedKeys: string[] }>();

const emit = defineEmits<{ (event: 'update:selectedKeys', val: string[]): void }>();

const treeData = ref<TreeNodeData[]>([]);
const selectedKeys = ref<string[]>([]);

const { execute: connectExecute } = useAxios<ResponseWrap<GetListData>>(
  CONNECT_URL,
  { params: { type: 5 } },
  instance,
  { immediate: false },
);

const { execute: dbExecute } = useAxios<ResponseWrap<MongodbDBInfo>>(MONGODB_DB_URL, {}, instance, {
  immediate: false,
});

const { execute: collectionExecute } = useAxios<ResponseWrap<MongodbCollectionInfo>>(
  MONGODB_COLLECTION_URL,
  {},
  instance,
  {
    immediate: false,
  },
);

const refreshDB = async (uuid: string) => {
  const val = await dbExecute({ params: { uuid: uuid } });
  const idx = treeData.value.findIndex(item => item.key === uuid);
  if (idx === -1) {
    return;
  }

  treeData.value[idx].children = val.data.value?.data?.data.map(item => ({
    key: `${treeData.value[idx].key}@*@${item}`,
    title: item,
  }));
};

const refreshCollection = async (uuid: string, dbName: string) => {
  const val = await collectionExecute({ params: { uuid, dbName } });

  // 寻找 connect
  const connectIdx = treeData.value.findIndex(item => item.key === uuid);
  if (connectIdx === -1) {
    return;
  }

  const connect = treeData.value[connectIdx];
  if (!connect.children) {
    return;
  }

  // 寻找 db
  const dbIdx = connect.children.findIndex(item => item.key === `${uuid}@*@${dbName}`);
  if (dbIdx === -1) {
    return;
  }

  const db = connect.children[dbIdx];

  db.children = val.data.value?.data?.data.map(item => ({
    key: `${uuid}@*@${dbName}@*@${item}`,
    title: item,
    isLeaf: true,
  }));
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
    emit('update:selectedKeys', val[0].split('@*@'));
  },
);

const handleLoadMore = async (data: TreeNodeData) => {
  const keys = data.key?.toString().split('@*@') as string[];

  // 获取集合
  if (keys.length === 2) {
    await refreshCollection(keys[0], keys[1]);
    return;
  }

  await refreshDB(keys[0]);
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

const createDBVisible = ref(false);
const createDBForm = reactive({
  name: '',
});

const createDBButtonDisable = computed(() => createDBForm.name === '');

const { execute: newDBExecute } = useAxios(MONGODB_META_DB_URL, { method: 'POST' }, instance, {
  immediate: false,
});

const handleCreateNewDB = () => {
  createDBVisible.value = true;
};

const handleNewDBModalClose = () => {
  createDBForm.name = '';
};

const handleOkNewDB = async () => {
  await newDBExecute({
    data: {
      uuid: contextMenuKey.value[0],
      dbName: createDBForm.name,
    },
  });

  await refreshDB(contextMenuKey.value[0]);
};

const deleteDBVisible = ref(false);

const { execute: deleteDBExecute } = useAxios(MONGODB_META_DB_URL, { method: 'DELETE' }, instance, {
  immediate: false,
});

const handleDeleteDB = () => {
  deleteDBVisible.value = true;
};

const handleOkDeleteDB = async () => {
  await deleteDBExecute({
    data: {
      uuid: contextMenuKey.value[0],
      dbName: contextMenuKey.value[1],
    },
  });

  await refreshDB(contextMenuKey.value[0]);
};

const createCollectionVisible = ref(false);
const createCollectionForm = reactive({
  name: '',
});

const createCollectionButtonDisable = computed(() => createCollectionForm.name === '');

const { execute: newCollectionExecute } = useAxios(
  MONGODB_META_COLLECTION_URL,
  { method: 'POST' },
  instance,
  {
    immediate: false,
  },
);

const handleCreateNewCollection = () => {
  createCollectionVisible.value = true;
};

const handleNewCollectionModalClose = () => {
  createCollectionForm.name = '';
};

const handleOkNewCollection = async () => {
  await newCollectionExecute({
    data: {
      uuid: contextMenuKey.value[0],
      dbName: contextMenuKey.value[1],
      collectionName: createCollectionForm.name,
    },
  });

  await refreshCollection(contextMenuKey.value[0], contextMenuKey.value[1]);
};

const deleteCollectionVisible = ref(false);

const { execute: deleteCollectionExecute } = useAxios(
  MONGODB_META_COLLECTION_URL,
  { method: 'DELETE' },
  instance,
  {
    immediate: false,
  },
);

const handleDeleteCollection = () => {
  deleteCollectionVisible.value = true;
};

const handleOkDeleteCollection = async () => {
  await deleteCollectionExecute({
    data: {
      uuid: contextMenuKey.value[0],
      dbName: contextMenuKey.value[1],
      collectionName: contextMenuKey.value[2],
    },
  });

  const connect = treeData.value.find(item => item.key === contextMenuKey.value[0]);
  const db = connect?.children?.find(
    item => item.key === `${contextMenuKey.value[0]}@*@${contextMenuKey.value[1]}`,
  );

  if (db?.children?.length && db.children.length <= 1) {
    await refreshDB(contextMenuKey.value[0]);
  } else {
    await refreshCollection(contextMenuKey.value[0], contextMenuKey.value[1]);
  }
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
      @new-db="handleCreateNewDB"
      @new-collection="handleCreateNewCollection"
      @delete-db="handleDeleteDB"
      @delete-collection="handleDeleteCollection"
    />
  </Teleport>

  <Modal
    v-model:visible="createDBVisible"
    :ok-button-props="{ disabled: createDBButtonDisable }"
    @ok="handleOkNewDB"
    @close="handleNewDBModalClose"
  >
    <template #title>新建数据库</template>

    <Form :model="createDBForm">
      <FormItem label="数据库名称" :required="true">
        <Input v-model="createDBForm.name" />
      </FormItem>
    </Form>
  </Modal>

  <Modal
    v-model:visible="createCollectionVisible"
    :ok-button-props="{ disabled: createCollectionButtonDisable }"
    @ok="handleOkNewCollection"
    @close="handleNewCollectionModalClose"
  >
    <template #title>新建数据集合</template>

    <Form :model="createCollectionForm">
      <FormItem label="集合名称" :required="true">
        <Input v-model="createCollectionForm.name" />
      </FormItem>
    </Form>
  </Modal>

  <Modal v-model:visible="deleteDBVisible" @ok="handleOkDeleteDB">
    <template #title>确认</template>

    <div>你确认删除数据库吗？</div>
  </Modal>

  <Modal v-model:visible="deleteCollectionVisible" @ok="handleOkDeleteCollection">
    <template #title>确认</template>

    <div>你确认删除数据集合吗？</div>
  </Modal>
</template>
