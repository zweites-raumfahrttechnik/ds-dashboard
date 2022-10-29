<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';

import { Row, Col, Card, Divider, Link, Popconfirm, Modal } from '@arco-design/web-vue';
import { IconTool, IconDelete } from '@arco-design/web-vue/es/icon';

import { instance, ResponseWrap } from '@/api';
import { MongdbDocInfo } from '@/api/types';
import { MONGODB_DOC_URL } from '@/api/url';

import JsonEditor from './JsonEditor.vue';

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

const selectJson = reactive<{ json: string; _id: string }>({ _id: '', json: '{}' });
const visibleJsonModal = ref<boolean>(false);

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
</script>

<template>
  <div class="container">
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

            <Popconfirm type="warning" content="确认删除该文档？">
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

  <Modal v-model:visible="visibleJsonModal" title="浏览">
    <JsonEditor v-model:value="selectJson.json" />
  </Modal>
</template>

<style lang="less" scoped>
.container {
  :deep(.arco-card) {
    margin-bottom: 10px;
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
