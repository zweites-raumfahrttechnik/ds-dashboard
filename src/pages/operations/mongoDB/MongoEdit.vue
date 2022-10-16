<script lang="ts" setup>
import PageContainer from '@/components/PageContainer.vue';
import {
  Space,
  Switch,
  Table,
  Button,
  Modal,
  Select,
  Card,
  Row,
  Col,
  Input,
  Pagination,
  Cascader,
  Form,
  Alert,
  FormItem,
  Link,
  Divider,
  Tabs,
  TabPane,
  Option,
  Popconfirm,
  CardGrid,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';

let count = 5;

const data = ref([
  {
    key: '1',
    title: 'test_coll',
  },
  {
    key: '2',
    title: 'test3',
  },
  {
    key: '3',
    title: 'test_info',
  },
]);

const handleAdd = () => {
  const number = count++;
  data.value = data.value.concat({
    key: `${number}`,
    title: `New Collection ${number}`,
  });
};

const selectedKeys = ref(['1', '2']);
const size = ref('medium');
const show = ref(true);

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = { pageSize: 7 };

const database_visible = ref(false);

const collection_visible = ref(false);

const findCommand_visible = ref(false);
const findCommand = () => {
  findCommand_visible.value = true;
};

const newCollection_visible = ref(false);
const newCollection = () => {
  newCollection_visible.value = true;
};

const onJsonEditor_visible = ref(false);
const onJsonEditor = () => {
  onJsonEditor_visible.value = true;
};
const save_visible = ref(false);
const save = () => {
  save_visible.value = true;
};
const jsonEditor_visible = ref(false);
const jsonEditor = () => {
  jsonEditor_visible.value = true;
};
const handlenewCollectionOk = () => {
  newCollection_visible.value = false;
};
const handlenewCollectionCancel = () => {
  newCollection_visible.value = false;
};
const handleDelete_visible = ref(false);
const handleDelete = () => {
  handleDelete_visible.value = true;
};
const searchFormRef_visible = ref(false);
const searchFormRef = () => {
  searchFormRef_visible.value = true;
};
const search_visible = ref(false);
const search = () => {
  search_visible.value = true;
};

const doc_visible = ref(false);
const doc = () => {
  doc_visible.value = true;
};
const attr_visible = ref(false);
const attr = () => {
  attr_visible.value = true;
};
const index_visible = ref(false);
const index = () => {
  index_visible.value = true;
};

const handledeleteDocOk = () => {};
const handledeleteDocCancel = () => {};

const visible = ref(false);

const openModal = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};
</script>

<template>
  <PageContainer>
    <Card>
      <template>
        <Modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
          <template #title> find参数 </template>
        </Modal>
      </template>
      <template>
        <Modal
          v-model:visible="jsonEditor_visible"
          width="70%"
          title="json编辑器"
          @focus="openModal()"
        >

        </Modal>
        >
      </template>
      <Form ref="searchFormRef" v-model:visible="searchFormRef_visible" label-align="left">
        <Row>
          <Col :span="5">
            <Form-item label="库" label-width="40px">
              <Select v-model:visible="database_visible" placeholder="请选择库" allow-clear>
                <Option :value="1">MySQL</Option>
                <Option :value="2">达梦数据库</Option>
                <Option :value="3">金仓数据库</Option>
                <Option :value="4">Redis</Option>
                <Option :value="5">MongoDB</Option>
                <Option :value="6">Elasticsearch</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :span="5">
            <Form-item label="集合" label-width="40px">
              <Select v-model:visible="collection_visible" placeholder="请选择集合">
                <Option :value="1">test3</Option>
                <Option :value="2">test_coll</Option>
                <Option :value="3">test_info</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :span="5">
            <Form-item label="文档" label-width="40px">
              <Select v-model:visible="doc_visible" placeholder="请选择文档">
                <Option :value="1">qwe</Option>
                <Option :value="2">sfdc</Option>
                <Option :value="3">fcsoa</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :span="4">
            <Form-item label="属性" label-width="40px">
              <Select v-model:visible="attr_visible" placeholder="请选择属性">
                <Option :value="1">hdye</Option>
                <Option :value="2">msaygc</Option>
                <Option :value="3">nvcnhd</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :span="5">
            <Form-item label="索引" label-width="40px">
              <Select v-model:visible="index_visible" placeholder="请选择索引">
                <Option :value="1">mcdkjnv</Option>
                <Option :value="2">dswf</Option>
                <Option :value="3">cbhbya</Option>
              </Select>
            </Form-item>
          </Col>
        </Row>
      </Form>

      <Tabs :editable="true" @add="handleAdd" @delete="handleDelete" show-add-button auto-switch>
        <Tab-pane
          v-for="(item, index) of data"
          :key="item.key"
          :title="item.title"
          :closable="index !== 2"
        >
        </Tab-pane>
      </Tabs>

      <Row>
        <Link @click="findCommand()" :underline="false">
          <template #icon>
            <icon-refresh size="15" />
          </template>
        </Link>
        <Link @click="newCollection()" type="primary" :underline="false">
          <template #icon>
            <icon-plus size="15" />
          </template>
        </Link>
        <Modal
          v-model:visible="newCollection_visible"
          title="新增'test_coll'集合文档'"
          @cancel="handlenewCollectionCancel()"
          @ok="handlenewCollectionOk()"
        >
        </Modal>
      </Row>

      <Row>
        <Input
          v-model:visible="search_visible"
          placeholder=""
          model-value="{'filter':'{}','sort':'{id}'}"
          @focus="openModal()"
        >
          <template #prepend>查询参数</template>
        </Input>
      </Row>

      <div
        :style="{
          boxSizing: 'border-box',
          width: '300%',
          padding: '10px',
        }"
      >
        <Row :gutter="20">
          <Col :span="8">
            <Card
              :bordered="true"
              :style="{ width: '100%', marginLeft: '0px', marginRight: '0px' }"
            >
              <CardGrid v-for="(_, index) in new Array(12)" :key="index" :style="{ width: '25%' }">
                <Card class="card-demo" :bordered="true">
                  <template #extra>
                    <Link @click="onJsonEditor()" type="success" :underline="false">
                      <template #icon>
                        <icon-search size="15" />
                      </template>
                    </Link>
                    <Link @click="save()" type="primary" :underline="false">
                      <template #icon>
                        <icon-file size="15" />
                      </template>
                    </Link>
                    <Popconfirm
                      type="warning"
                      content="确认删除该文档？"
                      @cancel="handledeleteDocCancel()"
                      @ok="handledeleteDocOk()"
                    >
                      <Link @click="handleDelete()" status="danger" :underline="false">
                        <template #icon>
                          <icon-delete size="15" />
                        </template>
                      </Link>
                    </Popconfirm>
                  </template>
                  { "_id":"123456789",<br />
                  "df":{},<br />
                  "x":"\"1212"\",<br />
                  "y":{<br />
                  "age":23154564545<br />
                  "name":3157487484<br />
                  }<br />
                  } <br />
                </Card>
              </CardGrid>
            </Card>
          </Col>
        </Row>
      </div>
    </Card>
  </PageContainer>
</template>
<Divider style="height: 34px" direction="vertical" />
<style scoped>
.card-demo {
  width: 100%;
  margin-right: 24px;
  transition-property: all;
}
.card-demo :deep(.arco-card-header) {
  border: none;
}
</style>
