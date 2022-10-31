<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';

import {
  Row,
  Col,
  Card,
  Divider,
  Link,
  Popconfirm,
  Modal,
  Space,
  Button,
  Tag,
} from '@arco-design/web-vue';
import { IconTool, IconDelete, IconPlus } from '@arco-design/web-vue/es/icon';

import { instance, ResponseWrap } from '@/api';
import { MongdbDocInfo } from '@/api/types';
import { MONGODB_DOC_URL, MONGODB_QUERY_URL } from '@/api/url';

import JsonEditor from './JsonEditor.vue';

const opMap = {
  EQ: '=',
  GT: '>',
  GTE: '>=',
  LT: '<',
  LTE: '<=',
  NE: '!=',
};

const props = defineProps<{ selectedKeys: string[] }>();

const { data, execute } = useAxios<ResponseWrap<MongdbDocInfo>>(
  MONGODB_DOC_URL,
  {
    params: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
    },
  },
  instance,
);

const { execute: executeDelete } = useAxios(MONGODB_QUERY_URL, { method: 'DELETE' }, instance, {
  immediate: false,
});

const { execute: executePut } = useAxios(MONGODB_QUERY_URL, { method: 'PUT' }, instance, {
  immediate: false,
});

const selectJson = reactive<{ json: string; _id: string }>({ _id: '', json: '{}' });
const visibleJsonModal = ref<boolean>(false);

const visibleAddModal = ref<boolean>(false);
const addJson = ref<string>('{}');

const condition = ref<
  { field: string; op: 'EQ' | 'GT' | 'GTE' | 'LT' | 'LTE' | 'NE'; target: string }[]
>([{ field: 'name', op: 'EQ', target: 'lihuiyang' }]);

watch(
  () => props.selectedKeys,
  () => {
    execute({
      data: {
        uuid: props.selectedKeys[0],
        dbName: props.selectedKeys[1],
        collectionName: props.selectedKeys[2],
      },
    });
  },
);

const handleSelectJsonChange = (j: string) => {
  const { _id, ...rest } = JSON.parse(j);

  selectJson._id = _id;
  selectJson.json = JSON.stringify(rest);
  visibleJsonModal.value = true;
};

const handleDeleteSingleDoc = async (j: string) => {
  const { _id } = JSON.parse(j);

  await executeDelete({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
      isMany: true,
      items: [
        {
          field: '_id',
          op: 'EQ',
          target: _id,
        },
      ],
    },
  });

  execute({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
    },
  });
};

const handleModifySingleDoc = async () => {
  await executeDelete({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
      isMany: true,
      items: [
        {
          field: '_id',
          op: 'EQ',
          target: selectJson._id,
        },
      ],
    },
  });

  await executePut({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
      isMany: true,
      documents: [selectJson.json],
    },
  });

  execute({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
    },
  });
};

const handleAddButtonClick = () => {
  visibleAddModal.value = true;
};

const handleAddDoc = async () => {
  await executePut({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
      isMany: true,
      documents: [addJson.value],
    },
  });

  execute({
    data: {
      uuid: props.selectedKeys[0],
      dbName: props.selectedKeys[1],
      collectionName: props.selectedKeys[2],
    },
  });
};

const handleDeleteTag = (key: string) => {
  condition.value = condition.value.filter(item => `${item.field}${item.op}${item.target}` !== key);
};
</script>

<template>
  <div class="container">
    <div class="button-container">
      <Space>
        <Link>
          <template #icon>
            <IconPlus />
          </template>
          添加条件
        </Link>

        <Space>
          <Tag
            v-for="item in condition"
            :key="`${item.field}${item.op}${item.target}`"
            closable
            color="#86909c"
            @close="() => handleDeleteTag(`${item.field}${item.op}${item.target}`)"
          >
            {{ item.field }}
            {{ opMap[item.op] }}
            {{ item.target }}
          </Tag>
        </Space>
      </Space>

      <Space>
        <Button type="primary" @click="handleAddButtonClick">
          <template #icon>
            <IconPlus />
          </template>
          添加记录
        </Button>
        <Button type="primary" status="danger">删除所有</Button>
      </Space>
    </div>

    <Divider />

    <Row :gutter="16" :wrap="true">
      <Col v-for="item in data?.data?.data" :key="item" :span="6">
        <Card>
          <template #extra>
            <Link type="success" :underline="false" @click="() => handleSelectJsonChange(item)">
              <template #icon>
                <IconTool size="15" />
              </template>
            </Link>

            <Divider direction="vertical" />

            <Popconfirm
              type="warning"
              content="确认删除该文档？"
              @ok="() => handleDeleteSingleDoc(item)"
            >
              <Link status="danger" :underline="false">
                <template #icon>
                  <IconDelete size="15" />
                </template>
              </Link>
            </Popconfirm>
          </template>
          <div class="content">
            {{ JSON.stringify(JSON.parse(item), null, 4) }}
          </div>
        </Card>
      </Col>
    </Row>
  </div>

  <Modal v-model:visible="visibleJsonModal" title="浏览" @ok="handleModifySingleDoc">
    <JsonEditor v-model:value="selectJson.json" />
  </Modal>

  <Modal v-model:visible="visibleAddModal" title="添加" @ok="handleAddDoc">
    <JsonEditor v-model:value="addJson" />
  </Modal>
</template>

<style lang="less" scoped>
.container {
  :deep(.arco-card) {
    margin-bottom: 10px;
  }

  .button-container {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }

  .content {
    height: 200px;
    overflow-y: auto;
    white-space: pre;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #ecf0f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #bdc3c7;
    }
  }
}
</style>
