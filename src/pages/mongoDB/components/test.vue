<script lang="ts" setup>
import PageContainer from '@/components/PageContainer.vue';
import {
  Modal,
  Select,
  Card,
  Row,
  Col,
  Input,
  Pagination,
  Form,
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
import JsonEdit from '@/components/JsonEditor.vue';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';

let count = 5;
//标签页
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

//新增集合文档
const handleAdd = () => {
  const number = count++;
};

const selectedKeys = ref(['1', '2']);
const size = ref('medium');
const show = ref(true);

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

const DataBaseVisible = ref(false);

const CollectionVisible = ref(false);

//刷新按钮
const RefreshVisible = ref(false);
const Refresh = () => {
  RefreshVisible.value = true;
};

//新增集合文档
const NewCollectionVisible = ref(false);
const NewCollection = () => {
  NewCollectionVisible.value = true;
};

const handleNewCollectionOk = () => {
  NewCollectionVisible.value = false;
};

const handleNewCollectionCancel = () => {
  NewCollectionVisible.value = false;
};

//json编辑器按钮
const OnJsonEditorVisible = ref(false);
const OnJsonEditor = () => {
  OnJsonEditorVisible.value = true;
};

//保存按钮
const SaveVisible = ref(false);
const Save = () => {
  SaveVisible.value = true;
};

//删除
const handleDeleteVisible = ref(false);
const handleDelete = () => {
  handleDeleteVisible.value = true;
};

const searchFormRef_visible = ref(false);
const searchFormRef = () => {
  searchFormRef_visible.value = true;
};

const handleDeleteDocOk = () => {};
const handleDeleteDocCancel = () => {};

//文档
const DocVisible = ref(false);
const Doc = () => {
  DocVisible.value = true;
};

//属性
const AttrVisible = ref(false);
const Attr = () => {
  AttrVisible.value = true;
};

//索引
const IndexVisible = ref(false);
const Index = () => {
  IndexVisible.value = true;
};

//查询参数
const SearchVisible = ref(false);
const Search = () => {
  SearchVisible.value = true;
};

//find参数
const FindVisible = ref(false);
const handleOk = () => {
  FindVisible.value = false;
};
const handleCancel = () => {
  FindVisible.value = false;
};

const OpenModal = () => {
  FindVisible.value = true;
};

//Json编辑器
const jsonStr = ref({ key: 'key', value: 'value' });

const couldView = ref(['tree', 'code', 'form', 'view']);
const updateModelValue = (val: unknown) => {
  console.log(val, '修改了值');
};
</script>

<template>
  <PageContainer>
    <Card>
      <template>
        <Modal v-model:visible="FindVisible" @ok="handleOk" @cancel="handleCancel">
          <template #title> find参数 </template>
        </Modal>
      </template>
      <Row :gutter="20" :flex="1">
        <Col :span="4">
          <Form-item label="库" label-width="40px">
            <Select v-model:visible="DataBaseVisible" placeholder="请选择库" allow-clear>
              <Option :value="1">MySQL</Option>
              <Option :value="2">达梦数据库</Option>
              <Option :value="3">金仓数据库</Option>
              <Option :value="4">Redis</Option>
              <Option :value="5">MongoDB</Option>
              <Option :value="6">Elasticsearch</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :span="4">
          <Form-item label="集合" label-width="40px">
            <Select v-model:visible="CollectionVisible" placeholder="请选择集合">
              <Option :value="1">test3</Option>
              <Option :value="2">test_coll</Option>
              <Option :value="3">test_info</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :span="4">
          <Form-item label="文档" label-width="40px">
            <Select v-model:visible="DocVisible" placeholder="请选择文档">
              <Option :value="1">qwe</Option>
              <Option :value="2">sfdc</Option>
              <Option :value="3">fcsoa</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :span="4">
          <Form-item label="属性" label-width="40px">
            <Select v-model:visible="AttrVisible" placeholder="请选择属性">
              <Option :value="1">hdye</Option>
              <Option :value="2">msaygc</Option>
              <Option :value="3">nvcnhd</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :span="4">
          <Form-item label="索引" label-width="40px">
            <Select v-model:visible="IndexVisible" placeholder="请选择索引">
              <Option :value="1">mcdkjnv</Option>
              <Option :value="2">dswf</Option>
              <Option :value="3">cbhbya</Option>
            </Select>
          </Form-item>
        </Col>
      </Row>
      <template>
        <Modal
          width="700px"
          title="json编辑器"
          v-model:visible="OnJsonEditorVisible"
          :close-on-click-modal="false"
          :hide-cancel="false"
        >
      
          <JSONEditor />
      
        </Modal>
      </template>

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
        <Link @click="Refresh()" :underline="false">
          <template #icon>
            <icon-refresh size="15" />
          </template>
        </Link>
        <Link @click="NewCollection()" type="primary" :underline="false">
          <template #icon>
            <icon-plus size="15" />
          </template>
        </Link>
        <Modal
          v-model:visible="NewCollectionVisible"
          title="新增'test_coll'集合文档'"
          @cancel="handleNewCollectionCancel()"
          @ok="handleNewCollectionOk()"
        >
        </Modal>
      </Row>

      <Row>
        <Input
          v-model:visible="SearchVisible"
          placeholder=""
          model-value="{'filter':'{}','sort':'{id}'}"
          @focus="OpenModal()"
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
      ></div>
      <Row :gutter="20">
        <Col :span="30">
          <Card :bordered="true" :style="{ width: '100%'}">
            
            <CardGrid v-for="(_, index) in new Array(1)" :key="index" :style="{ width: '100%' }">
              <Card class="card-demo" :bordered="true">
                <template #extra>
                  <Link @click="OnJsonEditor()" type="success" :underline="false">
                    <template #icon>
                      <icon-tool size="15" />
                    </template>
                  </Link>
                  <Divider direction="vertical" />
                  <Link @click="Save()" type="primary" :underline="false">
                    <template #icon>
                      <icon-file size="15" />
                    </template>
                  </Link>
                  <Divider direction="vertical" />
                  <Popconfirm
                    type="warning"
                    content="确认删除该文档？"
                    @cancel="handleDeleteDocCancel()"
                    @ok="handleDeleteDocOk()"
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
    </Card>
  </PageContainer>
</template>

<style scoped>
.card-demo {
  width: 100%;
}
.card-demo :deep(.arco-card-header) {
  border: none;
}
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(var(--gray-2));
}
</style>
