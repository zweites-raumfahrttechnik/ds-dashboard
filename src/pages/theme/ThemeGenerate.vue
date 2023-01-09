<script lang="ts" setup>
import {
  Card,
  Divider,
  Form,
  FormItem,
  Row,
  Col,
  Input,
  Button,
  Tabs,
  TabPane,
  Select,
  Option,
  Optgroup,
} from '@arco-design/web-vue';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { instance, ResponseWrap } from '@/api';
import { useAxios } from '@vueuse/integrations/useAxios';
import {
  GEN_CODE,
  QUERY_DATABASE_URL,
  EXECUTE_DATABASE_URL,
  SQL_META_SCHEMA,
  SQL_META_TABLE,
  SQL_META_VIEW,
} from '@/api/url';

import PageContainer from '@/components/PageContainer.vue';
import ConnectSelect from './components/ConnectSelect.vue';
import CodemirrorEditor from './components/CodeMirror.vue';
import {
  defaultGenCodeFormValue,
  GenCodeFormModel,
  QueryParams,
  defaultQueryParams,
  ConnectFormModel,
  defaultConnectFormValue,
  QueryFormModel,
  defaultQueryFormValue,
} from './types';
import { useUserModel } from '@/model';
import { GetSqlMetaData, PostTableQueryData } from '@/api/types';

const buttonSize = 16;

// meadata

const connectFormRef = ref<FormInstance>();

const queryFormRef = ref<FormInstance>();

const genCodeForm = reactive<GenCodeFormModel>({ ...defaultGenCodeFormValue });

const { token } = useUserModel();

const queryForm = reactive<QueryFormModel>({ ...defaultQueryFormValue });
const connectFormData = reactive<ConnectFormModel>({ ...defaultConnectFormValue });

const { data: file, execute: generate } = useAxios(
  '/api' + GEN_CODE,
  {
    method: 'POST',
    responseType: 'blob',
    headers: { Authorization: `ASI ${token.value}` || 'ASI ' },
  },
  {
    immediate: false,
  },
);

const handleConnectChange = (uuid: string, type: number) => {
  connectFormData.type = type;
  connectFormData.uuid = uuid;
};

watch(
  () => file.value,
  val => {
    const blob = new Blob([val], { type: 'application/octet-stream' });
    const fileName = 'demo.zip';

    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = window.URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    window.URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
  },
);

const selectedUrl = ref(QUERY_DATABASE_URL);

//单表查询
//模式
const schemas = ref<string[]>([]);
const {
  data: schemaList,
  isLoading: schemaListLoading,
  execute: schemaListExec,
} = useAxios<ResponseWrap<GetSqlMetaData>>(SQL_META_SCHEMA, { method: 'GET' }, instance, {
  immediate: false,
});

watch(
  () => schemaList.value?.data?.names,
  () => {
    schemas.value = schemaList.value?.data?.names || [];
  },
);

watch(
  () => connectFormData.uuid,
  newVal => {
    connectFormData.schema = '';
    schemas.value = [];
    if (newVal !== '') {
      schemaListExec({ params: { uuid: connectFormData.uuid, type: connectFormData.type } });
    }
  },
);

//表
const tables = ref<string[]>([]);

const {
  data: tableList,
  isLoading: tableListLoading,
  execute: tableListExec,
} = useAxios<ResponseWrap<GetSqlMetaData>>(SQL_META_TABLE, { method: 'GET' }, instance, {
  immediate: false,
});

watch(
  () => tableList.value?.data?.names,
  () => {
    tables.value = tableList.value?.data?.names || [];
  },
);

//视图
const views = ref<string[]>([]);
const {
  data: viewList,
  isLoading: viewListLoading,
  execute: viewListExec,
} = useAxios<ResponseWrap<GetSqlMetaData>>(SQL_META_VIEW, { method: 'GET' }, instance, {
  immediate: false,
});

watch(
  () => viewList.value?.data?.names,
  () => {
    views.value = viewList.value?.data?.names || [];
  },
);

watch(
  () => connectFormData.schema,
  newVal => {
    connectFormData.table = '';
    tables.value = [];
    views.value = [];
    if (newVal !== '') {
      tableListExec({
        params: {
          uuid: connectFormData.uuid,
          type: connectFormData.type,
          schema: connectFormData.schema,
        },
      });
      viewListExec({
        params: {
          uuid: connectFormData.uuid,
          type: connectFormData.type,
          schema: connectFormData.schema,
        },
      });
    }
  },
);

//条件

const colFormList = reactive<Array<{ name: string; type: string }>>(Array(0));

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 10,
});

const {
  data: colList,
  isLoading: colIsLoading,
  execute: colExecute,
} = useAxios<ResponseWrap<PostTableQueryData>>(QUERY_DATABASE_URL, { method: 'POST' }, instance, {
  immediate: false,
});

const concatQueryParams = (connectFormData: ConnectFormModel) => {
  const params = reactive<QueryParams>({
    ...defaultQueryParams,
  });
  params.uuid = connectFormData.uuid;
  params.type = connectFormData.type;
  params.table = connectFormData.schema + '.' + connectFormData.table;

  params.columnList = queryForm.columnList.filter(item => {
    return item && item !== '';
  });
  params.whereList = queryForm.whereList.filter(item => {
    return item.column !== '' && item.value !== '';
  });
  params.orderByList = queryForm.orderByList.filter(item => {
    return item.column !== '';
  });
  params.pg = pagination.current;
  params.size = pagination.pageSize;
  return params;
};

const exec = async () => {
  const params = concatQueryParams(connectFormData);

  colExecute({
    data: { ...params },
  });
};

const resetForm = () => {
  queryForm.whereList = [{ column: '', columnType: '', value: '', queryType: '=' }];
  queryForm.columnList = [];
  queryForm.orderByList = [{ column: '', type: 1 }];
};

watch(
  () => colList.value?.data?.columnList,
  newVal => {
    if (colFormList.length === 0) {
      const temp = newVal || [];
      temp.forEach(item => {
        colFormList.push({
          name: item.columnName,
          type: item.columnTypeName,
        });
      });
    }
  },
);

watch(
  () => colList.value?.data?.count,
  newVal => {
    pagination.total = newVal;
  },
);

watch(
  () => pagination.current,
  () => {
    exec();
  },
);

watch(
  () => connectFormData.table,
  () => {
    if (connectFormData.table && connectFormData.table !== '') {
      colFormList.length = 0;
      resetForm();
      pagination.current = 1;
      exec();
    }
  },
);

//增加删除条件
const handleAddWhere = () => {
  queryForm.whereList.push({
    column: '',
    columnType: '',
    value: '',
    queryType: '=',
  });
};

const handleAddOrder = () => {
  queryForm.orderByList.push({
    type: 1,
    column: '',
  });
};

const handleDeleteWhere = (index: number) => {
  queryForm.whereList.splice(index, 1);
};

const handleDeleteOrder = (index: number) => {
  queryForm.orderByList.splice(index, 1);
};

//自定义操作

const handleSingleQuery = async () => {
  const res = await connectFormRef.value?.validate();

  if (res) {
    return;
  }

  genCodeForm.url = selectedUrl.value;
  const params = concatQueryParams(connectFormData);
  genCodeForm.paramsJson = params;

  generate({
    data: {
      ...genCodeForm,
    },
  }).then(() => {
    connectFormRef.value?.resetFields();
    queryFormRef.value?.resetFields();
  });
};

const codeData = ref('');
const getcode = (code: string) => {
  codeData.value = code;
};

const handleCustomizeQuery = async () => {
  genCodeForm.url = selectedUrl.value;

  const params = reactive<{ uuid: string; type: number; code: string }>({
    uuid: '',
    type: 1,
    code: '',
  });

  params.uuid = connectFormData.uuid;
  params.type = connectFormData.type;
  params.code = codeData.value;

  genCodeForm.paramsJson = params;

  generate({
    data: {
      ...genCodeForm,
    },
  });
};
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>实例选择</template>
      <ConnectSelect @handle-connect-change="handleConnectChange" />
    </Card>

    <Divider :style="{ marginTop: '0' }" />

    <Card class="general-card card-container" :bordered="false">
      <template #title>主题服务</template>
      <Tabs v-model:active-key="selectedUrl" type="line">
        <TabPane :key="QUERY_DATABASE_URL" title="单表查询">
          <Row :wrap="false">
            <Col class="col-height">
              <Card
                v-if="selectedUrl === QUERY_DATABASE_URL"
                class="general-card"
                :bordered="false"
                :style="{ width: '100%' }"
              >
                <template #title>单表查询</template>
                <Form ref="connectFormRef" :model="connectFormData">
                  <FormItem
                    :content-flex="false"
                    :merge-props="false"
                    field="schema"
                    label="模式名"
                    :rules="[{ required: true, message: '请选择待查询模式' }]"
                  >
                    <Row :gutter="8">
                      <Col :span="16">
                        <Select
                          v-model="connectFormData.schema"
                          placeholder="请选择待查询模式"
                          allow-clear
                          :loading="schemaListLoading"
                          :allow-search="true"
                        >
                          <Option v-for="item in schemas" :key="item" :value="item">{{
                            item
                          }}</Option>
                        </Select>
                      </Col>
                    </Row>
                  </FormItem>

                  <FormItem
                    :content-flex="false"
                    :merge-props="false"
                    field="table"
                    label="表名"
                    :rules="[{ required: true, message: '请选择待查询表' }]"
                  >
                    <Row :gutter="8">
                      <Col :span="16">
                        <Select
                          v-model="connectFormData.table"
                          placeholder="请选择待查询表"
                          allow-clear
                          :loading="tableListLoading && viewListLoading"
                          :allow-search="true"
                        >
                          <Optgroup label="Table">
                            <Option v-for="item in tables" :key="item" :value="item">{{
                              item
                            }}</Option>
                          </Optgroup>
                          <Optgroup label="View">
                            <Option v-for="item in views" :key="item" :value="item">{{
                              item
                            }}</Option>
                          </Optgroup>
                        </Select>
                      </Col>
                    </Row>
                  </FormItem>
                </Form>

                <Form ref="queryFormRef" :model="queryForm">
                  <FormItem
                    label="查询列名"
                    :content-flex="false"
                    :merge-props="false"
                    field="columnList"
                  >
                    <Row :gutter="8">
                      <Col :span="16">
                        <Select
                          v-model="queryForm.columnList"
                          placeholder="请选择列名"
                          multiple
                          :max-tag-count="10"
                          allow-clear
                        >
                          <Option
                            v-for="item in colFormList"
                            :key="item.name"
                            :value="item.name"
                            :label="item.name"
                          >
                            <span>{{ item.name }}</span>
                            <span :style="{ float: 'right', color: '#909399' }">{{
                              item.type
                            }}</span>
                          </Option>
                        </Select>
                      </Col>
                    </Row>
                  </FormItem>

                  <FormItem
                    v-for="(item, index) in queryForm.whereList"
                    :key="index"
                    :field="`whereList.${index}`"
                    :label="index === 0 ? '过滤条件' : ''"
                    :content-flex="false"
                    :merge-props="false"
                  >
                    <Row :gutter="8">
                      <FormItem no-style field="column">
                        <Col :span="8">
                          <Select
                            v-model="item.column"
                            placeholder="请选择相关条件列"
                            allow-clear
                            :allow-search="true"
                          >
                            <Option
                              v-for="column in colFormList"
                              :key="column.name"
                              :value="column.name"
                              :label="column.name"
                            >
                              <span>{{ column.name }}</span>
                              <span :style="{ float: 'right', color: '#909399' }">{{
                                column.type
                              }}</span>
                            </Option>
                          </Select>
                        </Col>
                      </FormItem>

                      <Col :span="4">
                        <FormItem no-style field="queryType">
                          <Select v-model="item.queryType" placeholder="请输入条件比较方式">
                            <Option>&gt;</Option>
                            <Option>&lt;</Option>
                            <Option>like</Option>
                            <Option>=</Option>
                            <Option>&le;</Option>
                            <Option>&ge;</Option>
                            <Option label="!=" value="<>" />
                          </Select>
                        </FormItem>
                      </Col>
                      <Col :span="4">
                        <FormItem no-style>
                          <Input v-model="item.value" placeholder="请输入过滤条件值" />
                        </FormItem>
                      </Col>
                      <Col :span="4">
                        <FormItem no-style>
                          <Button
                            v-if="
                              item.column !== '' &&
                              item.value !== '' &&
                              index === queryForm.whereList.length - 1
                            "
                            type="text"
                            shape="circle"
                            @click="handleAddWhere"
                          >
                            <template #icon>
                              <icon-plus :size="buttonSize" />
                            </template>
                          </Button>
                          <Button
                            v-if="queryForm.whereList.length !== 1"
                            type="text"
                            status="danger"
                            shape="circle"
                            @click="handleDeleteWhere(index)"
                          >
                            <template #icon>
                              <icon-close :size="buttonSize" />
                            </template>
                          </Button>
                        </FormItem>
                      </Col>
                    </Row>
                  </FormItem>

                  <FormItem
                    v-for="(item, index) in queryForm.orderByList"
                    :key="index"
                    :field="`orderList.${index}`"
                    :label="index === 0 ? '排序条件' : ''"
                    :content-flex="false"
                    :merge-props="false"
                  >
                    <Row :gutter="8">
                      <Col :span="8">
                        <FormItem no-style>
                          <Select v-model="item.type" placeholder="请选择排序方式">
                            <Option label="升序" :value="1"></Option>
                            <Option label="降序" :value="0"></Option>
                          </Select>
                        </FormItem>
                      </Col>
                      <Col :span="8">
                        <FormItem no-style>
                          <Select
                            v-model="item.column"
                            placeholder="请选择排序列"
                            allow-clear
                            :allow-search="true"
                          >
                            <Option
                              v-for="column in colFormList.filter(item => {
                                return !queryForm.orderByList.some(
                                  selected => selected.column === item.name,
                                );
                              })"
                              :key="column.name"
                              :value="column.name"
                              :label="column.name"
                            ></Option>
                          </Select>
                        </FormItem>
                      </Col>
                      <Col :span="4">
                        <FormItem no-style>
                          <Button
                            v-if="item.column !== '' && index === queryForm.orderByList.length - 1"
                            type="text"
                            shape="circle"
                            @click="handleAddOrder"
                          >
                            <template #icon>
                              <icon-plus :size="buttonSize" />
                            </template>
                          </Button>
                          <Button
                            v-if="queryForm.orderByList.length !== 1"
                            type="text"
                            status="danger"
                            shape="circle"
                            @click="handleDeleteOrder(index)"
                          >
                            <template #icon>
                              <icon-close :size="buttonSize" />
                            </template>
                          </Button>
                        </FormItem>
                      </Col>
                    </Row>
                  </FormItem>
                </Form>

                <Row>
                  <Col :span="4" :offset="16">
                    <div :style="{ width: '100px', marginTop: '10px' }">
                      <Button type="primary" long @click="handleSingleQuery"> 生成</Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane :key="EXECUTE_DATABASE_URL" title="自定义操作">
          <Row :wrap="false">
            <Col class="col-height">
              <Card
                v-if="selectedUrl === EXECUTE_DATABASE_URL"
                class="general-card"
                :bordered="false"
              >
                <template #title>自定义操作</template>

                <Card class="general-card" :bordered="false">
                  <template #title>编辑器</template>

                  <CodemirrorEditor @exec="getcode" />
                </Card>

                <Row>
                  <Col :span="4" :offset="20">
                    <div :style="{ width: '100px', marginTop: '10px' }">
                      <Button type="primary" long @click="handleCustomizeQuery"> 生成</Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  </PageContainer>
</template>

<style lang="less" scoped>
.form {
  width: 60%;
}

.card-container {
  height: 100%;
  flex: 1;

  .col-height {
    height: 600px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #ecf0f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #bdc3c7;
    }
  }

  .line-center {
    display: flex;
    justify-content: center;
  }

  :deep(.arco-card-body) {
    position: relative;
  }
}
</style>
