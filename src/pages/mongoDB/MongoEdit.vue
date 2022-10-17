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

const databasevisible = ref(false);

const collectionvisible = ref(false);

//刷新按钮
const refreshvisible = ref(false);
const refresh = () => {
  refreshvisible.value = true;
};

//新增集合文档
const newcollectionvisible = ref(false);
const newcollection = () => {
  newcollectionvisible.value = true;
};

const handlenewcollectionok = () => {
  newollectionvisible.value = false;
};

const handlenewcollectioncancel = () => {
  newcollectionvisible.value = false;
};

//json编辑器
const onjsoneditorvisible = ref(false);
const onjsoneditor = () => {
  onjsoneditorvisible.value = true;
};

const jsoneditorvisible = ref(false);
const jsoneditor = () => {
  jsoneditorvisible.value = true;
};

//保存按钮
const savevisible = ref(false);
const save = () => {
  savevisible.value = true;
};

//删除
const handledeletevisible = ref(false);
const handledelete = () => {
  handledeletevisible.value = true;
};

const searchFormRef_visible = ref(false);
const searchFormRef = () => {
  searchFormRef_visible.value = true;
};

const handledeletedocok = () => {};
const handledeletedoccancel = () => {};

//文档
const docvisible = ref(false);
const doc = () => {
  docvisible.value = true;
};

//属性
const attrvisible = ref(false);
const attr = () => {
  attrvisible.value = true;
};

//索引
const indexvisible = ref(false);
const index = () => {
  indexvisible.value = true;
};

//查询参数
const searchvisible = ref(false);
const search = () => {
  searchvisible.value = true;
};

//find参数
const findvisible = ref(false);
const handleok = () => {
  findvisible.value = false;
};
const handlecancel = () => {
  findvisible.value = false;
};

//Json编辑器
const openmodal = () => {
  findvisible.value = true;
};
</script>

<template>
  <PageContainer>
    <Card>
      <template>
        <Modal v-model:visible="findvisible" @ok="handleok" @cancel="handlecancel">
          <template #title> find参数 </template>
        </Modal>
      </template>
      <template>
        <Modal
          v-model:visible="jsoneditorvisible"
          width="70%"
          title="json编辑器"
          @focus="openmodal()"
        >
        </Modal>
      </template>

      <Row :gutter="16">
        <Col :span="4">
          <Form-item label="库" label-width="40px">
            <Select v-model:visible="databasevisible" placeholder="请选择库" allow-clear>
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
            <Select v-model:visible="collectionvisible" placeholder="请选择集合">
              <Option :value="1">test3</Option>
              <Option :value="2">test_coll</Option>
              <Option :value="3">test_info</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :span="4">
          <Form-item label="文档" label-width="40px">
            <Select v-model:visible="docvisible" placeholder="请选择文档">
              <Option :value="1">qwe</Option>
              <Option :value="2">sfdc</Option>
              <Option :value="3">fcsoa</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :span="4">
          <Form-item label="属性" label-width="40px">
            <Select v-model:visible="attrvisible" placeholder="请选择属性">
              <Option :value="1">hdye</Option>
              <Option :value="2">msaygc</Option>
              <Option :value="3">nvcnhd</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :span="4">
          <Form-item label="索引" label-width="40px">
            <Select v-model:visible="indexvisible" placeholder="请选择索引">
              <Option :value="1">mcdkjnv</Option>
              <Option :value="2">dswf</Option>
              <Option :value="3">cbhbya</Option>
            </Select>
          </Form-item>
        </Col>
      </Row>

      <Tabs :editable="true" @add="handleAdd" @delete="handledelete" show-add-button auto-switch>
        <Tab-pane
          v-for="(item, index) of data"
          :key="item.key"
          :title="item.title"
          :closable="index !== 2"
        >
        </Tab-pane>
      </Tabs>

      <Row>
        <Link @click="refresh()" :underline="false">
          <template #icon>
            <icon-refresh size="15" />
          </template>
        </Link>
        <Link @click="newcollection()" type="primary" :underline="false">
          <template #icon>
            <icon-plus size="15" />
          </template>
        </Link>
        <Modal
          v-model:visible="newcollectionvisible"
          title="新增'test_coll'集合文档'"
          @cancel="handlenewcollectioncancel()"
          @ok="handlenewcollectionok()"
        >
        </Modal>
      </Row>

      <Row>
        <Input
          v-model:visible="searchvisible"
          placeholder=""
          model-value="{'filter':'{}','sort':'{id}'}"
          @focus="openmodal()"
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
                    <Link @click="onjsoneditor()" type="success" :underline="false">
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
                      @cancel="handledeletedoccancel()"
                      @ok="handledeletedocok()"
                    >
                      <Link @click="handledelete()" status="danger" :underline="false">
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
}
.card-demo :deep(.arco-card-header) {
  border: none;
}
</style>
