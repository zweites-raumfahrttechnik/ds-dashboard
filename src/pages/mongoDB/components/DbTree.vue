<script lang="ts" setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { Tree, TreeNodeData } from '@arco-design/web-vue';

import { instance, ResponseWrap } from '@/api';
import { GetListData, MongodbDBInfo, MongodbCollectionInfo } from '@/api/types';
import { CONNECT_URL, MONGODB_DB_URL, MONGODB_COLLECTION_URL } from '@/api/url';

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
    const val = await collectionExecute({ params: { uuid: keys[0], dbName: keys[1] } });

    // 寻找 connect
    const connectIdx = treeData.value.findIndex(item => item.key === keys[0]);
    if (connectIdx === -1) {
      return;
    }

    const connect = treeData.value[connectIdx];
    if (!connect.children) {
      return;
    }

    // 寻找 db
    const dbIdx = connect.children.findIndex(item => item.key === `${keys[0]}@*@${keys[1]}`);
    if (dbIdx === -1) {
      return;
    }

    const db = connect.children[dbIdx];

    if (treeData.value[connectIdx].children !== undefined) {
      db.children = val.data.value?.data?.data.map(item => ({
        key: `${keys[0]}@*@${keys[1]}@*@${item}`,
        title: item,
        isLeaf: true,
      }));
    }

    return;
  }

  // 获取 DB
  const val = await dbExecute({ params: { uuid: keys[0] } });
  const idx = treeData.value.findIndex(item => item.key === data.key);
  if (idx === -1) {
    return;
  }

  treeData.value[idx].children = val.data.value?.data?.data.map(item => ({
    key: `${treeData.value[idx].key}@*@${item}`,
    title: item,
  }));
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
  let ele: Element | null = treeNode;
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
    }

    if (ele.classList.contains('arco-tree-node-is-tail')) {
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
    <ContextMenu v-if="menuVisible" :style="menuPosition" :menu-keys="contextMenuKey" />
  </Teleport>
</template>
