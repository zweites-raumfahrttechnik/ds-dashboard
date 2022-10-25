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
  Button,
  Textarea,
} from '@arco-design/web-vue';
import { reactive, ref, defineComponent } from 'vue';
import JsonEdit from './components/JsonEditor.vue';

//标签页数量
let count = 5;

//搜索按钮
const handleSubmit = () => {};

const itemvalue = ref(false);
const item = () => {};
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

//新增标签页
const handleAddTab = () => {
  const number = count++;
  data.value = data.value.concat({
    key: `${number}`,
    title: `New Tab ${number}`,
  });
};

//删除标签页
const handleDeleteTab = key => {
  data.value = data.value.filter(item => item.key !== key);
};

const form = ref();

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

//json数据样例1
var jsonexampleOne =
  '{ "flocbxnutio": "a3XVvfPJNFKA-aei1L7t", "uilwtvirlx": true, "ccsvba": -423469322, "nllzyzj": -500901304.9595631, "rqttybsmtx": true}';

//json数据样例2
var jsonexampleTwo =
  '{"aaofyxx": "7d7cTji_ecds90GpU","jrshuu": "ldhuNNkCKCM2kPX","upobazkdgjwn": true}';

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

//文档
const DocVisible = ref(false);
const Doc = () => {
  DocVisible.value = true;
};
const handleDeleteDocOk = () => {};
const handleDeleteDocCancel = () => {};

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


</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>MongoDB数据操作</template>
      <Form :model="form">
        <Row :gutter="16" justify="space-around">
          <Col :span="6">
            <Form-item label="实例">
              <Select v-model:visible="DataBaseVisible" placeholder="请选择实例" allow-clear>
                <Option :value="1">aaaaaaabbbbbbb</Option>
                <Option :value="2">cccccccddddddd</Option>
                <Option :value="3">eeeeeeefffffff</Option>
                <Option :value="4">ggggggghhhhhhh</Option>
                <Option :value="5">iiiiiiijjjjjjj</Option>
                <Option :value="6">kkkkkkkmmmmmmm</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :span="6">
            <Form-item label="数据库名">
              <Select v-model:visible="CollectionVisible" placeholder="请选择数据库名">
                <Option :value="1">test3</Option>
                <Option :value="2">test_coll</Option>
                <Option :value="3">test_info</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :span="6">
            <Form-item label="集合">
              <Select v-model:visible="DocVisible" placeholder="请选择集合">
                <Option :value="1">qwe</Option>
                <Option :value="2">sfdc</Option>
                <Option :value="3">fcsoa</Option>
              </Select>
            </Form-item>
          </Col>

          <Divider style="height: 50px" direction="vertical" />

          <Col :flex="'86px'" style="text-align: right">
            <Space :size="18">
              <Button type="primary" @click="handleSubmit()">
                <template #icon>
                  <icon-subscribed />
                </template>
                提交
              </Button>
            </Space>
          </Col>
          <!-- <Col :sm="{ span: 4 }">
          <Form-item label="文档">
            <Select v-model:visible="AttrVisible" placeholder="请选择文档">
              <Option :value="1">hdye</Option>
              <Option :value="2">msaygc</Option>
              <Option :value="3">nvcnhd</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{ span: 4 }">
          <Form-item label="索引">
            <Select v-model:visible="IndexVisible" placeholder="请选择索引">
              <Option :value="1">mcdkjnv</Option>
              <Option :value="2">dswf</Option>
              <Option :value="3">cbhbya</Option>
            </Select>
          </Form-item>
        </Col>-->
        </Row>
      </Form>

      <Modal
        width="700px"
        title="json编辑器"
        v-model:visible="OnJsonEditorVisible"
        :close-on-click-modal="false"
        :hide-cancel="false"
        :footer="false"
        :draggable="true"
      >
        <JsonEdit v-model="jsonexampleOne" />
      </Modal>

      <Modal v-model:visible="FindVisible" @ok="handleOk" @cancel="handleCancel" :draggable="true">
        <template #title> find参数 </template>
      </Modal>

      <Tabs
        :editable="true"
        @add="handleAddTab"
        @delete="handleDeleteTab"
        show-add-button
        auto-switch
      >
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
          width="700px"
          v-model:visible="NewCollectionVisible"
          title="新增'test_coll'集合文档'"
          :close-on-click-modal="false"
          :hide-cancel="false"
          :draggable="true"
          @cancel="handleNewCollectionCancel()"
          @ok="handleNewCollectionOk()"
        >
          <JsonEdit currentMode="code" v-model="jsonexampleTwo" />
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
          <Card
            v-for="(_, index) in new Array(12)"
            :key="index"
            :style="{ width: '150%' }"
            :bordered="true"
          >
            <Textarea :key="index" placeholder="Please enter something" allow-clear> </Textarea>

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
</style>
